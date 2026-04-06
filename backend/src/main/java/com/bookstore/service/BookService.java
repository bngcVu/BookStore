package com.bookstore.service;

import com.bookstore.domain.entity.AuthorEntity;
import com.bookstore.domain.entity.BookAuthorEntity;
import com.bookstore.domain.entity.BookEntity;
import com.bookstore.domain.entity.CategoryEntity;
import com.bookstore.domain.entity.PublisherEntity;
import com.bookstore.domain.repository.AuthorRepository;
import com.bookstore.domain.repository.BookRepository;
import com.bookstore.domain.repository.BookVariantRepository;
import com.bookstore.domain.repository.CategoryRepository;
import com.bookstore.domain.repository.PublisherRepository;
import com.bookstore.dto.request.BookCreateRequest;
import com.bookstore.dto.response.BookSummaryResponse;
import com.bookstore.dto.response.BookDetailResponse;
import com.bookstore.exception.AppException;
import com.bookstore.exception.ErrorCode;
import com.bookstore.mapper.CatalogMapper;
import com.bookstore.util.SlugUtil;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;
    private final CategoryRepository categoryRepository;
    private final PublisherRepository publisherRepository;
    private final AuthorRepository authorRepository;
    private final BookVariantRepository bookVariantRepository;
    private final CatalogMapper catalogMapper;

    // ---- Queries (public API) ----

    @Transactional(readOnly = true)
    @Cacheable(value = "book_detail", key = "#slug")
    public BookDetailResponse getBySlug(String slug) {
        BookEntity book = findActiveBySlug(slug);
        return catalogMapper.toBookDetailResponse(book);
    }

    @Transactional(readOnly = true)
    @Cacheable(value = "books_by_category", key = "#categoryId + '_' + #pageable.pageNumber + '_' + #pageable.pageSize")
    public Page<BookSummaryResponse> getByCategory(Long categoryId, Pageable pageable) {
        return bookRepository.findByCategoryIdAndIsActiveTrue(categoryId, pageable)
                .map(catalogMapper::toBookSummaryResponse);
    }

    @Transactional(readOnly = true)
    @Cacheable(value = "featured_books", key = "#pageable.pageNumber + '_' + #pageable.pageSize")
    public Page<BookSummaryResponse> getFeatured(Pageable pageable) {
        return bookRepository.findByIsFeaturedTrueAndIsActiveTrue(pageable)
                .map(catalogMapper::toBookSummaryResponse);
    }

    @Transactional(readOnly = true)
    @Cacheable(value = "bestseller_books", key = "#pageable.pageNumber + '_' + #pageable.pageSize")
    public Page<BookSummaryResponse> getBestSellers(Pageable pageable) {
        return bookRepository.findBestSellers(pageable)
                .map(catalogMapper::toBookSummaryResponse);
    }

    @Transactional(readOnly = true)
    public Page<BookSummaryResponse> getNewest(Pageable pageable) {
        return bookRepository.findNewest(pageable)
                .map(catalogMapper::toBookSummaryResponse);
    }

    @Transactional(readOnly = true)
    public Page<BookSummaryResponse> search(String keyword, Pageable pageable) {
        return bookRepository.searchByTitle(keyword, pageable)
                .map(catalogMapper::toBookSummaryResponse);
    }

    // ---- Mutations (Admin) ----

    @Transactional
    @CacheEvict(value = {"book_detail", "books_by_category", "featured_books", "bestseller_books"}, allEntries = true)
    public BookDetailResponse create(BookCreateRequest request) {
        // Validate ISBN không trùng
        if (request.getIsbn() != null && bookRepository.existsByIsbn(request.getIsbn())) {
            throw new AppException(ErrorCode.DUPLICATE_VALUE, "ISBN đã tồn tại: " + request.getIsbn());
        }

        CategoryEntity category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND, "Danh mục không tồn tại"));

        PublisherEntity publisher = publisherRepository.findById(request.getPublisherId())
                .orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND, "Nhà xuất bản không tồn tại"));

        String slug = generateUniqueSlug(request.getTitle());

        BookEntity book = new BookEntity();
        book.setTitle(request.getTitle());
        book.setSlug(slug);
        book.setIsbn(request.getIsbn());
        book.setCategory(category);
        book.setPublisher(publisher);
        book.setBasePrice(request.getBasePrice());
        book.setDescription(request.getDescription());
        book.setPublicationYear(request.getPublicationYear());
        book.setPages(request.getPages());
        book.setDimensions(request.getDimensions());
        book.setWeightGrams(request.getWeightGrams());
        book.setLanguage(request.getLanguage() != null ? request.getLanguage() : "Tiếng Việt");
        book.setIsFeatured(Boolean.TRUE.equals(request.getIsFeatured()));

        if (request.getCoverType() != null) {
            book.setCoverType(BookEntity.CoverType.valueOf(request.getCoverType()));
        }

        // Xử lý tác giả
        if (request.getAuthorIds() != null && !request.getAuthorIds().isEmpty()) {
            List<BookAuthorEntity> bookAuthors = new ArrayList<>();
            for (Long authorId : request.getAuthorIds()) {
                AuthorEntity author = authorRepository.findById(authorId)
                        .orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND, "Tác giả không tồn tại: " + authorId));
                BookAuthorEntity ba = new BookAuthorEntity();
                ba.setBook(book);
                ba.setAuthor(author);
                ba.setIsPrimary(authorId.equals(request.getPrimaryAuthorId()));
                bookAuthors.add(ba);
            }
            book.setBookAuthors(bookAuthors);
        }

        BookEntity saved = bookRepository.save(book);
        log.info("Đã tạo sách: id={}, title={}", saved.getId(), saved.getTitle());
        return catalogMapper.toBookDetailResponse(saved);
    }

    @Transactional
    @CacheEvict(value = {"book_detail", "books_by_category", "featured_books", "bestseller_books"}, allEntries = true)
    public void toggleActive(Long bookId) {
        BookEntity book = bookRepository.findById(bookId)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND, "Sách không tồn tại"));
        book.setIsActive(!Boolean.TRUE.equals(book.getIsActive()));
        bookRepository.save(book);
    }

    // ---- private helpers ----

    private BookEntity findActiveBySlug(String slug) {
        return bookRepository.findBySlug(slug)
                .filter(b -> Boolean.TRUE.equals(b.getIsActive()))
                .orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND, "Không tìm thấy sách: " + slug));
    }

    private String generateUniqueSlug(String title) {
        String base = SlugUtil.toSlug(title);
        String slug = base;
        int counter = 1;
        while (bookRepository.existsBySlug(slug)) {
            slug = SlugUtil.toSlugWithSuffix(title, counter++);
        }
        return slug;
    }
}
