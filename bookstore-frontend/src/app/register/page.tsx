import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] py-12 px-4 bg-slate-50">
            <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-slate-100 p-8">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Tạo tài khoản mới</h1>
                    <p className="text-slate-500 text-sm mt-2">
                        Đăng ký để trở thành Member và tích lũy điểm BookStore
                    </p>
                </div>

                <form className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Họ và tên</label>
                        <Input type="text" placeholder="Nguyễn Văn A" required />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Số điện thoại</label>
                        <Input type="tel" placeholder="0901234567" required />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Email</label>
                        <Input type="email" placeholder="example@gmail.com" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Mật khẩu</label>
                        <Input type="password" placeholder="Tối thiểu 8 ký tự" required />
                    </div>

                    <Button type="submit" variant="accent" className="w-full text-base h-12 mt-4 font-semibold">
                        Đăng Ký
                    </Button>
                </form>

                <p className="text-xs text-slate-400 text-center mt-6 leading-relaxed">
                    Bằng việc đăng ký, bạn đồng ý với{' '}
                    <Link href="/terms" className="text-primary hover:underline">Điều khoản dịch vụ</Link> và{' '}
                    <Link href="/privacy" className="text-primary hover:underline">Chính sách bảo mật</Link> của chúng tôi.
                </p>

                <div className="mt-6 text-center border-t border-slate-100 pt-6">
                    <p className="text-slate-500 text-sm flex items-center justify-center gap-1">
                        Đã có tài khoản?{' '}
                        <Link href="/login" className="text-primary font-medium hover:underline">
                            Đăng nhập ngay
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
