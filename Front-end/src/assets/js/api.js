// Mock API aligned with QUICK-START needs (homepage, search, product)
export const API = (() => {
  const categories = [
    { id: 1, name: 'Classics', slug: 'classics' },
    { id: 2, name: 'Dystopian', slug: 'dystopian' },
    { id: 3, name: 'Literature', slug: 'literature' }
  ];

  const publishers = [
    { id: 1, name: 'Penguin', slug: 'penguin' },
    { id: 2, name: 'HarperCollins', slug: 'harpercollins' },
    { id: 3, name: 'Vintage', slug: 'vintage' }
  ];

  const authors = [
    { id: 1, name: 'Harper Lee', slug: 'harper-lee' },
    { id: 2, name: 'George Orwell', slug: 'george-orwell' },
    { id: 3, name: 'Aldous Huxley', slug: 'aldous-huxley' },
    { id: 4, name: 'F. Scott Fitzgerald', slug: 'f-scott-fitzgerald' }
  ];

  const books = [
    {
      id: 1,
      category: 'Classics',
      publisher_id: 1,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      price: 25.0,
      condition: 'Fine',
      seller: 'Rare Books Emporium',
      image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=640&auto=format&fit=crop',
      description: 'A modern classic exploring racial injustice in the Deep South.',
      isbn: '9780061120084'
    },
    {
      id: 2,
      category: 'Dystopian',
      publisher_id: 2,
      title: '1984',
      author: 'George Orwell',
      price: 18.5,
      condition: 'Very Good',
      seller: 'Antiquarian House',
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=640&auto=format&fit=crop',
      description: 'Dystopian novel depicting a totalitarian regime and surveillance state.',
      isbn: '9780451524935'
    },
    {
      id: 3,
      category: 'Dystopian',
      publisher_id: 3,
      title: 'Brave New World',
      author: 'Aldous Huxley',
      price: 22.0,
      condition: 'Fine',
      seller: 'First Editions Co.',
      image: 'https://images.unsplash.com/photo-1519681391609-9d8ff55a4987?q=80&w=640&auto=format&fit=crop',
      description: 'A prophetic vision of a scientifically engineered future society.',
      isbn: '9780060850524'
    },
    {
      id: 4,
      category: 'Literature',
      publisher_id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      price: 29.0,
      condition: 'Good',
      seller: 'Classic Pages',
      image: 'https://images.unsplash.com/photo-1455885666463-9cbe3ebc325d?q=80&w=640&auto=format&fit=crop',
      description: 'A tragic story of Jay Gatsby and the American Dream in the 1920s.',
      isbn: '9780743273565'
    }
  ];

  // Variants (SKU) per book
  const variants = [
    { id: 101, book_id: 1, publisher_id: 1, sku: 'TKAM-SOFT-ED1', cover_type: 'soft', edition: '1st Edition', price: 25.0, compare_at_price: 30.0, cover_image_url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=640&auto=format&fit=crop', thumbnail_url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=300&auto=format&fit=crop', is_active: 1 },
    { id: 102, book_id: 1, publisher_id: 1, sku: 'TKAM-HARD-ED2', cover_type: 'hard', edition: '2nd Edition', price: 35.0, compare_at_price: 40.0, cover_image_url: 'https://images.unsplash.com/photo-1455885666463-9cbe3ebc325d?q=80&w=640&auto=format&fit=crop', thumbnail_url: 'https://images.unsplash.com/photo-1455885666463-9cbe3ebc325d?q=80&w=300&auto=format&fit=crop', is_active: 1 },
    { id: 201, book_id: 2, publisher_id: 2, sku: '1984-SOFT-ED1', cover_type: 'soft', edition: '1st Edition', price: 18.5, compare_at_price: 22.0, cover_image_url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=640&auto=format&fit=crop', thumbnail_url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=300&auto=format&fit=crop', is_active: 1 },
    { id: 301, book_id: 3, publisher_id: 3, sku: 'BNW-SOFT-ED1', cover_type: 'soft', edition: '1st Edition', price: 22.0, compare_at_price: 24.0, cover_image_url: 'https://images.unsplash.com/photo-1519681391609-9d8ff55a4987?q=80&w=640&auto=format&fit=crop', thumbnail_url: 'https://images.unsplash.com/photo-1519681391609-9d8ff55a4987?q=80&w=300&auto=format&fit=crop', is_active: 1 },
    { id: 401, book_id: 4, publisher_id: 1, sku: 'GATSBY-HARD-ED1', cover_type: 'hard', edition: '1st Edition', price: 29.0, compare_at_price: 35.0, cover_image_url: 'https://images.unsplash.com/photo-1455885666463-9cbe3ebc325d?q=80&w=640&auto=format&fit=crop', thumbnail_url: 'https://images.unsplash.com/photo-1455885666463-9cbe3ebc325d?q=80&w=300&auto=format&fit=crop', is_active: 1 }
  ];

  // Book images gallery
  const images = [
    { id: 1, book_id: 1, image_url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=640&auto=format&fit=crop', alt_text: 'Front cover', is_primary: 1, sort_order: 0 },
    { id: 2, book_id: 1, image_url: 'https://images.unsplash.com/photo-1455885666463-9cbe3ebc325d?q=80&w=640&auto=format&fit=crop', alt_text: 'Back cover', is_primary: 0, sort_order: 1 },
    { id: 3, book_id: 2, image_url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=640&auto=format&fit=crop', alt_text: 'Front cover', is_primary: 1, sort_order: 0 },
    { id: 4, book_id: 3, image_url: 'https://images.unsplash.com/photo-1519681391609-9d8ff55a4987?q=80&w=640&auto=format&fit=crop', alt_text: 'Front cover', is_primary: 1, sort_order: 0 },
    { id: 5, book_id: 4, image_url: 'https://images.unsplash.com/photo-1455885666463-9cbe3ebc325d?q=80&w=640&auto=format&fit=crop', alt_text: 'Front cover', is_primary: 1, sort_order: 0 }
  ];

  // Inventory per variant
  const inventory = {
    101: 12,
    102: 0,
    201: 7,
    301: 0,
    401: 4
  };

  // Simple vouchers
  const vouchers = [
    { code: 'SAVE10', type: 'percent', value: 10, minTotal: 0 },
    { code: 'FIVEOFF', type: 'fixed', value: 5, minTotal: 20 }
  ];

  function validateVoucher(code, total) {
    if (!code) return { valid: false, discount: 0, message: 'Nhập mã giảm giá' };
    const v = vouchers.find(x => x.code.toUpperCase() === code.toUpperCase());
    if (!v) return { valid: false, discount: 0, message: 'Mã không hợp lệ' };
    if (total < (v.minTotal || 0)) return { valid: false, discount: 0, message: `Đơn tối thiểu ${v.minTotal}` };
    const discount = v.type === 'percent' ? (total * v.value / 100) : v.value;
    return { valid: true, discount, message: `Áp dụng ${v.code}` };
  }

  function getFeaturedBooks(limit = 8) {
    return books.slice(0, limit);
  }

  function getBooks() {
    return books;
  }

  function getBookById(id) {
    return books.find(b => String(b.id) === String(id));
  }

  function searchBooks(q) {
    if (!q) return books;
    const term = q.toLowerCase();
    return books.filter(b =>
      b.title.toLowerCase().includes(term) ||
      b.author.toLowerCase().includes(term) ||
      (b.isbn && b.isbn.toLowerCase().includes(term))
    );
  }

  function getCategories() { return categories; }
  function getAuthors() { return authors; }
  function getPublishers() { return publishers; }
  function getVariantsByBook(bookId) { return variants.filter(v => String(v.book_id) === String(bookId)); }
  function getImagesByBook(bookId) { return images.filter(img => String(img.book_id) === String(bookId)).sort((a,b)=>a.sort_order-b.sort_order); }
  function getInventoryByVariant(variantId) { return inventory[variantId] || 0; }

  return { getFeaturedBooks, getBooks, getBookById, searchBooks, getCategories, getAuthors, getPublishers, getVariantsByBook, getImagesByBook, getInventoryByVariant, validateVoucher };
})();
