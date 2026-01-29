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
export interface Book {
    id: number;               // From SQL 'id'
    book_id?: number;         // Alias for stability
    title: string;
    slug: string;
    isbn?: string;
    description?: string;

    // Author & Publisher (Aggregated from View)
    authors: string;          // CSV string from GROUP_CONCAT
    publisher_name: string;

    // Images
    primary_image: string;

    // Category Info
    category_id?: number;
    category_name: string;
    category_slug: string;

    // Pricing (From variants)
    base_price: number;
    min_price: number;
    max_price: number;
    discount_percent?: number;

    // Ratings & Stats
    avg_rating: number;
    review_count: number;
    sold_count: number;
    view_count: number;

    // Status
    is_active: boolean;
    is_featured: boolean;
    is_flash_sale?: boolean; // UI flag

    created_at: string;
}

/**
 * Flash Sale Item - Maps to vw_active_flash_sales
 */
export interface FlashSaleItem {
    flash_sale_id: number;
    flash_sale_name: string;
    start_time: string;
    end_time: string;
    item_id: number;
    variant_id: number;
    sku: string;
    book_title: string;
    original_price: number;
    sale_price: number;
    quantity_limit: number;
    sold_count: number;
    remaining_quantity: number;
    discount_percent: number;
    book?: Book; // Populated for UI
}

// ==========================================
// USER & LOYALTY TYPES
// ==========================================

export interface CustomerTier {
    id: number;
    name: string;
    min_spent: number;
    discount_percent: number;
    benefits: string;
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
