import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
    return (
        <div className="flex flex-col items-center justify-center flex-1 py-12 px-4 bg-slate-50">
            <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-slate-100 p-8">
                <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-2xl leading-none">B</span>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Đăng nhập tài khoản</h1>
                    <p className="text-slate-500 text-sm mt-2">
                        Đăng nhập để theo dõi Wishlist và nhận mã giảm giá cá nhân
                    </p>
                </div>

                <form className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Email hoặc Số điện thoại</label>
                        <Input type="text" placeholder="Nhập email hoặc số điện thoại" />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-slate-700">Mật khẩu</label>
                            <Link href="/forgot" className="text-sm text-primary hover:underline">
                                Quên mật khẩu?
                            </Link>
                        </div>
                        <Input type="password" placeholder="••••••••" />
                    </div>

                    <Button type="submit" className="w-full text-base h-12 mt-6">
                        Đăng Nhập
                    </Button>
                </form>

                <div className="mt-8 text-center border-t border-slate-100 pt-6">
                    <p className="text-slate-500 text-sm flex items-center justify-center gap-1">
                        Chưa có tài khoản?{' '}
                        <Link href="/register" className="text-primary font-medium hover:underline">
                            Đăng ký ngay
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
