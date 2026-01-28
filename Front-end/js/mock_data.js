/**
 * MOCK DATA - Based on bookstore database schema
 */

const MOCK_DATA = {
    user: {
        id: 1,
        full_name: "Nguyễn Văn A",
        email: "nguyenvana@example.com",
        avatar_url: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        tier: "Vàng",
        reward_points: 1540,
        cart_count: 3
    },
    categories: [
        { id: 1, name: "Văn học", slug: "van-hoc", image: "https://images.unsplash.com/photo-1474932430478-367dbb6832c1?auto=format&fit=crop&q=80&w=300" },
        { id: 2, name: "Kinh tế", slug: "kinh-te", image: "https://images.unsplash.com/photo-1554774853-719586f8c277?auto=format&fit=crop&q=80&w=300" },
        { id: 3, name: "Thiếu nhi", slug: "thieu-nhi", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=300" },
        { id: 4, name: "Tâm lý - Kỹ năng", slug: "tam-ly-ky-nang", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=300" },
        { id: 5, name: "Sách giáo khoa", slug: "sach-giao-khoa", image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=300" }
    ],
    hot_authors: [
        { id: 1, name: "Nguyễn Nhật Ánh", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" },
        { id: 2, name: "Rosie Nguyễn", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200" },
        { id: 3, name: "Tony Buổi Sáng", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200" }
    ],
    books: [
        {
            id: 1,
            title: "Cây Cam Ngọt Của Tôi",
            slug: "cay-cam-ngot-cua-toi",
            author: "José Mauro de Vasconcelos",
            price: 108000,
            original_price: 135000,
            rating: 4.8,
            sold: 12500,
            image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
            category_id: 1,
            is_flash_sale: true,
            discount: 20
        },
        {
            id: 2,
            title: "Nhà Giả Kim",
            slug: "nha-gia-kim",
            author: "Paulo Coelho",
            price: 79000,
            original_price: 85000,
            rating: 4.9,
            sold: 45000,
            image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400",
            category_id: 1,
            is_flash_sale: false,
            discount: 7
        },
        {
            id: 3,
            title: "Đắc Nhân Tâm",
            slug: "dac-nhan-tam",
            author: "Dale Carnegie",
            price: 88000,
            original_price: 110000,
            rating: 4.7,
            sold: 89000,
            image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400",
            category_id: 4,
            is_flash_sale: true,
            discount: 20
        },
        {
            id: 4,
            title: "Tuổi Trẻ Đáng Giá Bao Nhiêu",
            slug: "tuoi-tre-dang-gia-bao-nhieu",
            author: "Rosie Nguyễn",
            price: 90000,
            original_price: 100000,
            rating: 4.5,
            sold: 21000,
            image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400",
            category_id: 4,
            is_flash_sale: false,
            discount: 10
        },
        {
            id: 5,
            title: "Mắt Biếc",
            slug: "mat-biec",
            author: "Nguyễn Nhật Ánh",
            price: 120000,
            original_price: 150000,
            rating: 4.9,
            sold: 15400,
            image: "https://images.unsplash.com/photo-1516979187457-637abb6289a8?auto=format&fit=crop&q=80&w=400",
            category_id: 1,
            is_flash_sale: false,
            discount: 20
        },
        {
            id: 6,
            title: "Hai Số Phận",
            slug: "hai-so-phan",
            author: "Jeffrey Archer",
            price: 158000,
            original_price: 198000,
            rating: 4.8,
            sold: 3200,
            image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=400",
            category_id: 1,
            is_flash_sale: true,
            discount: 20
        }
    ],
    cart_items: [
        {
            id: 1,
            book_title: "Cây Cam Ngọt Của Tôi",
            price: 108000,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=100"
        },
        {
            id: 3,
            book_title: "Đắc Nhân Tâm",
            price: 88000,
            quantity: 2,
            image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=100"
        }
    ]
};

// Simple formatted price helper
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

// Export if needed, or just global
window.MOCK_DATA = MOCK_DATA;
window.formatPrice = formatPrice;
