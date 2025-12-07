"""
Tiki Books Crawler
Crawl dữ liệu sách thật từ Tiki.vn

⚠️ CHỈ SỬ DỤNG CHO MỤC ĐÍCH HỌC TẬP CÁ NHÂN
Không sử dụng cho mục đích thương mại

Sử dụng:
    pip install -r requirements.txt
    python tiki_crawler.py

Output:
    seed_data_tiki.sql - File SQL INSERT với dữ liệu thật
"""

import requests
import time
import random
import re
import json
import hashlib
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Tuple

# ============================================================
# CONFIGURATION
# ============================================================

# Số sách cần crawl (Tiki API giới hạn 40 item/page)
NUM_BOOKS_TO_CRAWL = 100
BOOKS_PER_PAGE = 40
DELAY_BETWEEN_REQUESTS = 1.5  # seconds

# Tiki API endpoints
TIKI_API_BASE = "https://tiki.vn/api/v2"
TIKI_PRODUCT_API = "https://tiki.vn/api/v2/products"

# Headers để giả lập browser
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "application/json",
    "Accept-Language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7",
    "Referer": "https://tiki.vn/sach-truyen-tieng-viet/c316",
}

# Category mapping từ Tiki sang database
TIKI_CATEGORIES = {
    316: {"name": "Sách tiếng Việt", "parent_id": None, "level": 0},
    # Sub-categories
    839: {"name": "Tiểu Thuyết", "parent_id": 316, "level": 1},
    846: {"name": "Truyện Ngắn - Tản Văn", "parent_id": 316, "level": 1},
    843: {"name": "Sách Kinh Tế", "parent_id": 316, "level": 1},
    870: {"name": "Sách Kỹ Năng Sống", "parent_id": 316, "level": 1},
    873: {"name": "Sách Nuôi Dạy Con", "parent_id": 316, "level": 1},
    1084: {"name": "Sách Thiếu Nhi", "parent_id": 316, "level": 1},
    320: {"name": "Sách Học Ngoại Ngữ", "parent_id": 316, "level": 1},
    393: {"name": "Sách Giáo Khoa", "parent_id": 316, "level": 1},
    7358: {"name": "Light Novel", "parent_id": 316, "level": 1},
    2538: {"name": "Manga - Comic", "parent_id": 316, "level": 1},
}

# ============================================================
# HELPER FUNCTIONS
# ============================================================

def slugify(text: str) -> str:
    """Convert Vietnamese text to URL slug"""
    vietnamese_map = {
        'à': 'a', 'á': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a',
        'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a',
        'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a',
        'đ': 'd', 'Đ': 'd',
        'è': 'e', 'é': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e',
        'ê': 'e', 'ề': 'e', 'ế': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e',
        'ì': 'i', 'í': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
        'ò': 'o', 'ó': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o',
        'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o',
        'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o',
        'ù': 'u', 'ú': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
        'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u',
        'ỳ': 'y', 'ý': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y',
    }
    
    text = text.lower()
    for vn, en in vietnamese_map.items():
        text = text.replace(vn, en)
    
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'[\s_]+', '-', text)
    text = re.sub(r'-+', '-', text)
    return text.strip('-')[:150]

def escape_sql(text: str) -> str:
    """Escape single quotes for SQL"""
    if text is None:
        return "NULL"
    return str(text).replace("'", "''").replace("\\", "\\\\")

def hash_password(password: str) -> str:
    """Simple password hash"""
    return hashlib.sha256(password.encode()).hexdigest()

def clean_html(text: str) -> str:
    """Remove HTML tags from text"""
    if not text:
        return ""
    clean = re.sub(r'<[^>]+>', '', str(text))
    clean = re.sub(r'\s+', ' ', clean)
    return clean.strip()

# ============================================================
# TIKI API FUNCTIONS
# ============================================================

def fetch_tiki_category(category_id: int, page: int = 1, limit: int = 40) -> Dict:
    """Fetch books from a Tiki category"""
    url = f"{TIKI_API_BASE}/products"
    params = {
        "limit": limit,
        "include": "advertisement",
        "aggregations": 2,
        "category": category_id,
        "page": page,
        "sort": "top_seller",
    }
    
    try:
        response = requests.get(url, headers=HEADERS, params=params, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"Error fetching category {category_id}: {e}")
        return {"data": []}

def fetch_product_detail(product_id: int) -> Optional[Dict]:
    """Fetch detailed product info"""
    url = f"{TIKI_PRODUCT_API}/{product_id}"
    params = {
        "platform": "web",
        "spid": product_id,
    }
    
    try:
        response = requests.get(url, headers=HEADERS, params=params, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"Error fetching product {product_id}: {e}")
        return None

def crawl_all_books() -> List[Dict]:
    """Crawl books from all categories"""
    all_books = []
    seen_ids = set()
    
    category_ids = [839, 846, 843, 870, 873, 1084, 320, 7358, 2538]  # Skip parent category
    
    for cat_id in category_ids:
        cat_name = TIKI_CATEGORIES.get(cat_id, {}).get("name", f"Category {cat_id}")
        print(f"\n📚 Crawling: {cat_name} (ID: {cat_id})")
        
        page = 1
        cat_books = 0
        max_books_per_category = NUM_BOOKS_TO_CRAWL // len(category_ids) + 20
        
        while cat_books < max_books_per_category:
            print(f"  Page {page}...", end=" ")
            
            data = fetch_tiki_category(cat_id, page=page, limit=BOOKS_PER_PAGE)
            products = data.get("data", [])
            
            if not products:
                print("No more products")
                break
            
            for product in products:
                pid = product.get("id")
                if pid and pid not in seen_ids:
                    seen_ids.add(pid)
                    product["_category_id"] = cat_id
                    all_books.append(product)
                    cat_books += 1
            
            print(f"Got {len(products)} items, total: {cat_books}")
            
            page += 1
            time.sleep(DELAY_BETWEEN_REQUESTS)
            
            if len(all_books) >= NUM_BOOKS_TO_CRAWL:
                break
        
        if len(all_books) >= NUM_BOOKS_TO_CRAWL:
            break
    
    print(f"\n✅ Total books crawled: {len(all_books)}")
    return all_books[:NUM_BOOKS_TO_CRAWL]

def enrich_book_details(books: List[Dict]) -> List[Dict]:
    """Fetch detailed info for each book"""
    enriched = []
    total = len(books)
    
    print(f"\n🔍 Enriching {total} books with details...")
    
    for i, book in enumerate(books):
        pid = book.get("id")
        print(f"  [{i+1}/{total}] Product {pid}...", end=" ")
        
        detail = fetch_product_detail(pid)
        if detail:
            book.update(detail)
            enriched.append(book)
            print("OK")
        else:
            enriched.append(book)  # Use basic info
            print("SKIP (using basic)")
        
        time.sleep(DELAY_BETWEEN_REQUESTS)
    
    return enriched

# ============================================================
# DATA TRANSFORMATION
# ============================================================

def extract_authors(book: Dict) -> List[str]:
    """Extract author names from book data"""
    authors = []
    
    # Try different fields
    author_fields = [
        book.get("authors", []),
        book.get("author", []),
    ]
    
    for field in author_fields:
        if isinstance(field, list):
            for a in field:
                if isinstance(a, dict):
                    name = a.get("name", "")
                elif isinstance(a, str):
                    name = a
                else:
                    continue
                if name and name not in authors:
                    authors.append(name)
        elif isinstance(field, str) and field:
            authors.append(field)
    
    # Fallback: check specifications
    specs = book.get("specifications", [])
    for spec_group in specs:
        for attr in spec_group.get("attributes", []):
            if attr.get("code") == "author" or attr.get("name") == "Tác giả":
                val = attr.get("value", "")
                if val and val not in authors:
                    authors.append(val)
    
    return authors if authors else ["Chưa rõ tác giả"]

def extract_publisher(book: Dict) -> str:
    """Extract publisher name"""
    # Try direct field
    if book.get("brand", {}).get("name"):
        return book["brand"]["name"]
    
    # Try specifications
    specs = book.get("specifications", [])
    for spec_group in specs:
        for attr in spec_group.get("attributes", []):
            if attr.get("code") in ["publisher", "brand"] or "xuất bản" in attr.get("name", "").lower():
                return attr.get("value", "NXB Không xác định")
    
    return "NXB Không xác định"

def extract_specs(book: Dict) -> Dict:
    """Extract book specifications"""
    result = {
        "pages": None,
        "dimensions": None,
        "weight": None,
        "cover_type": "soft",
        "publication_year": None,
        "isbn": None,
    }
    
    specs = book.get("specifications", [])
    for spec_group in specs:
        for attr in spec_group.get("attributes", []):
            name = attr.get("name", "").lower()
            code = attr.get("code", "").lower()
            value = attr.get("value", "")
            
            if "số trang" in name or code == "number_of_page":
                try:
                    result["pages"] = int(re.sub(r'\D', '', str(value)))
                except:
                    pass
            elif "kích thước" in name or code == "dimensions":
                result["dimensions"] = value[:50] if value else None
            elif "trọng lượng" in name or code == "weight":
                try:
                    result["weight"] = int(float(re.sub(r'[^\d.]', '', str(value))))
                except:
                    pass
            elif "loại bìa" in name or code == "book_cover":
                if "cứng" in value.lower():
                    result["cover_type"] = "hard"
                else:
                    result["cover_type"] = "soft"
            elif "năm" in name and "xuất bản" in name:
                try:
                    result["publication_year"] = int(re.sub(r'\D', '', str(value)))
                except:
                    pass
            elif code == "isbn" or "isbn" in name:
                result["isbn"] = re.sub(r'[^\dX]', '', str(value).upper())[:20]
    
    return result

def extract_images(book: Dict) -> List[str]:
    """Extract image URLs"""
    images = []
    
    # Primary image
    thumb = book.get("thumbnail_url")
    if thumb:
        # Get high-res version
        high_res = thumb.replace("_ts", "").replace("/128x128/", "/750x750/")
        images.append(high_res)
    
    # Additional images
    for img in book.get("images", []):
        url = img.get("large_url") or img.get("medium_url") or img.get("base_url")
        if url and url not in images:
            images.append(url)
    
    return images[:5]  # Max 5 images

# ============================================================
# SQL GENERATION
# ============================================================

class SQLGenerator:
    def __init__(self):
        self.categories = {}
        self.publishers = {}
        self.authors = {}
        self.books = []
        self.book_authors = []
        self.book_images = []
        self.book_variants = []
        self.inventory = []
        
        self.next_category_id = 1
        self.next_publisher_id = 1
        self.next_author_id = 1
        self.next_book_id = 1
        self.next_variant_id = 1
    
    def add_category(self, name: str, parent_id: Optional[int] = None, level: int = 0) -> int:
        """Add or get category"""
        key = name.lower()
        if key not in self.categories:
            self.categories[key] = {
                "id": self.next_category_id,
                "name": name,
                "slug": slugify(name),
                "parent_id": parent_id,
                "level": level,
            }
            self.next_category_id += 1
        return self.categories[key]["id"]
    
    def add_publisher(self, name: str) -> int:
        """Add or get publisher"""
        key = name.lower()
        if key not in self.publishers:
            self.publishers[key] = {
                "id": self.next_publisher_id,
                "name": name,
                "slug": slugify(name),
            }
            self.next_publisher_id += 1
        return self.publishers[key]["id"]
    
    def add_author(self, name: str) -> int:
        """Add or get author"""
        key = name.lower()
        if key not in self.authors:
            self.authors[key] = {
                "id": self.next_author_id,
                "name": name,
                "slug": slugify(name) + f"-{self.next_author_id}",
            }
            self.next_author_id += 1
        return self.authors[key]["id"]
    
    def process_books(self, raw_books: List[Dict]):
        """Process all crawled books"""
        
        # First, add categories
        self.add_category("Sách", None, 0)
        for cat_id, cat_info in TIKI_CATEGORIES.items():
            self.add_category(cat_info["name"], 1 if cat_info["parent_id"] else None, cat_info["level"])
        
        print(f"\n📝 Processing {len(raw_books)} books...")
        
        for raw in raw_books:
            try:
                self._process_single_book(raw)
            except Exception as e:
                print(f"  Error processing book {raw.get('id')}: {e}")
        
        print(f"  ✅ Processed: {len(self.books)} books")
        print(f"  ✅ Authors: {len(self.authors)}")
        print(f"  ✅ Publishers: {len(self.publishers)}")
        print(f"  ✅ Variants: {len(self.book_variants)}")
    
    def _process_single_book(self, raw: Dict):
        """Process single book"""
        book_id = self.next_book_id
        self.next_book_id += 1
        
        # Extract data
        title = raw.get("name", "Không có tiêu đề")[:300]
        description = clean_html(raw.get("description", "") or raw.get("short_description", ""))
        
        # Category
        tiki_cat = raw.get("_category_id", 839)
        cat_name = TIKI_CATEGORIES.get(tiki_cat, {}).get("name", "Tiểu Thuyết")
        category_id = self.add_category(cat_name, 1, 1)
        
        # Publisher
        publisher_name = extract_publisher(raw)
        publisher_id = self.add_publisher(publisher_name)
        
        # Specs
        specs = extract_specs(raw)
        
        # Price
        price = raw.get("price", 0) or raw.get("list_price", 0) or 100000
        original_price = raw.get("original_price") or raw.get("list_price") or price
        
        # Rating
        rating = raw.get("rating_average", 0) or 0
        review_count = raw.get("review_count", 0) or 0
        sold_count = raw.get("quantity_sold", {})
        if isinstance(sold_count, dict):
            sold_count = sold_count.get("value", 0)
        sold_count = sold_count or 0
        
        # Generate ISBN if not available
        isbn = specs["isbn"]
        if not isbn:
            isbn = f"978{random.randint(1000000000, 9999999999)}"[:13]
        
        book = {
            "id": book_id,
            "category_id": category_id,
            "publisher_id": publisher_id,
            "title": title,
            "slug": slugify(title) + f"-{book_id}",
            "isbn": isbn,
            "publication_year": specs["publication_year"] or random.randint(2018, 2024),
            "pages": specs["pages"] or random.randint(100, 500),
            "dimensions": specs["dimensions"] or f"{random.randint(13,20)}x{random.randint(18,25)} cm",
            "weight_grams": specs["weight"] or random.randint(200, 800),
            "cover_type": specs["cover_type"],
            "description": description[:5000] if description else "Mô tả đang cập nhật",
            "base_price": price,
            "avg_rating": round(float(rating), 1),
            "review_count": int(review_count),
            "sold_count": int(sold_count),
            "view_count": random.randint(100, 10000),
            "is_active": 1,
            "is_featured": 1 if rating >= 4.5 else 0,
        }
        self.books.append(book)
        
        # Authors
        author_names = extract_authors(raw)
        for i, author_name in enumerate(author_names[:3]):
            author_id = self.add_author(author_name)
            self.book_authors.append({
                "book_id": book_id,
                "author_id": author_id,
                "is_primary": 1 if i == 0 else 0,
            })
        
        # Images
        images = extract_images(raw)
        cover_image_url = images[0] if images else None
        thumbnail_url = cover_image_url.replace("/750x750/", "/300x300/") if cover_image_url else None
        
        for i, img_url in enumerate(images):
            self.book_images.append({
                "book_id": book_id,
                "image_url": img_url,
                "alt_text": f"{title} - Ảnh {i+1}",
                "is_primary": 1 if i == 0 else 0,
                "sort_order": i,
            })
        
        # Variants (1-2 per book)
        num_variants = 1 if specs["cover_type"] == "hard" else random.randint(1, 2)
        for v in range(num_variants):
            variant_id = self.next_variant_id
            self.next_variant_id += 1
            
            cover = "hard" if v == 1 else specs["cover_type"]
            var_price = price if v == 0 else int(price * 1.3)
            
            self.book_variants.append({
                "id": variant_id,
                "book_id": book_id,
                "publisher_id": publisher_id,
                "sku": f"BOOK-{book_id:05d}-{v+1:02d}",
                "cover_type": cover,
                "edition": None,
                "price": var_price,
                "compare_at_price": original_price if original_price > var_price else None,
                "cover_image_url": cover_image_url,
                "thumbnail_url": thumbnail_url,
                "is_active": 1,
            })
            
            self.inventory.append({
                "variant_id": variant_id,
                "quantity": random.randint(10, 200),
                "reserved_quantity": random.randint(0, 10),
                "min_stock_level": 5,
            })
    
    def generate_sql(self) -> str:
        """Generate complete SQL file"""
        lines = []
        lines.append("-- ============================================================")
        lines.append("-- BOOKSTORE SEED DATA - CRAWLED FROM TIKI")
        lines.append(f"-- Generated: {datetime.now().isoformat()}")
        lines.append("-- ⚠️ FOR EDUCATIONAL PURPOSES ONLY")
        lines.append("-- ============================================================\n")
        lines.append("SET NAMES utf8mb4;")
        lines.append("SET FOREIGN_KEY_CHECKS = 0;\n")
        
        # Categories
        lines.append("-- Categories")
        for cat in self.categories.values():
            parent = cat['parent_id'] if cat['parent_id'] else "NULL"
            lines.append(f"INSERT INTO `categories` (`id`, `name`, `slug`, `parent_id`, `level`, `is_active`) VALUES ({cat['id']}, '{escape_sql(cat['name'])}', '{cat['slug']}', {parent}, {cat['level']}, 1);")
        lines.append("")
        
        # Publishers
        lines.append("-- Publishers")
        for pub in self.publishers.values():
            lines.append(f"INSERT INTO `publishers` (`id`, `name`, `slug`) VALUES ({pub['id']}, '{escape_sql(pub['name'])}', '{pub['slug']}');")
        lines.append("")
        
        # Authors
        lines.append("-- Authors")
        values = []
        for author in self.authors.values():
            values.append(f"({author['id']}, '{escape_sql(author['name'])}', '{author['slug']}', NULL)")
            if len(values) >= 50:
                lines.append(f"INSERT INTO `authors` (`id`, `name`, `slug`, `biography`) VALUES\n" + ",\n".join(values) + ";")
                values = []
        if values:
            lines.append(f"INSERT INTO `authors` (`id`, `name`, `slug`, `biography`) VALUES\n" + ",\n".join(values) + ";")
        lines.append("")
        
        # Books
        lines.append("-- Books")
        values = []
        for book in self.books:
            values.append(
                f"({book['id']}, {book['category_id']}, {book['publisher_id']}, "
                f"'{escape_sql(book['title'])}', '{book['slug']}', '{book['isbn']}', "
                f"{book['publication_year']}, {book['pages']}, '{escape_sql(book['dimensions'])}', "
                f"{book['weight_grams']}, '{book['cover_type']}', 'Tiếng Việt', "
                f"'{escape_sql(book['description'])}', {book['base_price']}, {book['avg_rating']}, "
                f"{book['review_count']}, {book['sold_count']}, {book['view_count']}, "
                f"{book['is_active']}, {book['is_featured']})"
            )
            if len(values) >= 10:
                lines.append(f"INSERT INTO `books` (`id`, `category_id`, `publisher_id`, `title`, `slug`, `isbn`, `publication_year`, `pages`, `dimensions`, `weight_grams`, `cover_type`, `language`, `description`, `base_price`, `avg_rating`, `review_count`, `sold_count`, `view_count`, `is_active`, `is_featured`) VALUES\n" + ",\n".join(values) + ";")
                values = []
        if values:
            lines.append(f"INSERT INTO `books` (`id`, `category_id`, `publisher_id`, `title`, `slug`, `isbn`, `publication_year`, `pages`, `dimensions`, `weight_grams`, `cover_type`, `language`, `description`, `base_price`, `avg_rating`, `review_count`, `sold_count`, `view_count`, `is_active`, `is_featured`) VALUES\n" + ",\n".join(values) + ";")
        lines.append("")
        
        # Book Authors
        lines.append("-- Book Authors")
        values = []
        for ba in self.book_authors:
            values.append(f"({ba['book_id']}, {ba['author_id']}, {ba['is_primary']})")
            if len(values) >= 100:
                lines.append(f"INSERT INTO `book_authors` (`book_id`, `author_id`, `is_primary`) VALUES\n" + ",\n".join(values) + ";")
                values = []
        if values:
            lines.append(f"INSERT INTO `book_authors` (`book_id`, `author_id`, `is_primary`) VALUES\n" + ",\n".join(values) + ";")
        lines.append("")
        
        # Book Images
        lines.append("-- Book Images")
        values = []
        for img in self.book_images:
            values.append(f"({img['book_id']}, '{img['image_url']}', '{escape_sql(img['alt_text'])}', {img['is_primary']}, {img['sort_order']})")
            if len(values) >= 30:
                lines.append(f"INSERT INTO `book_images` (`book_id`, `image_url`, `alt_text`, `is_primary`, `sort_order`) VALUES\n" + ",\n".join(values) + ";")
                values = []
        if values:
            lines.append(f"INSERT INTO `book_images` (`book_id`, `image_url`, `alt_text`, `is_primary`, `sort_order`) VALUES\n" + ",\n".join(values) + ";")
        lines.append("")
        
        # Book Variants
        lines.append("-- Book Variants")
        values = []
        for var in self.book_variants:
            compare = var['compare_at_price'] if var['compare_at_price'] else "NULL"
            edition = f"'{escape_sql(var['edition'])}'" if var['edition'] else "NULL"
            cover_img = f"'{var['cover_image_url']}'" if var.get('cover_image_url') else "NULL"
            thumb = f"'{var['thumbnail_url']}'" if var.get('thumbnail_url') else "NULL"
            values.append(f"({var['id']}, {var['book_id']}, {var['publisher_id']}, '{var['sku']}', '{var['cover_type']}', {edition}, {var['price']}, {compare}, {cover_img}, {thumb}, {var['is_active']})")
            if len(values) >= 50:
                lines.append(f"INSERT INTO `book_variants` (`id`, `book_id`, `publisher_id`, `sku`, `cover_type`, `edition`, `price`, `compare_at_price`, `cover_image_url`, `thumbnail_url`, `is_active`) VALUES\n" + ",\n".join(values) + ";")
                values = []
        if values:
            lines.append(f"INSERT INTO `book_variants` (`id`, `book_id`, `publisher_id`, `sku`, `cover_type`, `edition`, `price`, `compare_at_price`, `cover_image_url`, `thumbnail_url`, `is_active`) VALUES\n" + ",\n".join(values) + ";")
        lines.append("")
        
        # Inventory
        lines.append("-- Inventory")
        values = []
        for inv in self.inventory:
            values.append(f"({inv['variant_id']}, {inv['quantity']}, {inv['reserved_quantity']}, {inv['min_stock_level']})")
            if len(values) >= 100:
                lines.append(f"INSERT INTO `inventory` (`variant_id`, `quantity`, `reserved_quantity`, `min_stock_level`) VALUES\n" + ",\n".join(values) + ";")
                values = []
        if values:
            lines.append(f"INSERT INTO `inventory` (`variant_id`, `quantity`, `reserved_quantity`, `min_stock_level`) VALUES\n" + ",\n".join(values) + ";")
        lines.append("")
        
        # Add static data (admins, users, shipping, vouchers)
        lines.append(self._generate_static_data())
        
        lines.append("\nSET FOREIGN_KEY_CHECKS = 1;")
        lines.append("\n-- ============================================================")
        lines.append(f"-- CRAWL COMPLETE: {len(self.books)} books from Tiki.vn")
        lines.append("-- ============================================================")
        
        return "\n".join(lines)
    
    def _generate_static_data(self) -> str:
        """Generate static data (users, admins, shipping, etc.)"""
        lines = []
        
        # Customer Tiers (required for users FK)
        lines.append("-- Customer Tiers")
        tiers = [
            (1, "Bạc", 0, 0, "Thành viên mới"),
            (2, "Vàng", 5000000, 5, "Giảm 5% mọi đơn hàng"),
            (3, "Kim Cương", 20000000, 10, "Giảm 10% + Freeship"),
        ]
        for t in tiers:
            lines.append(f"INSERT INTO `customer_tiers` (`id`, `name`, `min_spent`, `discount_percent`, `benefits`) VALUES ({t[0]}, '{t[1]}', {t[2]}, {t[3]}, '{t[4]}');")
        lines.append("")
        
        # Provinces (required for shipping_rates FK)
        lines.append("-- Provinces")
        provinces = [
            ("01", "Hà Nội"), ("79", "TP. Hồ Chí Minh"),
            ("48", "Đà Nẵng"), ("92", "Cần Thơ"),
            ("31", "Hải Phòng"), ("46", "Thừa Thiên Huế"),
        ]
        for code, name in provinces:
            lines.append(f"INSERT INTO `provinces` (`code`, `name`) VALUES ('{code}', '{name}');")
        lines.append("")
        
        # Admins
        lines.append("-- Admins")
        admins = [
            (1, "admin@bookstore.vn", hash_password("Admin@123"), "Super Admin", "super_admin"),
            (2, "manager@bookstore.vn", hash_password("Manager@123"), "Quản lý", "admin"),
            (3, "staff@bookstore.vn", hash_password("Staff@123"), "Nhân viên", "staff"),
        ]
        for a in admins:
            lines.append(f"INSERT INTO `admins` (`id`, `email`, `password_hash`, `full_name`, `role`, `is_active`) VALUES ({a[0]}, '{a[1]}', '{a[2]}', '{a[3]}', '{a[4]}', 1);")
        lines.append("")
        
        # Sample users
        lines.append("-- Sample Users")
        users = [
            (1, "user1@gmail.com", "0901234567", "Nguyễn Văn A", 1),
            (2, "user2@gmail.com", "0912345678", "Trần Thị B", 2),
            (3, "user3@gmail.com", "0923456789", "Lê Văn C", 1),
        ]
        for u in users:
            lines.append(f"INSERT INTO `users` (`id`, `email`, `phone`, `password_hash`, `full_name`, `tier_id`, `status`) VALUES ({u[0]}, '{u[1]}', '{u[2]}', '{hash_password('User@123')}', '{u[3]}', {u[4]}, 'active');")
        lines.append("")
        
        # Shipping Carriers (required for shipping_rates FK)
        lines.append("-- Shipping Carriers")
        carriers = [
            (1, "Giao Hàng Tiết Kiệm", "GHTK"),
            (2, "Giao Hàng Nhanh", "GHN"),
            (3, "Viettel Post", "VTP"),
            (4, "J&T Express", "JT"),
        ]
        for c in carriers:
            lines.append(f"INSERT INTO `shipping_carriers` (`id`, `name`, `code`, `is_active`) VALUES ({c[0]}, '{c[1]}', '{c[2]}', 1);")
        lines.append("")
        
        # Shipping rates (simplified - just major cities)
        lines.append("-- Shipping Rates (Major Cities)")
        cities = [
            ("01", "Hà Nội", 22000), ("79", "TP. Hồ Chí Minh", 18000),
            ("48", "Đà Nẵng", 30000), ("92", "Cần Thơ", 28000),
        ]
        rate_id = 1
        for carrier_id in range(1, 5):
            for code, name, base_fee in cities:
                lines.append(f"INSERT INTO `shipping_rates` (`id`, `carrier_id`, `province_code`, `province_name`, `base_fee`, `per_kg_fee`, `per_500g_fee`, `estimated_days_min`, `estimated_days_max`) VALUES ({rate_id}, {carrier_id}, '{code}', '{name}', {base_fee}, 5000, 3000, 2, 5);")
                rate_id += 1
        lines.append("")
        
        # Vouchers
        lines.append("-- Vouchers")
        vouchers = [
            ("WELCOME10", "Chào mừng thành viên mới", "percent", 10, 50000, 100000),
            ("SALE20", "Giảm 20%", "percent", 20, 100000, 200000),
            ("FREESHIP", "Miễn phí ship", "fixed", 30000, 30000, 150000),
        ]
        for i, v in enumerate(vouchers, 1):
            end_date = (datetime.now() + timedelta(days=90)).strftime('%Y-%m-%d %H:%M:%S')
            lines.append(f"INSERT INTO `vouchers` (`id`, `code`, `name`, `discount_type`, `discount_value`, `max_discount`, `min_order_value`, `usage_limit`, `start_date`, `end_date`, `is_active`) VALUES ({i}, '{v[0]}', '{v[1]}', '{v[2]}', {v[3]}, {v[4]}, {v[5]}, 1000, NOW(), '{end_date}', 1);")
        
        return "\n".join(lines)

# ============================================================
# MAIN
# ============================================================

def main():
    print("=" * 60)
    print("🛒 TIKI BOOKS CRAWLER")
    print("=" * 60)
    print(f"Target: {NUM_BOOKS_TO_CRAWL} books")
    print(f"Delay: {DELAY_BETWEEN_REQUESTS}s between requests")
    print("=" * 60)
    
    # Step 1: Crawl basic info
    books = crawl_all_books()
    
    if not books:
        print("❌ No books found!")
        return
    
    # Step 2: Enrich with details (get real authors/publishers)
    books = enrich_book_details(books)
    
    # Step 3: Generate SQL
    generator = SQLGenerator()
    generator.process_books(books)
    
    sql_content = generator.generate_sql()
    
    # Step 4: Write to file
    output_file = "seed_data_tiki.sql"
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(sql_content)
    
    print(f"\n✅ Generated: {output_file}")
    print(f"📄 File size: {len(sql_content) / 1024:.1f} KB")
    print(f"\n📊 Summary:")
    print(f"  - Books: {len(generator.books)}")
    print(f"  - Authors: {len(generator.authors)}")
    print(f"  - Publishers: {len(generator.publishers)}")
    print(f"  - Variants: {len(generator.book_variants)}")
    print(f"  - Images: {len(generator.book_images)}")
    print(f"\n🚀 To import:")
    print(f"  mysql -u root -p bookstore < {output_file}")

if __name__ == "__main__":
    main()
