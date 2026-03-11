"use client";

import React, { useState } from 'react';
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    Edit3,
    Trash2,
    EyeOff,
    Eye,
    BookType,
    Tags,
    Users,
    Building2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { BEST_SELLERS, FLASH_SALE_BOOKS } from '@/lib/mockData';

const TABS = [
    { id: 'books', name: 'Sách (SKUs)', icon: BookType, count: 124 },
    { id: 'categories', name: 'Danh mục', icon: Tags, count: 12 },
    { id: 'authors', name: 'Tác giả', icon: Users, count: 48 },
    { id: 'publishers', name: 'Nhà xuất bản', icon: Building2, count: 15 },
];

// Combine basic mocked books
const MOCK_BOOKS = [...BEST_SELLERS, ...FLASH_SALE_BOOKS].map((b, i) => ({
    ...b,
    id: b.id || `BS-2024-${i + 1000}`,
    category: i % 2 === 0 ? "Kinh tế" : "Văn học",
    publisher: i % 3 === 0 ? "NXB Trẻ" : "NXB Tổng Hợp",
    status: i % 5 !== 0,
    skuCount: i % 2 === 0 ? 2 : 1 // Hardcover, Paperback
}));

export default function CatalogManagementPage() {
    const [activeTab, setActiveTab] = useState('books');
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Danh mục & Sản phẩm</h1>
                    <p className="text-sm font-medium text-slate-500 mt-1">Quản lý sách, tên tác giả, danh mục và nhà xuất bản</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        className="font-bold border-slate-200"
                        onClick={() => alert("Đang chuẩn bị tệp danh mục...")}
                    >
                        Xuất Excel
                    </Button>
                    <Button
                        className="font-bold bg-primary hover:bg-primary/90 text-white gap-2"
                        onClick={() => alert("Mở form thêm Sách mới...")}
                    >
                        <Plus size={16} /> Thêm Mới
                    </Button>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl p-1.5 shadow-sm border border-slate-100 flex overflow-x-auto no-scrollbar">
                {TABS.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "flex items-center gap-2 px-6 py-3 rounded-xl text-sm transition-all duration-300 whitespace-nowrap",
                                isActive ? "bg-primary text-white font-black shadow-md shadow-primary/20" : "text-slate-600 font-bold hover:bg-slate-50"
                            )}
                        >
                            <tab.icon size={16} />
                            {tab.name}
                            <span className={cn(
                                "ml-1.5 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider",
                                isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                            )}>
                                {tab.count}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Table Area (Only showing for 'books' to save space in this demo) */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">

                {/* Table Toolbar */}
                <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50">
                    <div className="relative w-full sm:w-80 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo Tên sách, ISBN, Mã SKU..."
                            className="w-full pl-10 pr-4 h-10 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Button
                            variant="outline"
                            className="w-full sm:w-auto h-10 gap-2 font-bold text-slate-600 border-slate-200"
                            onClick={() => alert("Mở bộ lọc nâng cao...")}
                        >
                            <Filter size={16} /> Lọc
                        </Button>
                    </div>
                </div>

                {/* Data Table */}
                <div className="overflow-x-auto">
                    {activeTab === 'books' && (
                        <table className="w-full text-left text-sm text-slate-600">
                            <thead className="bg-slate-50 uppercase text-[10px] font-black tracking-widest text-slate-400">
                                <tr>
                                    <th className="p-4 w-10 text-center"><input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" /></th>
                                    <th className="p-4 w-[300px]">Thông tin sách</th>
                                    <th className="p-4">SKU/Biến thể</th>
                                    <th className="p-4">Phân loại</th>
                                    <th className="p-4">Giá bán</th>
                                    <th className="p-4 text-center">Trạng thái</th>
                                    <th className="p-4 text-right">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {MOCK_BOOKS.slice(0, 8).map((book, idx) => (
                                    <tr key={idx} className="hover:bg-primary/5 transition-colors group">
                                        <td className="p-4 text-center"><input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" /></td>
                                        <td className="p-4">
                                            <div className="flex gap-4 items-center">
                                                <div className="w-12 h-16 rounded-lg bg-slate-100 shrink-0 overflow-hidden shadow-sm">
                                                    <img src={book.imageUrl} alt={book.title} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-bold text-slate-900 text-sm line-clamp-2 leading-snug group-hover:text-primary transition-colors cursor-pointer">{book.title}</p>
                                                    <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-wider">Mã: {book.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <span className="w-6 h-6 rounded bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-black">{book.skuCount}</span>
                                                <span className="text-xs text-slate-500 font-medium">Bản in</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <p className="font-bold text-slate-700 text-xs">{book.category}</p>
                                            <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mt-1">{book.publisher}</p>
                                        </td>
                                        <td className="p-4">
                                            <p className="font-black text-slate-900">{book.salePrice?.toLocaleString('vi-VN')} đ</p>
                                            {book.originalPrice && <p className="text-xs text-slate-400 font-bold line-through mt-0.5">{book.originalPrice?.toLocaleString('vi-VN')} đ</p>}
                                        </td>
                                        <td className="p-4 text-center">
                                            {book.status ? (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-100">
                                                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Hiển thị
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500 bg-slate-100">
                                                    <span className="w-2 h-2 rounded-full bg-slate-400"></span> Đã ẩn
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="w-8 h-8 p-0 text-slate-400 hover:text-primary hover:bg-primary/10"
                                                    onClick={() => alert(`Sửa thông tin: ${book.title}`)}
                                                >
                                                    <Edit3 size={16} />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="w-8 h-8 p-0 text-slate-400 hover:text-amber-500 hover:bg-amber-50"
                                                    onClick={() => alert(`Thay đổi trạng thái hiển thị: ${book.title}`)}
                                                >
                                                    {book.status ? <EyeOff size={16} /> : <Eye size={16} />}
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="w-8 h-8 p-0 text-slate-400 hover:text-rose-500 hover:bg-rose-50"
                                                    onClick={() => confirm(`Xóa sách ${book.title}?`) && alert("Đã xóa mô phỏng")}
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {activeTab !== 'books' && (
                        <div className="p-24 text-center">
                            <p className="text-slate-400 text-sm font-bold animate-pulse">Giao diện {TABS.find(t => t.id === activeTab)?.name} đang được cập nhật...</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500 bg-slate-50/50">
                    <p>Hiển thị <span className="font-bold text-slate-900">1</span> đến <span className="font-bold text-slate-900">8</span> trong <span className="font-bold text-slate-900">124</span> kết quả</p>
                    <div className="flex gap-1">
                        <Button variant="outline" size="sm" className="w-8 h-8 p-0 font-bold text-slate-400" disabled>&lt;</Button>
                        <Button variant="outline" size="sm" className="w-8 h-8 p-0 font-black bg-primary text-white border-primary">1</Button>
                        <Button variant="outline" size="sm" className="w-8 h-8 p-0 font-bold hover:text-primary">2</Button>
                        <Button variant="outline" size="sm" className="w-8 h-8 p-0 font-bold hover:text-primary">3</Button>
                        <Button variant="outline" size="sm" className="w-8 h-8 p-0 font-bold text-slate-600 hover:text-primary">&gt;</Button>
                    </div>
                </div>

            </div>
        </div>
    );
}
