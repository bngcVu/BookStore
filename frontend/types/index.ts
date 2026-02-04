// ==========================================
// CORE PRODUCT TYPES
// ==========================================

/**
 * Category - Maps to categories table
 * Supports multilevel hierarchy
 */
export interface Category {
    id: number;
    name: string;
    slug: string;
    parent_id?: number;
    level: number;
    image_url?: string;
    sort_order?: number;
    sub_categories?: Category[]; // For frontend tree
}

/**
 * Book interface - Maps to vw_books_full View
 * Represents aggregated book data
 */
/**
 * Book interface - Maps to books table + derived active variant/image
 */
export interface Book {
    id: number;
    title: string;
    slug: string;
    isbn?: string; // from books
    description?: string; // from books

    // Flattened / Derived from relations
    authors: string[]; // ['Author 1', 'Author 2']
    publisher_name?: string;

    // Display
    image_url: string; // resolved primary image
    base_price: number; // from books.base_price OR variants.price (min)
    original_price?: number; // compare_at_price

    // Ratings & Stats
    avg_rating: number; // books.avg_rating
    review_count: number; // books.review_count
    sold_count: number; // books.sold_count

    // Status
    is_active: boolean;
    is_featured: boolean;
}

/**
 * Flash Sale Item - Maps to flash_sale_items join book_variants
 */
export interface FlashSaleItem {
    id: number;
    flash_sale_id: number;
    variant_id: number;

    // Item specific
    sale_price: number;
    original_price: number; // from variant price
    quantity_limit: number; // 0 = unlimited
    sold_count: number;

    // Book Data (Joined)
    book: Book;

    // UI Helpers
    discount_percent?: number;
}

export interface Author {
    id: number;
    name: string;
    slug: string;
    image_url?: string;
    biography?: string;
}

export interface CustomerTier {
    id: number;
    name: string;
    min_spent: number;
    discount_percent: number;
    benefits: string; // TEXT
}

export interface User {
    id: number;
    email: string;
    full_name: string;
    avatar_url?: string;
    tier_id?: number;
    tier?: CustomerTier;
    total_spent: number;
    reward_points: number;
}

// ==========================================
// WISHLIST & CART
// ==========================================

export interface WishlistItem {
    id: number;
    user_id: number;
    book_id: number;
    added_price: number;
    notify_on_price_drop: boolean;
    priority: number;
    book: Book;
    created_at: string;
}

export interface CartItem {
    id: number;
    user_id: number;
    variant_id: number;
    quantity: number;
    book: Book;
    // variant info...
}
// ==========================================
// PROMOTION TYPES
// ==========================================

export interface Voucher {
    id: number;
    code: string;
    name: string;
    description: string;
    discount_type: 'percent' | 'fixed';
    discount_value: number;
    max_discount?: number;
    min_order_value: number;
    usage_limit?: number;
    used_count: number;
    start_date: string;
    end_date: string;
    is_active: boolean;
}

// ==========================================
// NOTIFICATION TYPES
// ==========================================

export interface Notification {
    id: number;
    user_id: number;
    title: string;
    content: string;
    type: 'order' | 'promotion' | 'system' | 'reward';
    is_read: boolean;
    reference_type?: 'order' | 'book' | 'voucher';
    reference_id?: number;
    created_at: string;
}

// ==========================================
// ORDER TYPES
// ==========================================

export interface OrderItem {
    id: number;
    book: Book;
    quantity: number;
    price: number;
}

export interface Order {
    id: number;
    order_number: string;
    status: 'pending' | 'processing' | 'shipping' | 'delivered' | 'cancelled' | 'refunded';
    total_amount: number;
    created_at: string;
    items: OrderItem[];
    payment_method: string;
    shipping_address: string;
}
