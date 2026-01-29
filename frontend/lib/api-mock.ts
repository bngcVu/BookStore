import { Book, Category, FlashSaleItem, WishlistItem, Voucher, CustomerTier } from '@/types';

// ==========================================
// MOCK CATEGORIES (Hierarchical - Level 0 & 1)
// ==========================================

export const MOCK_CATEGORIES: Category[] = [
    {
        id: 1, name: 'Văn Học', slug: 'van-hoc', level: 0, image_url: 'https://cdn-icons-png.flaticon.com/512/3342/3342137.png', sub_categories: [
            { id: 101, name: 'Tiểu Thuyết', slug: 'tieu-thuyet', level: 1, parent_id: 1 },
            { id: 102, name: 'Truyện Ngắn', slug: 'truyen-ngan', level: 1, parent_id: 1 },
            { id: 103, name: 'Thơ Ca', slug: 'tho-ca', level: 1, parent_id: 1 },
        ]
    },
    {
        id: 2, name: 'Kinh Tế', slug: 'kinh-te', level: 0, image_url: 'https://cdn-icons-png.flaticon.com/512/2850/2850614.png', sub_categories: [
            { id: 201, name: 'Quản Trị', slug: 'quan-tri', level: 1, parent_id: 2 },
            { id: 202, name: 'Tài Chính', slug: 'tai-chinh', level: 1, parent_id: 2 },
            { id: 203, name: 'Khởi Nghiệp', slug: 'khoi-nghiep', level: 1, parent_id: 2 },
        ]
    },
    { id: 3, name: 'Kỹ Năng', slug: 'ky-nang-song', level: 0, image_url: 'https://cdn-icons-png.flaticon.com/512/4207/4207247.png' },
    { id: 4, name: 'Thiếu Nhi', slug: 'thieu-nhi', level: 0, image_url: 'https://cdn-icons-png.flaticon.com/512/3081/3081048.png' },
    { id: 5, name: 'Ngoại Văn', slug: 'sach-ngoai-van', level: 0, image_url: 'https://cdn-icons-png.flaticon.com/512/206/206606.png' },
    { id: 6, name: 'Tâm Lý', slug: 'tam-ly', level: 0, image_url: 'https://cdn-icons-png.flaticon.com/512/2643/2643445.png' },
    { id: 7, name: 'Tiểu Sử', slug: 'tieu-su', level: 0, image_url: 'https://cdn-icons-png.flaticon.com/512/2436/2436702.png' },
    { id: 8, name: 'Truyện Tranh', slug: 'truyen-tranh', level: 0, image_url: 'https://cdn-icons-png.flaticon.com/512/2972/2972175.png' },
];

// ==========================================
// MOCK BOOKS (Enhanced & Expanded for Carousel)
// ==========================================

export const MOCK_BOOKS: Book[] = [
    {
        id: 1,
        title: 'Cây Cam Ngọt Của Tôi',
        slug: 'cay-cam-ngot-cua-toi',
        description: 'Cuốn sách cảm động về tuổi thơ nghèo khó nhưng đầy hy vọng...',
        authors: 'José Mauro de Vasconcelos',
        publisher_name: 'NXB Hội Nhà Văn',
        category_id: 1,
        category_name: 'Văn Học',
        category_slug: 'van-hoc',
        primary_image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
        base_price: 120000,
        min_price: 96000,
        max_price: 120000,
        discount_percent: 20,
        avg_rating: 4.8,
        review_count: 1250,
        sold_count: 5400,
        view_count: 12000,
        is_active: true,
        is_featured: true,
        created_at: '2025-01-15T10:30:00Z'
    },
    {
        id: 2,
        title: 'Nhà Giả Kim',
        slug: 'nha-gia-kim',
        description: 'Hành trình tìm kiếm kho báu và bài học về số phận',
        authors: 'Paulo Coelho',
        publisher_name: 'NXB Văn Học',
        category_id: 1,
        category_name: 'Văn Học',
        category_slug: 'van-hoc',
        primary_image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400',
        base_price: 95000,
        min_price: 76000,
        max_price: 95000,
        discount_percent: 20,
        avg_rating: 4.7,
        review_count: 2100,
        sold_count: 12000,
        view_count: 45000,
        is_active: true,
        is_featured: true,
        created_at: '2025-01-10T08:00:00Z'
    },
    {
        id: 3,
        title: 'Sapiens: Lược Sử Loài Người',
        slug: 'sapiens-luoc-su-loai-nguoi',
        authors: 'Yuval Noah Harari',
        publisher_name: 'NXB Thế Giới',
        category_id: 3,
        category_name: 'Kỹ Năng Sống',
        category_slug: 'ky-nang-song',
        primary_image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400',
        base_price: 180000,
        min_price: 153000,
        max_price: 180000,
        discount_percent: 15,
        avg_rating: 4.9,
        review_count: 3500,
        sold_count: 8900,
        view_count: 32000,
        is_active: true,
        is_featured: false,
        created_at: '2025-01-05T14:20:00Z'
    },
    {
        id: 4,
        title: 'Đắc Nhân Tâm',
        slug: 'dac-nhan-tam',
        authors: 'Dale Carnegie',
        publisher_name: 'NXB Trẻ',
        category_id: 3,
        category_name: 'Kỹ Năng Sống',
        category_slug: 'ky-nang-song',
        primary_image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
        base_price: 86000,
        min_price: 86000,
        max_price: 86000,
        avg_rating: 4.6,
        review_count: 5200,
        sold_count: 25000,
        view_count: 80000,
        is_active: true,
        is_featured: true,
        created_at: '2024-12-20T09:15:00Z'
    },
    {
        id: 5,
        title: 'Thám Tử Lừng Danh Conan - Tập 100',
        slug: 'conan-tap-100',
        authors: 'Gosho Aoyama',
        publisher_name: 'NXB Kim Đồng',
        category_id: 8,
        category_name: 'Truyện Tranh',
        category_slug: 'truyen-tranh',
        primary_image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400',
        base_price: 25000,
        min_price: 22000,
        max_price: 25000,
        discount_percent: 12,
        avg_rating: 4.9,
        review_count: 980,
        sold_count: 45000,
        view_count: 150000,
        is_active: true,
        is_featured: false,
        created_at: '2025-01-20T16:00:00Z'
    },
    {
        id: 6,
        title: 'Chiến Tranh Và Hòa Bình',
        slug: 'chien-tranh-va-hoa-binh',
        authors: 'Leo Tolstoy',
        publisher_name: 'NXB Văn Học',
        category_id: 1,
        category_name: 'Văn Học',
        category_slug: 'van-hoc',
        primary_image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400',
        base_price: 250000,
        min_price: 200000,
        max_price: 250000,
        avg_rating: 4.9,
        review_count: 450,
        sold_count: 1200,
        view_count: 5000,
        is_active: true,
        is_featured: true,
        created_at: '2025-01-25T10:00:00Z'
    },
    {
        id: 7,
        title: 'Suối Nguồn',
        slug: 'suoi-nguon',
        authors: 'Ayn Rand',
        publisher_name: 'NXB Trẻ',
        category_id: 1,
        category_name: 'Văn Học',
        category_slug: 'van-hoc',
        primary_image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400',
        base_price: 195000,
        min_price: 175000,
        max_price: 195000,
        avg_rating: 4.8,
        review_count: 890,
        sold_count: 3200,
        view_count: 8500,
        is_active: true,
        is_featured: false,
        created_at: '2025-01-22T11:00:00Z'
    },
    {
        id: 8,
        title: 'Tư Duy Nhanh Và Chậm',
        slug: 'tu-duy-nhanh-va-cham',
        authors: 'Daniel Kahneman',
        publisher_name: 'NXB Thế Giới',
        category_id: 2,
        category_name: 'Kinh Tế',
        category_slug: 'kinh-te',
        primary_image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',
        base_price: 210000,
        min_price: 189000,
        max_price: 210000,
        avg_rating: 4.7,
        review_count: 1200,
        sold_count: 4500,
        view_count: 12000,
        is_active: true,
        is_featured: true,
        created_at: '2025-01-21T09:00:00Z'
    }
];

// In-memory wishlist for front-end demo
let mockWishlist: number[] = [1, 3];

// Customer Tiers Mock Data
export const MOCK_TIERS: CustomerTier[] = [
    {
        id: 1,
        name: 'Bạc',
        min_spent: 0,
        discount_percent: 0,
        benefits: 'Thành viên mới, tích điểm 1% giá trị đơn hàng'
    },
    {
        id: 2,
        name: 'Vàng',
        min_spent: 2000000,
        discount_percent: 3,
        benefits: 'Tích điểm 2%, ưu tiên hỗ trợ, freeship đơn từ 300K'
    },
    {
        id: 3,
        name: 'Kim cương',
        min_spent: 10000000,
        discount_percent: 5,
        benefits: 'Tích điểm 3%, freeship mọi đơn, quà sinh nhật, sale riêng'
    }
];

// Voucher Mock Data
export const MOCK_VOUCHERS: Voucher[] = [
    {
        id: 1,
        code: 'CHAOBANMOI',
        name: 'Voucher Chào Bạn Mới',
        description: 'Giảm 20K cho đơn hàng từ 150K',
        discount_type: 'fixed',
        discount_value: 20000,
        min_order_value: 150000,
        used_count: 450,
        usage_limit: 1000,
        start_date: '2025-01-01',
        end_date: '2025-12-31',
        is_active: true
    },
    {
        id: 2,
        code: 'FREESHIP50',
        name: 'Mã Miễn Phí Vận Chuyển',
        description: 'Miễn phí ship tối đa 50K cho đơn từ 300K',
        discount_type: 'fixed',
        discount_value: 50000,
        min_order_value: 300000,
        used_count: 890,
        usage_limit: 2000,
        start_date: '2025-01-01',
        end_date: '2025-06-30',
        is_active: true
    },
    {
        id: 3,
        code: 'GIAM10PT',
        name: 'Ưu Đãi 10% Toàn Sàn',
        description: 'Giảm 10% tối đa 100K cho mọi đơn hàng',
        discount_type: 'percent',
        discount_value: 10,
        max_discount: 100000,
        min_order_value: 0,
        used_count: 120,
        usage_limit: 500,
        start_date: '2025-01-01',
        end_date: '2025-12-31',
        is_active: true
    },
    {
        id: 4,
        code: 'SUNDAYHAPPY',
        name: 'Chủ Nhật Vui Vẻ',
        description: 'Giảm 30K cho đơn hàng từ 250K vào Chủ Nhật',
        discount_type: 'fixed',
        discount_value: 30000,
        min_order_value: 250000,
        used_count: 15,
        usage_limit: 100,
        start_date: '2025-01-01',
        end_date: '2025-12-31',
        is_active: true
    }
];

export const homeAPI = {
    getHomeData: async () => {
        await new Promise(r => setTimeout(r, 500));
        return {
            categories: MOCK_CATEGORIES,
            vouchers: MOCK_VOUCHERS,
            tiers: MOCK_TIERS,
            flashSales: [
                {
                    flash_sale_id: 1,
                    flash_sale_name: 'Flash Sale Cuối Tuần',
                    start_time: new Date().toISOString(),
                    end_time: new Date(Date.now() + 3600000 * 5).toISOString(),
                    item_id: 1,
                    variant_id: 1,
                    sku: 'CC-001',
                    book_title: 'Cây Cam Ngọt Của Tôi',
                    original_price: 120000,
                    sale_price: 60000,
                    quantity_limit: 100,
                    sold_count: 85,
                    remaining_quantity: 15,
                    discount_percent: 50,
                    book: MOCK_BOOKS[0]
                },
                {
                    flash_sale_id: 1,
                    flash_sale_name: 'Flash Sale Cuối Tuần',
                    start_time: new Date().toISOString(),
                    end_time: new Date(Date.now() + 3600000 * 5).toISOString(),
                    item_id: 2,
                    variant_id: 5,
                    sku: 'CONAN-100',
                    book_title: 'Conan Tập 100',
                    original_price: 25000,
                    sale_price: 15000,
                    quantity_limit: 500,
                    sold_count: 480,
                    remaining_quantity: 20,
                    discount_percent: 40,
                    book: MOCK_BOOKS[4]
                },
                {
                    flash_sale_id: 1,
                    item_id: 3,
                    book_title: 'Sapiens: Lược Sử Loài Người',
                    original_price: 180000,
                    sale_price: 126000,
                    quantity_limit: 200,
                    sold_count: 150,
                    remaining_quantity: 50,
                    discount_percent: 30,
                    book: MOCK_BOOKS[2]
                },
                {
                    flash_sale_id: 1,
                    item_id: 4,
                    book_title: 'Chiến Tranh Và Hòa Bình',
                    original_price: 250000,
                    sale_price: 150000,
                    quantity_limit: 50,
                    sold_count: 42,
                    remaining_quantity: 8,
                    discount_percent: 40,
                    book: MOCK_BOOKS[5]
                },
                {
                    flash_sale_id: 1,
                    item_id: 5,
                    book_title: 'Nhà Giả Kim',
                    original_price: 95000,
                    sale_price: 47500,
                    quantity_limit: 300,
                    sold_count: 280,
                    remaining_quantity: 20,
                    discount_percent: 50,
                    book: MOCK_BOOKS[1]
                },
                {
                    flash_sale_id: 1,
                    item_id: 6,
                    book_title: 'Suối Nguồn',
                    original_price: 195000,
                    sale_price: 117000,
                    quantity_limit: 100,
                    sold_count: 70,
                    remaining_quantity: 30,
                    discount_percent: 40,
                    book: MOCK_BOOKS[6]
                }
            ] as FlashSaleItem[],
            featuredBooks: [
                ...MOCK_BOOKS.filter(b => b.is_featured),
                ...MOCK_BOOKS.filter(b => b.is_featured).map(b => ({ ...b, id: b.id + 200 }))
            ],
            // Giả lập nhiều sách hơn cho Bestsellers và New Arrivals để test carousel
            bestsellers: [...MOCK_BOOKS, ...MOCK_BOOKS.map(b => ({ ...b, id: b.id + 100 }))].sort((a, b) => b.sold_count - a.sold_count),
            newArrivals: [...MOCK_BOOKS, ...MOCK_BOOKS.map(b => ({ ...b, id: b.id + 100 }))].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        };
    },
    getCategories: async (): Promise<Category[]> => {
        await new Promise(r => setTimeout(r, 200));
        return MOCK_CATEGORIES;
    }
};

export const wishlistAPI = {
    async getWishlist(userId: number): Promise<WishlistItem[]> {
        await new Promise(r => setTimeout(r, 300));
        return MOCK_BOOKS
            .filter(b => mockWishlist.includes(b.id))
            .map(b => ({
                id: Math.random(),
                user_id: userId,
                book_id: b.id,
                added_price: b.base_price * 1.2, // Giả lập giá lúc thêm cao hơn hiện tại để test thông báo
                notify_on_price_drop: true,
                priority: b.is_featured ? 1 : 0,
                book: b,
                created_at: new Date().toISOString()
            }));
    },
    async addToWishlist(userId: number, bookId: number) {
        if (!mockWishlist.includes(bookId)) {
            mockWishlist.push(bookId);
        }
        return { success: true, wishlist_count: mockWishlist.length };
    },
    async removeFromWishlist(userId: number, bookId: number) {
        mockWishlist = mockWishlist.filter(id => id !== bookId);
        return { success: true };
    },
    async isInWishlist(userId: number, bookId: number): Promise<boolean> {
        return mockWishlist.includes(bookId);
    }
};
