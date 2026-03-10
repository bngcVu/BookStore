/**
 * Centralized Mock Data for BookStore
 * Bám sát Database Schema và kế hoạch FE-IMPROVEMENT-PLAN.md
 */

export const CATEGORIES = [
    { id: "cat-1", name: "Kỹ năng sống", slug: "ky-nang-song", icon: "🌱" },
    { id: "cat-2", name: "Tiểu thuyết", slug: "tieu-thuyet", icon: "📖" },
    { id: "cat-3", name: "Kinh doanh", slug: "kinh-doanh", icon: "💼" },
    { id: "cat-4", name: "Tâm lý", slug: "tam-ly", icon: "🧠" },
    { id: "cat-5", name: "Văn học Việt Nam", slug: "van-hoc-viet-nam", icon: "🇻🇳" },
    { id: "cat-6", name: "Lịch sử", slug: "lich-su", icon: "🏺" },
    { id: "cat-7", name: "Tâm linh", slug: "tam-linh", icon: "✨" },
];

export const AUTHORS = [
    { id: "auth-1", name: "Rosie Nguyễn", slug: "rosie-nguyen" },
    { id: "auth-2", name: "Nguyễn Nhật Ánh", slug: "nguyen-nhat-anh" },
    { id: "auth-3", name: "Nguyên Phong", slug: "nguyen-phong" },
    { id: "auth-4", name: "Paulo Coelho", slug: "paulo-coelho" },
];

const MOCK_REVIEWS = [
    { id: "rev-1", user: "Nguyễn Văn A", rating: 5, comment: "Sách rất hay, đóng gói cẩn thận.", date: "2024-03-01", isVerified: true },
    { id: "rev-2", user: "Trần Thị B", rating: 4, comment: "Nội dung ý nghĩa nhưng bìa hơi mỏng.", date: "2024-02-28", isVerified: true },
    { id: "rev-3", user: "Lê Văn C", rating: 5, comment: "Giao hàng nhanh, nội dung sâu sắc.", date: "2024-02-25", isVerified: false },
];

export const ALL_BOOKS = [
    // --- FLASH SALE BOOKS ---
    {
        id: "1",
        slug: "nghe-thuat-tu-duy",
        title: "Nghệ Thuật Tư Duy Rành Mạch",
        author: "Rolf Dobelli",
        category: "Kỹ năng sống",
        publisher: "NXB Thế Giới",
        originalPrice: 190000,
        salePrice: 145000,
        imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600",
        images: [
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1589998059171-988d887df643?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=600"
        ],
        isFlashSale: true,
        soldQuantity: 85,
        totalQuantity: 100,
        rating: 4.8,
        reviewsCount: 1250,
        badge: "Bán chạy",
        description: "Thông thường, chúng ta hay mắc phải những sai lầm trong tư duy mà không hề hay biết. Cuốn sách này chỉ ra 99 lỗi tư duy phổ biến nhất giúp bạn có cái nhìn tỉnh táo hơn.",
        reviews: MOCK_REVIEWS,
        variants: [
            { id: "v1-1", name: "Bìa Mềm", priceOffset: 0, stock: 15 },
            { id: "v1-2", name: "Bìa Cứng", priceOffset: 45000, stock: 5 }
        ]
    },
    {
        id: "2",
        slug: "nha-gia-kim",
        title: "Nhà Giả Kim",
        author: "Paulo Coelho",
        category: "Tiểu thuyết",
        publisher: "NXB Hội Nhà Văn",
        originalPrice: 150000,
        salePrice: 99000,
        imageUrl: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=600",
        images: [
            "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=600"
        ],
        isFlashSale: true,
        soldQuantity: 150,
        totalQuantity: 200,
        rating: 4.9,
        reviewsCount: 3500,
        badge: "Kinh điển",
        description: "Nhà giả kim là một cuốn sách dành cho những ai muốn tìm kiếm vận mệnh của mình. Câu chuyện về chàng chăn cừu Santiago sẽ truyền cảm hứng cho bạn.",
        reviews: MOCK_REVIEWS,
        variants: [{ id: "v2-1", name: "Bản Phổ Thông", priceOffset: 0, stock: 50 }]
    },
    {
        id: "4",
        slug: "dac-nhan-tam",
        title: "Đắc Nhân Tâm",
        author: "Dale Carnegie",
        category: "Tâm lý",
        publisher: "NXB Trẻ",
        originalPrice: 135000,
        salePrice: 85000,
        imageUrl: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=600",
        images: [
            "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1589998059171-988d887df643?auto=format&fit=crop&q=80&w=600"
        ],
        isFlashSale: true,
        soldQuantity: 250,
        totalQuantity: 500,
        rating: 4.9,
        reviewsCount: 5200,
        badge: "Must Read",
        description: "Cuốn sách hay nhất mọi thời đại đưa bạn đến thành công.",
        reviews: MOCK_REVIEWS,
        variants: [{ id: "v4-1", name: "Bìa Mềm", priceOffset: 0, stock: 100 }]
    },
    {
        id: "11",
        slug: "cay-cam-ngot-cua-toi",
        title: "Cây Cam Ngọt Của Tôi",
        author: "José Mauro de Vasconcelos",
        category: "Văn học",
        publisher: "Nhã Nam",
        originalPrice: 108000,
        salePrice: 85000,
        imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=600",
        images: [
            "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600"
        ],
        isFlashSale: true,
        soldQuantity: 45,
        totalQuantity: 100,
        rating: 4.8,
        reviewsCount: 890,
        description: "Câu chuyện cảm động về chú bé Zézé.",
        reviews: MOCK_REVIEWS,
        variants: [{ id: "v11-1", name: "Bìa Mềm", priceOffset: 0, stock: 45 }]
    },
    {
        id: "12",
        slug: "con-chut-gi-de-nho",
        title: "Còn Chút Gì Để Nhớ",
        author: "Nguyễn Nhật Ánh",
        category: "Văn học Việt Nam",
        publisher: "NXB Trẻ",
        originalPrice: 95000,
        salePrice: 70000,
        imageUrl: "https://images.unsplash.com/photo-1509021436665-8f07cd7ee6ca?auto=format&fit=crop&q=80&w=600",
        images: [
            "https://images.unsplash.com/photo-1509021436665-8f07cd7ee6ca?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600"
        ],
        isFlashSale: true,
        soldQuantity: 30,
        totalQuantity: 50,
        rating: 4.7,
        reviewsCount: 450,
        badge: "Yêu thích",
        description: "Những kỷ niệm tuổi học trò hồn nhiên, trong trẻo.",
        reviews: MOCK_REVIEWS,
        variants: [{ id: "v12-1", name: "Bìa Mềm", priceOffset: 0, stock: 20 }]
    },
    {
        id: "5",
        slug: "su-luoc-ve-loai-nguoi",
        title: "Sapiens: Lược Sử Loài Người",
        author: "Yuval Noah Harari",
        category: "Lịch sử",
        publisher: "Nhã Nam",
        originalPrice: 250000,
        salePrice: 180000,
        imageUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=600",
        images: [
            "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1509021436665-8f07cd7ee6ca?auto=format&fit=crop&q=80&w=600"
        ],
        isFlashSale: true,
        soldQuantity: 62,
        totalQuantity: 150,
        rating: 4.6,
        reviewsCount: 1100,
        badge: "Kiến thức",
        description: "Hành trình vĩ đại của loài người từ thuở sơ khai.",
        reviews: MOCK_REVIEWS,
        variants: [{ id: "v5-1", name: "Bìa Cứng", priceOffset: 0, stock: 40 }]
    },
    {
        id: "15",
        slug: "toi-thay-hoa-vang-tren-co-xanh",
        title: "Tôi Thấy Hoa Vàng Trên Cỏ Xanh",
        author: "Nguyễn Nhật Ánh",
        category: "Văn học Việt Nam",
        publisher: "NXB Trẻ",
        originalPrice: 125000,
        salePrice: 98000,
        imageUrl: "https://images.unsplash.com/photo-1476275466078-4007374ef0c4?auto=format&fit=crop&q=80&w=600",
        images: [
            "https://images.unsplash.com/photo-1476275466078-4007374ef0c4?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600"
        ],
        isFlashSale: true,
        soldQuantity: 95,
        totalQuantity: 150,
        rating: 4.8,
        reviewsCount: 2200,
        description: "Tuổi thơ đọng lại qua từng trang sách của Nguyễn Nhật Ánh.",
        reviews: MOCK_REVIEWS,
        variants: [{ id: "v15-1", name: "Bìa Mềm", priceOffset: 0, stock: 55 }]
    },

    // --- BEST SELLER BOOKS ---
    {
        id: "6",
        slug: "muon-kiep-nhan-sinh",
        title: "Muôn Kiếp Nhân Sinh - Tập 1",
        author: "Nguyên Phong",
        category: "Tâm linh",
        publisher: "First News",
        originalPrice: 168000,
        salePrice: 120000,
        imageUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=600",
        images: [
            "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600"
        ],
        rating: 4.8,
        reviewsCount: 1500,
        badge: "Xu hướng",
        description: "Muôn kiếp nhân sinh là một bức tranh kỳ vĩ về luật Nhân quả và Luân hồi của vũ trụ.",
        reviews: MOCK_REVIEWS,
        variants: [
            { id: "v6-1", name: "Bìa Mềm", priceOffset: 0, stock: 20 },
            { id: "v6-2", name: "Bìa Cứng", priceOffset: 60000, stock: 10 }
        ]
    },
    {
        id: "7",
        slug: "thi-pham-nam-cao",
        title: "Tuyển Tập Nam Cao",
        author: "Nam Cao",
        category: "Văn học Việt Nam",
        publisher: "NXB Văn Học",
        originalPrice: 185000,
        salePrice: 160000,
        imageUrl: "https://images.unsplash.com/photo-1589998059171-988d887df643?auto=format&fit=crop&q=80&w=600",
        images: [
            "https://images.unsplash.com/photo-1589998059171-988d887df643?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=600"
        ],
        rating: 4.5,
        reviewsCount: 420,
        description: "Những tác phẩm kinh điển của nhà văn Nam Cao được tuyển chọn.",
        reviews: MOCK_REVIEWS,
        variants: [{ id: "v7-1", name: "Bìa Mềm", priceOffset: 0, stock: 30 }]
    },
    {
        id: "8",
        slug: "cha-giau-cha-ngheo",
        title: "Cha Giàu Cha Nghèo",
        author: "Robert T. Kiyosaki",
        category: "Kinh doanh",
        publisher: "NXB Trẻ",
        originalPrice: 140000,
        imageUrl: "https://images.unsplash.com/photo-1592492159418-39f319320569?auto=format&fit=crop&q=80&w=600",
        images: [
            "https://images.unsplash.com/photo-1592492159418-39f319320569?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=600"
        ],
        rating: 4.7,
        reviewsCount: 2200,
        description: "Cuốn sách về tài chính cá nhân bán chạy nhất thế giới.",
        reviews: MOCK_REVIEWS,
        variants: [{ id: "v8-1", name: "Bìa Mềm", priceOffset: 0, stock: 40 }]
    },
    {
        id: "9",
        slug: "di-tim-le-song",
        title: "Đi Tìm Lẽ Sống",
        author: "Viktor E. Frankl",
        category: "Tâm lý",
        publisher: "NXB Trẻ",
        originalPrice: 120000,
        salePrice: 95000,
        imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600",
        images: [
            "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=600"
        ],
        rating: 4.9,
        reviewsCount: 3100,
        description: "Hy vọng và ý nghĩa cuộc sống ngay cả trong những hoàn cảnh khắc nghiệt nhất.",
        reviews: MOCK_REVIEWS,
        variants: [{ id: "v9-1", name: "Bìa Mềm", priceOffset: 0, stock: 25 }]
    },
    {
        id: "10",
        slug: "tuoi-tre-dang-gia-bao-nhieu",
        title: "Tuổi Trẻ Đáng Giá Bao Nhiêu",
        author: "Rosie Nguyễn",
        category: "Kỹ năng sống",
        publisher: "Nhã Nam",
        originalPrice: 120000,
        salePrice: 75000,
        imageUrl: "https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a?auto=format&fit=crop&q=80&w=600",
        images: [
            "https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=600"
        ],
        rating: 4.6,
        reviewsCount: 1560,
        description: "Cùng khám phá giá trị của những năm tháng tuổi trẻ.",
        reviews: MOCK_REVIEWS,
        variants: [{ id: "v10-1", name: "Bìa Mềm", priceOffset: 0, stock: 60 }]
    },
    {
        id: "13",
        slug: "tu-duy-thinh-vuong",
        title: "Bí Mật Tư Duy Triệu Phú",
        author: "T. Harv Eker",
        category: "Kinh doanh",
        publisher: "NXB Tổng Hợp TPHCM",
        originalPrice: 120000,
        imageUrl: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=600",
        images: [
            "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1592492159418-39f319320569?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600"
        ],
        rating: 4.8,
        reviewsCount: 1800,
        description: "Học cách thay đổi tư duy để thay đổi cuộc đời và trở nên thịnh vượng.",
        reviews: MOCK_REVIEWS,
        variants: [{ id: "v13-1", name: "Bìa Mềm", priceOffset: 0, stock: 70 }]
    },
    {
        id: "14",
        slug: "chien-thang-con-quy-trong-ban",
        title: "Chiến Thắng Con Quỷ Trong Bạn",
        author: "Napoleon Hill",
        category: "Kỹ năng sống",
        publisher: "First News",
        originalPrice: 145000,
        salePrice: 110000,
        imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead27d8?auto=format&fit=crop&q=80&w=600",
        images: [
            "https://images.unsplash.com/photo-1455390582262-044cdead27d8?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=600"
        ],
        rating: 4.7,
        reviewsCount: 1200,
        description: "Phương pháp vượt qua nỗi sợ hãi để thành công.",
        reviews: MOCK_REVIEWS,
        variants: [{ id: "v14-1", name: "Bìa Mềm", priceOffset: 0, stock: 35 }]
    }
];

export const FLASH_SALE_BOOKS = ALL_BOOKS.filter(b => b.isFlashSale);
export const BEST_SELLERS = ALL_BOOKS.filter(b => !b.isFlashSale);

export const USER_PROFILE = {
    id: "user-1",
    name: "Nguyễn Văn A",
    email: "nguyenvana@gmail.com",
    phone: "0912 345 678",
    joinDate: "15/05/2023",
    loyalty: {
        tier: "Vàng",
        color: "text-amber-500",
        bg: "bg-amber-100",
        discountPercent: 5,
        nextTier: "Kim Cương",
        currentSpend: 3500000,
        targetSpend: 5000000,
        points: 5000 // 5000 points = 50,000đ
    }
};
