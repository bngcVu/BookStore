const MOCK_DATA = {
    user: {
        id: 1,
        full_name: "Nguyễn Văn A",
        email: "nguyen.a@example.com",
        avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        tier: "Vàng",
        reward_points: 1250,
        cart_count: 2
    },
    categories: [
        { id: 1, name: "Văn học", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800" },
        { id: 2, name: "Kinh tế", image: "https://images.unsplash.com/photo-1554774853-719586f8c277?auto=format&fit=crop&q=80&w=800" },
        { id: 3, name: "Thiếu nhi", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800" },
        { id: 4, name: "Tâm lý", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800" },
        { id: 5, name: "Ngoại ngữ", image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=800" }
    ],
    books: [
        {
            id: 1,
            title: "Cây Cam Ngọt Của Tôi",
            author: "José Mauro de Vasconcelos",
            price: 108000,
            original_price: 120000,
            rating: 4.8,
            reviews_count: 128,
            image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600",
            category: "Văn học",
            is_flash_sale: true,
            discount: 10,
            description: "Một câu chuyện cảm động về cậu bé Zezé 5 tuổi thông minh, tinh nghịch nhưng cô đơn...",
            variants: [
                { type: "Bìa mềm", price: 108000 },
                { type: "Bìa cứng", price: 150000 }
            ]
        },
        {
            id: 2,
            title: "Nhà Giả Kim",
            author: "Paulo Coelho",
            price: 79000,
            original_price: 85000,
            rating: 4.9,
            reviews_count: 5430,
            image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=600",
            category: "Văn học",
            is_flash_sale: false,
            description: "Tất cả những trải nghiệm trong chuyến phiêu du theo đuổi vận mệnh của mình đã giúp Santiago hiểu được ý nghĩa sâu xa nhất của hạnh phúc.",
            variants: [
                { type: "Bìa mềm", price: 79000 }
            ]
        },
        {
            id: 3,
            title: "Đắc Nhân Tâm",
            author: "Dale Carnegie",
            price: 86000,
            original_price: 90000,
            rating: 5.0,
            reviews_count: 3100,
            image: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?auto=format&fit=crop&q=80&w=600",
            category: "Tâm lý",
            is_flash_sale: true,
            discount: 5,
            description: "Quyển sách đầu tiên và hay nhất mọi thời đại về nghệ thuật giao tiếp và ứng xử.",
            variants: [
                { type: "Bìa mềm", price: 86000 },
                { type: "Bìa cứng", price: 120000 }
            ]
        },
        {
            id: 4,
            title: "Sapiens: Lược Sử Loài Người",
            author: "Yuval Noah Harari",
            price: 185000,
            original_price: 210000,
            rating: 4.7,
            reviews_count: 890,
            image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=600",
            category: "Kinh tế",
            is_flash_sale: false,
            description: "Một cái nhìn táo bạo về lịch sử loài người từ thời kỳ đồ đá đến thung lũng Silicon.",
            variants: [
                { type: "Bìa mềm", price: 185000 }
            ]
        }
    ],
    cart_items: [
        {
            id: 1,
            book_id: 1,
            book_title: "Cây Cam Ngọt Của Tôi",
            variant: "Bìa mềm",
            price: 108000,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=200"
        },
        {
            id: 2,
            book_id: 3,
            book_title: "Đắc Nhân Tâm",
            variant: "Bìa mềm",
            price: 86000,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?auto=format&fit=crop&q=80&w=200"
        }
    ]
};

window.MOCK_DATA = MOCK_DATA;

window.formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};
