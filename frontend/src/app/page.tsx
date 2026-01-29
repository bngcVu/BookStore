import Link from "next/link";
import { ArrowRight, BookOpen, Search, ShoppingBag, User } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            <span className="font-serif text-xl font-bold tracking-tight">BookStore</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-ink-muted">
            <Link href="/books" className="hover:text-primary transition-colors">Sách</Link>
            <Link href="/categories" className="hover:text-primary transition-colors">Danh mục</Link>
            <Link href="/authors" className="hover:text-primary transition-colors">Tác giả</Link>
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
          </nav>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-100 rounded-md transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <Link href="/cart" className="p-2 hover:bg-slate-100 rounded-md transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full"></span>
            </Link>
            <Link href="/login" className="p-2 hover:bg-slate-100 rounded-md transition-colors">
              <User className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section - Asymmetric Grid */}
      <section className="container mx-auto px-4 py-12 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Text Content - Spans 7 cols */}
        <div className="md:col-span-7 space-y-6 animate-slide-up">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-sm">
            Mùa thu 2026
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-black leading-[1.1] text-ink">
            Mở ra thế giới <br />
            <span className="text-primary italic">Tri thức</span> mới.
          </h1>
          <p className="text-lg md:text-xl text-ink-muted max-w-lg leading-relaxed">
            Khám phá hàng ngàn đầu sách chọn lọc, từ văn học kinh điển đến sách chuyên ngành mới nhất.
          </p>
          <div className="flex items-center gap-4 pt-4">
            <Link
              href="/books"
              className="px-8 py-4 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2 group shadow-lg shadow-primary/20"
            >
              Mua sắm ngay
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/collections/bestsellers"
              className="px-8 py-4 bg-white border border-border text-ink font-medium rounded-lg hover:bg-slate-50 transition-all"
            >
              Xem Bán chạy
            </Link>
          </div>
        </div>

        {/* Visual - Spans 5 cols */}
        <div className="md:col-span-5 relative h-[400px] md:h-[500px] bg-slate-100 rounded-lg overflow-hidden border border-border group animate-fade-in delay-200">
          {/* Abstract Composition */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700"></div>
          <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>

          <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur p-4 rounded-sm border border-slate-200 max-w-[200px]">
            <p className="font-serif font-bold text-lg">Phía Tây không có gì lạ</p>
            <p className="text-xs text-ink-muted mt-1">Erich Maria Remarque</p>
          </div>
        </div>
      </section>

      {/* Featured Stats */}
      <section className="bg-slate-50 border-y border-border py-12">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Đầu sách", value: "50,000+" },
            { label: "Tác giả", value: "12,000+" },
            { label: "Độc giả", value: "1.2M+" },
            { label: "Năm thành lập", value: "2010" }
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <p className="font-serif text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</p>
              <p className="text-sm font-medium text-ink-muted uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
