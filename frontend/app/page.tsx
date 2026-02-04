"use client";

import { HeroSection } from "@/components/home/HeroSection";
import { TrendingCategories, TopAuthors, BookClubPromo } from "@/components/home/SidebarWidgets";
import { FlashSale } from "@/components/home/FlashSale";
import { ProductCard } from "@/components/product/ProductCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Book, FlashSaleItem } from "@/types";

export default function Home() {
  // MOCK DATA matching DB structure
  const recommendedBooks: Book[] = [
    {
      id: 1,
      title: "The Midnight Library",
      slug: "the-midnight-library",
      authors: ["Matt Haig"],
      base_price: 14.99,
      avg_rating: 4.8,
      review_count: 120,
      sold_count: 500,
      image_url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600",
      is_active: true,
      is_featured: true,
    },
    {
      id: 2,
      title: "Project Hail Mary",
      slug: "project-hail-mary",
      authors: ["Andy Weir"],
      base_price: 16.50,
      avg_rating: 4.9,
      review_count: 350,
      sold_count: 800,
      image_url: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=600",
      is_active: true,
      is_featured: true,
    },
    {
      id: 3,
      title: "Dune",
      slug: "dune",
      authors: ["Frank Herbert"],
      base_price: 11.99,
      original_price: 18.00,
      avg_rating: 4.7,
      review_count: 999,
      sold_count: 5000,
      image_url: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=600",
      is_active: true,
      is_featured: true,
    },
    {
      id: 4,
      title: "1984",
      slug: "1984",
      authors: ["George Orwell"],
      base_price: 9.99,
      avg_rating: 4.9,
      review_count: 2000,
      sold_count: 10000,
      image_url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600",
      is_active: true,
      is_featured: true,
    },
  ];

  const flashSaleItems: FlashSaleItem[] = [
    {
      id: 101,
      flash_sale_id: 1,
      variant_id: 201,
      sale_price: 10.99,
      original_price: 16.99,
      quantity_limit: 100,
      sold_count: 12,
      book: {
        id: 5,
        title: "Silent Patient",
        slug: "silent-patient",
        authors: ["Alex Michaelides"],
        base_price: 16.99,
        avg_rating: 4.5,
        review_count: 220,
        sold_count: 12,
        image_url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300",
        is_active: true,
        is_featured: false,
      }
    },
    {
      id: 102,
      flash_sale_id: 1,
      variant_id: 202,
      sale_price: 11.50,
      original_price: 16.00,
      quantity_limit: 50,
      sold_count: 5,
      book: {
        id: 6,
        title: "Normal People",
        slug: "normal-people",
        authors: ["Sally Rooney"],
        base_price: 16.00,
        avg_rating: 4.2,
        review_count: 150,
        sold_count: 85,
        image_url: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=300",
        is_active: true,
        is_featured: true,
      }
    },
    {
      id: 103,
      flash_sale_id: 1,
      variant_id: 203,
      sale_price: 9.00,
      original_price: 18.00,
      quantity_limit: 200,
      sold_count: 180,
      book: {
        id: 7,
        title: "Educated",
        slug: "educated",
        authors: ["Tara Westover"],
        base_price: 18.00,
        avg_rating: 4.8,
        review_count: 500,
        sold_count: 800,
        image_url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=300",
        is_active: true,
        is_featured: true,
      }
    },
    {
      id: 104,
      flash_sale_id: 1,
      variant_id: 204,
      sale_price: 13.50,
      original_price: 18.00,
      quantity_limit: 20,
      sold_count: 2,
      book: {
        id: 8,
        title: "Thinking, Fast and Slow",
        slug: "thinking-fast-and-slow",
        authors: ["Daniel Kahneman"],
        base_price: 18.00,
        avg_rating: 4.6,
        review_count: 300,
        sold_count: 1500,
        image_url: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=300",
        is_active: true,
        is_featured: false,
      }
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-7xl">

        {/* Navigation / Breadcrumbs style links */}
        <div className="flex items-center gap-6 mb-8 text-sm font-medium text-slate-500 overflow-x-auto no-scrollbar">
          <Link href="/" className="text-blue-600 font-bold whitespace-nowrap">Trang chủ</Link>
          <Link href="/literature" className="hover:text-blue-600 whitespace-nowrap">Văn học</Link>
          <Link href="/non-fiction" className="hover:text-blue-600 whitespace-nowrap">Phi hư cấu</Link>
          <Link href="/textbooks" className="hover:text-blue-600 whitespace-nowrap">Sách giáo khoa</Link>
          <Link href="/kids" className="hover:text-blue-600 whitespace-nowrap">Thiếu nhi</Link>
          <Link href="/sale" className="text-orange-500 font-bold whitespace-nowrap">Khuyến mãi</Link>
        </div>

        {/* Hero Section */}
        <div className="mb-12">
          <HeroSection />
        </div>

        {/* Main Grid: Content + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">

          {/* Left Content Column */}
          <div className="lg:col-span-9 space-y-12">

            {/* Recommended Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Gợi ý cho bạn</h2>
                  <p className="text-slate-500 text-sm mt-1">Dựa trên các cuốn sách bạn đã xem gần đây</p>
                </div>
                <Link href="/products" className="text-blue-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                  Xem tất cả <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recommendedBooks.map((book) => (
                  <ProductCard key={book.id} book={book} />
                ))}
              </div>
            </section>

            {/* Flash Sale Banner */}
            <section>
              <FlashSale items={flashSaleItems} />
            </section>
          </div>

          {/* Right Sidebar Column */}
          <div className="lg:col-span-3 space-y-6">
            <TrendingCategories />
            <TopAuthors />
            <BookClubPromo />
          </div>
        </div>
      </div>
    </main>
  );
}
