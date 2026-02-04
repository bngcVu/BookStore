import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

export function TrendingCategories() {
    const categories = [
        "Viễn tưởng", "Lãng mạn", "Tiểu sử", "Sách nấu ăn", "Kỹ năng sống", "Truyện tranh"
    ];

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-4">
                <span className="text-blue-600">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                </span>
                <h3 className="font-bold text-slate-900 text-lg">Danh mục Phổ biến</h3>
            </div>
            <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                    <Link
                        key={cat}
                        href={`/category/${cat.toLowerCase()}`}
                        className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm font-medium rounded-xl transition-colors border border-slate-200/50"
                    >
                        {cat}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export function TopAuthors() {
    // Mock data matching Author interface + extra UI field
    const authors = [
        { id: 1, name: "Nguyễn Nhật Ánh", slug: "nguyen-nhat-anh", image_url: "https://i.pravatar.cc/150?u=sk", genre: "Văn học thiếu nhi" },
        { id: 2, name: "J.K. Rowling", slug: "jk-rowling", image_url: "https://i.pravatar.cc/150?u=jk", genre: "Giả tưởng" },
        { id: 3, name: "Haruki Murakami", slug: "haruki-murakami", image_url: "https://i.pravatar.cc/150?u=hm", genre: "Hiện thực huyền ảo" },
        { id: 4, name: "Rosie Nguyễn", slug: "rosie-nguyen", image_url: "https://i.pravatar.cc/150?u=ja", genre: "Kỹ năng sống" },
    ];

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-4">
                <span className="text-blue-600">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </span>
                <h3 className="font-bold text-slate-900 text-lg">Tác giả Hàng đầu</h3>
            </div>
            <div className="space-y-4">
                {authors.map((author) => (
                    <div key={author.id} className="flex items-center gap-3 group cursor-pointer">
                        <img
                            src={author.image_url}
                            alt={author.name}
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-transparent group-hover:ring-blue-500 transition-all"
                        />
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-slate-900 text-sm truncate group-hover:text-blue-600 transition-colors">{author.name}</h4>
                            <p className="text-xs text-slate-500 truncate">{author.genre}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export function BookClubPromo() {
    return (
        <div className="bg-[#475569] rounded-2xl p-8 text-center text-white relative overflow-hidden group">
            <div className="relative z-10 flex flex-col items-center">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Câu Lạc Bộ Sách</h3>
                <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                    Tham gia câu lạc bộ sách hàng tháng để nhận ưu đãi 20%.
                </p>
                <button className="w-full bg-white text-slate-900 font-bold py-3 rounded-xl hover:bg-slate-50 transition-colors shadow-lg active:scale-95">
                    Tham Gia Ngay
                </button>
            </div>
            {/* Decorative circle */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
        </div>
    );
}
