"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Mail, Phone, Lock, Loader2, UserPlus, AlertCircle } from "lucide-react";

export default function RegisterPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        email: "",
        password: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError(null);
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic Validation
        if (!formData.fullName || !formData.phone || !formData.password) {
            setError("Vui lòng điền đầy đủ các thông tin bắt buộc.");
            return;
        }

        if (formData.password.length < 8) {
            setError("Mật khẩu phải có ít nhất 8 ký tự.");
            return;
        }

        setIsLoading(true);
        setError(null);

        // Simulate API Call
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log("Registered with:", formData);

            // Success Redirect to login or auto-login
            router.push("/login?registered=true");
        } catch (err) {
            setError("Đăng ký thất bại. Vui lòng thử lại sau.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[90vh] py-12 px-4 bg-[#fdfaf6] relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 sm:p-10 relative z-10">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Tạo tài khoản mới</h1>
                    <p className="text-slate-500 text-sm mt-3 leading-relaxed">
                        Tham gia cộng đồng BookStore để nhận ngay 100 điểm thưởng và hàng ngàn voucher ưu đãi.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm animate-in fade-in slide-in-from-top-2">
                        <AlertCircle size={18} className="shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                <form onSubmit={handleRegister} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                            <User size={14} className="text-slate-400" /> Họ và tên <span className="text-red-500">*</span>
                        </label>
                        <Input
                            name="fullName"
                            type="text"
                            placeholder="Nguyễn Văn A"
                            className="h-12 rounded-xl bg-slate-50 border-slate-100 focus:bg-white transition-all"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            disabled={isLoading}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                            <Phone size={14} className="text-slate-400" /> Số điện thoại <span className="text-red-500">*</span>
                        </label>
                        <Input
                            name="phone"
                            type="tel"
                            placeholder="0912 345 678"
                            className="h-12 rounded-xl bg-slate-50 border-slate-100 focus:bg-white transition-all"
                            value={formData.phone}
                            onChange={handleInputChange}
                            disabled={isLoading}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                            <Mail size={14} className="text-slate-400" /> Email (Không bắt buộc)
                        </label>
                        <Input
                            name="email"
                            type="email"
                            placeholder="example@gmail.com"
                            className="h-12 rounded-xl bg-slate-50 border-slate-100 focus:bg-white transition-all"
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled={isLoading}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                            <Lock size={14} className="text-slate-400" /> Mật khẩu <span className="text-red-500">*</span>
                        </label>
                        <Input
                            name="password"
                            type="password"
                            placeholder="Tối thiểu 8 ký tự"
                            className="h-12 rounded-xl bg-slate-50 border-slate-100 focus:bg-white transition-all"
                            value={formData.password}
                            onChange={handleInputChange}
                            disabled={isLoading}
                        />
                    </div>

                    <Button
                        type="submit"
                        variant="accent"
                        className="w-full text-base h-12 mt-4 font-bold rounded-xl shadow-lg shadow-accent/25 disabled:opacity-70 group text-white"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        ) : (
                            <UserPlus className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                        )}
                        {isLoading ? "Đang xử lý..." : "Đăng Ký Ngay"}
                    </Button>
                </form>

                <p className="text-[10px] text-slate-400 text-center mt-6 leading-relaxed px-4">
                    Bằng việc nhấn Đăng ký, bạn đã đồng ý với{' '}
                    <Link href="/terms" className="text-primary font-bold hover:underline">Điều khoản</Link> &{' '}
                    <Link href="/privacy" className="text-primary font-bold hover:underline">Chính sách</Link> của BookStore.
                </p>

                <div className="mt-8 text-center border-t border-slate-50 pt-8">
                    <p className="text-slate-500 text-sm">
                        Đã có tài khoản?{' '}
                        <Link href="/login" className="text-primary font-bold hover:text-primary-hover transition-all">
                            Đăng nhập ngay
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
