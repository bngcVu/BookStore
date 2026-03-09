"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Chrome, Facebook, LogIn, Mail, Lock, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError(null);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic Validation
        if (!formData.email || !formData.password) {
            setError("Vui lòng nhập đầy đủ thông tin đăng nhập.");
            return;
        }

        setIsLoading(true);
        setError(null);

        // Simulate API Call
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Mock logic: User "admin@gmail.com" password "123456"
            // For testing, we'll let any valid-looking data pass
            console.log("Logged in with:", formData);

            // Success Redirect
            router.push("/account");
        } catch (err) {
            setError("Có lỗi xảy ra. Vui lòng kiểm tra lại thông tin.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[90vh] py-12 px-4 bg-[#fdfaf6] relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 sm:p-10 relative z-10">
                <div className="text-center mb-10">
                    <Link href="/" className="inline-block mb-6">
                        <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                            <span className="text-white font-bold text-2xl leading-none">B</span>
                        </div>
                    </Link>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Chào mừng trở lại!</h1>
                    <p className="text-slate-500 text-sm mt-3 leading-relaxed">
                        Đăng nhập để trải nghiệm trọn bộ tính năng cùng những ưu đãi dành riêng cho bạn.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm animate-in fade-in slide-in-from-top-2">
                        <AlertCircle size={18} className="shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                            <Mail size={14} className="text-slate-400" /> Email hoặc Số điện thoại
                        </label>
                        <Input
                            name="email"
                            type="text"
                            placeholder="example@gmail.com"
                            className="h-12 rounded-xl bg-slate-50 border-slate-100 focus:bg-white transition-all"
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled={isLoading}
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <Lock size={14} className="text-slate-400" /> Mật khẩu
                            </label>
                            <Link href="/forgot" className="text-xs font-bold text-primary hover:text-primary-hover transition-colors">
                                Quên mật khẩu?
                            </Link>
                        </div>
                        <Input
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            className="h-12 rounded-xl bg-slate-50 border-slate-100 focus:bg-white transition-all"
                            value={formData.password}
                            onChange={handleInputChange}
                            disabled={isLoading}
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full text-base h-12 mt-4 font-bold rounded-xl shadow-lg shadow-primary/25 disabled:opacity-70 group"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        ) : (
                            <LogIn className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        )}
                        {isLoading ? "Đang xử lý..." : "Đăng Nhập"}
                    </Button>
                </form>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-slate-100"></span>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-4 text-slate-400 font-bold tracking-widest">Hoặc</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-12 rounded-xl border-slate-100 font-bold hover:bg-slate-50 transition-colors">
                        <Chrome size={20} className="mr-2 text-red-500" /> Google
                    </Button>
                    <Button variant="outline" className="h-12 rounded-xl border-slate-100 font-bold hover:bg-slate-50 transition-colors">
                        <Facebook size={20} className="mr-2 text-blue-600" /> Facebook
                    </Button>
                </div>

                <div className="mt-10 text-center border-t border-slate-50 pt-8">
                    <p className="text-slate-500 text-sm">
                        Bạn là thành viên mới?{' '}
                        <Link href="/register" className="text-primary font-bold hover:text-primary-hover transition-all">
                            Đăng ký ngay
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
