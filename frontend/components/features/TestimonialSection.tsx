"use client";

import { Star, Quote } from "lucide-react";

const REVIEWS = [
    {
        id: 1,
        user: "Nguyễn Văn A",
        role: "Mọt sách chính hiệu",
        content: "Dịch vụ giao hàng cực nhanh, sách được đóng gói rất kỹ càng. Mình rất hài lòng với chất lượng sách tại BookStore.",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?u=a"
    },
    {
        id: 2,
        user: "Trần Thị B",
        role: "Giáo viên",
        content: "Tìm được những cuốn sách hiếm ở đây thật dễ dàng. Giao diện web mượt mà, dễ sử dụng. Sẽ còn ủng hộ dài dài!",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?u=b"
    },
    {
        id: 3,
        user: "Lê Văn C",
        role: "Sinh viên",
        content: "Nhiều chương trình khuyến mãi hấp dẫn cho sinh viên. Hệ thống tích điểm VIP rất đáng để trải nghiệm.",
        rating: 4,
        avatar: "https://i.pravatar.cc/150?u=c"
    }
];

export function TestimonialSection() {
    return (
        <section className="bg-slate-50 py-24">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-heading font-black text-slate-900 mb-4 uppercase">
                        Độc giả <span className="text-primary italic">nói gì</span> về chúng tôi?
                    </h2>
                    <p className="text-slate-500 text-sm font-medium">Hàng ngàn phản hồi tích cực từ cộng đồng yêu sách trên toàn quốc.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {REVIEWS.map((review) => (
                        <div key={review.id} className="bg-white p-8 rounded-[32px] shadow-xl shadow-slate-200/50 relative group hover:-translate-y-2 transition-transform duration-500">
                            <Quote className="absolute top-6 right-8 w-10 h-10 text-slate-50 opacity-10 group-hover:text-primary/10 transition-colors" />

                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < review.rating ? 'text-orange-400 fill-current' : 'text-slate-200'}`}
                                    />
                                ))}
                            </div>

                            <p className="text-slate-600 text-sm leading-relaxed mb-8 italic font-medium">
                                "{review.content}"
                            </p>

                            <div className="flex items-center gap-4 border-t border-slate-50 pt-6">
                                <img src={review.avatar} alt={review.user} className="w-12 h-12 rounded-full object-cover border-2 border-slate-100" />
                                <div>
                                    <h4 className="font-heading font-black text-slate-900 text-sm">{review.user}</h4>
                                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{review.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
