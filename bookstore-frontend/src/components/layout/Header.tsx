import Link from 'next/link';
import { ShoppingCart, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 glass">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 shrink-0">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg leading-none">B</span>
                    </div>
                    <span className="font-bold text-xl tracking-tight hidden sm:block">
                        BookStore
                    </span>
                </Link>

                {/* Search Bar - Hidden on small mobile */}
                <div className="flex-1 max-w-2xl hidden md:flex items-center relative group">
                    <input
                        type="text"
                        placeholder="Tìm kiếm sách, tác giả, nhà xuất bản..."
                        className="w-full h-10 pl-4 pr-10 rounded-full border border-slate-200 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                    />
                    <button className="absolute right-3 text-slate-400 group-hover:text-primary transition-colors">
                        <Search size={18} />
                    </button>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 shrink-0">
                    {/* Mobile Search Icon */}
                    <button className="md:hidden w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors">
                        <Search size={20} className="text-slate-600" />
                    </button>

                    {/* User Account */}
                    <Link href="/account">
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <User size={20} className="text-slate-600" />
                        </Button>
                    </Link>

                    {/* Cart */}
                    <Link href="/cart">
                        <Button variant="ghost" size="icon" className="rounded-full relative">
                            <ShoppingCart size={20} className="text-slate-600" />
                            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-accent text-white text-[10px] font-bold flex items-center justify-center border-2 border-white box-content">
                                3
                            </span>
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
