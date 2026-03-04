import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 sm:gap-16">
      {/* 1. Hero headline (Asymmetric tension: 90/10 split) */}
      <section className="relative overflow-hidden w-full bg-slate-50 border-b border-slate-100 min-h-[60vh] flex items-center">
        <div className="container mx-auto px-4 lg:grid lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-8 space-y-8 py-20">
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
              Khai mở tri thức.<br />
              <span className="text-primary">Đánh thức tiềm năng.</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
              Hàng ngàn tựa sách chất lượng cao được tuyển chọn khắt khe.
              Trải nghiệm mua sắm tối giản và nhanh chóng nhất.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" className="h-14 px-8 text-base">
                Khám phá ngay
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-base bg-white">
                Tra cứu Sách giảm giá
              </Button>
            </div>

            {/* 3. Benefit bullets */}
            <div className="flex items-center gap-6 mt-12 pt-8 border-t border-slate-200/60 max-w-lg">
              <div className="flex flex-col gap-1">
                <span className="font-bold text-slate-900">10k+</span>
                <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">Tựa sách</span>
              </div>
              <div className="w-px h-8 bg-slate-200"></div>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-slate-900">100%</span>
                <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">Sách có bản quyền</span>
              </div>
              <div className="w-px h-8 bg-slate-200"></div>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-slate-900">Sẵn sàng</span>
                <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">Giao hỏa tốc 2H</span>
              </div>
            </div>
          </div>
        </div>

        {/* Abstract Background Element (Not Mesh Gradient! Solid geometry) */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-primary/5 -skew-x-12 translate-x-16 pointer-events-none" />
      </section>

      {/* Featured Books Setup PlaceHolder */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Cửa hàng khai bút</h2>
          <Button variant="link" className="text-slate-500">
            Xem thêm &rarr;
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="group flex flex-col gap-3">
              <div className="aspect-[2/3] bg-slate-100 rounded-md border border-slate-200 relative overflow-hidden transition-all duration-300 group-hover:shadow-md">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <Button size="sm" variant="accent" className="w-full shadow-lg">Thêm Giỏ Hàng</Button>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-slate-500 font-medium tracking-wide">TÂM LÝ - KỸ NĂNG</span>
                <h3 className="font-medium text-slate-900 leading-snug line-clamp-2">Nghệ Thuật Tư Duy Rành Mạch (Bìa Mềm)</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-bold text-accent">145.000đ</span>
                  <span className="text-xs text-slate-400 line-through">190.000đ</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
