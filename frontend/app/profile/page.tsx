'use client';

import React, { useState, useEffect } from 'react';
import { MembershipCard } from '@/components/user/MembershipCard';
import { PointsHistoryTable } from '@/components/user/PointsHistoryTable';
import { RedeemSection } from '@/components/user/RedeemSection';
import { MyVouchers } from '@/components/user/MyVouchers';
import { OrderHistoryList } from '@/components/user/OrderHistoryList';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { userAPI, redeemAPI, MOCK_TIERS, wishlistAPI } from '@/lib/api-mock';
import { WishlistSection } from '@/components/features/WishlistSection';
import { User, CustomerTier, Voucher, WishlistItem } from '@/types';
import { User as UserIcon, Package, Heart, LogOut, Settings, Shield, Bell, Ticket } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import confetti from 'canvas-confetti';

export default function ProfilePage() {
    const [user, setUser] = useState<User | null>(null);
    const [history, setHistory] = useState<any[]>([]);
    const [orders, setOrders] = useState<any[]>([]);
    const [myVouchers, setMyVouchers] = useState<Voucher[]>([]);
    const [rewards, setRewards] = useState<any[]>([]);
    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('membership');

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            try {
                const [userData, historyData, voucherData, rewardData, wishlistData, ordersData] = await Promise.all([
                    userAPI.getProfile(),
                    userAPI.getLoyaltyHistory(),
                    userAPI.getMyVouchers(),
                    redeemAPI.getRewards(),
                    wishlistAPI.getWishlist(1), // Mock user ID 1
                    userAPI.getOrders()
                ]);

                setUser(userData);
                setHistory(historyData);
                setMyVouchers(voucherData);
                setRewards(rewardData);
                setWishlistItems(wishlistData);
                setOrders(ordersData);
            } catch (error) {
                console.error("Failed to load profile", error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    const handleRedeem = async (rewardId: number) => {
        if (!user) return;

        // Optimistic update
        const reward = rewards.find(r => r.id === rewardId);
        if (!reward) return;

        if (confirm(`Bạn có chắc chắn muốn đổi ${reward.points_cost} điểm lấy quà này?`)) {
            try {
                await redeemAPI.redeem(user.id, rewardId);

                // Hiệu ứng pháo hoa chúc mừng
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#F43F5E', '#FBBF24', '#4F46E5']
                });

                // Update local state giả lập
                setUser(prev => prev ? ({ ...prev, reward_points: prev.reward_points - reward.points_cost }) : null);
                alert("Đổi quà thành công! Kiểm tra ví Voucher ngay.");

                // Thêm một voucher mới vào danh sách giả lập
                const newVoucher = {
                    id: Date.now(),
                    code: 'REWARD' + Date.now().toString().slice(-4),
                    name: reward.name,
                    description: reward.description,
                    discount_type: 'fixed',
                    discount_value: 20000,
                    min_order_value: 0,
                    used_count: 0,
                    start_date: new Date().toISOString(),
                    end_date: new Date(Date.now() + 86400000 * 30).toISOString(),
                    is_active: true
                } as Voucher;
                setMyVouchers(prev => [newVoucher, ...prev]);

            } catch (e) {
                alert("Đổi quà thất bại");
            }
        }
    };


    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-12 h-12 bg-slate-200 rounded-full mb-4"></div>
                    <div className="h-4 w-32 bg-slate-200 rounded"></div>
                </div>
            </div>
        );
    }

    if (!user) return null;

    // Tìm hạng tiếp theo
    const currentTierIndex = MOCK_TIERS.findIndex(t => t.id === user.tier_id);
    const nextTier = MOCK_TIERS[currentTierIndex + 1];

    const menuItems = [
        { id: 'membership', label: 'Hạng thành viên', icon: UserIcon },
        { id: 'orders', label: 'Đơn hàng của tôi', icon: Package },
        { id: 'wallet', label: 'Ví Voucher', icon: Ticket },
        { id: 'wishlist', label: 'Sách yêu thích', icon: Heart },
        { id: 'notifications', label: 'Thông báo', icon: Bell },
        { id: 'settings', label: 'Cài đặt tài khoản', icon: Settings },
        { id: 'security', label: 'Bảo mật', icon: Shield },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Header />

            <main className="container mx-auto px-4 pt-32 pb-24">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">

                    {/* Sidebar */}
                    <aside className="w-full md:w-72 flex-shrink-0 space-y-6">
                        {/* User Brief */}
                        <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-slate-100 overflow-hidden relative">
                                {user.avatar_url && (
                                    <img src={user.avatar_url} alt={user.full_name} className="object-cover w-full h-full" />
                                )}
                            </div>
                            <div className="overflow-hidden">
                                <h3 className="font-bold text-slate-900 truncate">{user.full_name}</h3>
                                <p className="text-xs text-slate-500 truncate">{user.email}</p>
                            </div>
                        </div>

                        {/* Navigation */}
                        <nav className="bg-white rounded-[24px] p-4 border border-slate-100 shadow-sm">
                            <ul className="space-y-1">
                                {menuItems.map((item) => (
                                    <li key={item.id}>
                                        <button
                                            onClick={() => setActiveTab(item.id)}
                                            className={cn(
                                                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                                                activeTab === item.id
                                                    ? "bg-primary/10 text-primary"
                                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                            )}
                                        >
                                            <item.icon className={cn("w-5 h-5", activeTab === item.id ? "fill-primary/20" : "")} />
                                            {item.label}
                                        </button>
                                    </li>
                                ))}
                                <li className="pt-4 mt-4 border-t border-slate-50">
                                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all">
                                        <LogOut className="w-5 h-5" />
                                        Đăng xuất
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1">
                        {activeTab === 'membership' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center justify-between">
                                    <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Hạng thành viên & Ưu đãi</h1>
                                    <span className="text-sm font-medium text-slate-500">Cập nhật lúc: {new Date().toLocaleDateString('vi-VN')}</span>
                                </div>

                                <MembershipCard user={user} nextTier={nextTier} />

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
                                        <h3 className="font-bold text-slate-900 mb-2">Quyền lợi hiện tại</h3>
                                        <p className="text-sm text-slate-500 leading-relaxed">{user.tier?.benefits}</p>
                                    </div>
                                    <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
                                        <h3 className="font-bold text-slate-900 mb-2">Tổng chi tiêu</h3>
                                        <p className="text-2xl font-black text-primary">{user.total_spent.toLocaleString('vi-VN')}đ</p>
                                    </div>
                                    <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
                                        <h3 className="font-bold text-slate-900 mb-2">Voucher khả dụng</h3>
                                        <p className="text-2xl font-black text-rose-500">3 <span className="text-sm text-slate-400 font-medium">mã</span></p>
                                    </div>
                                </div>

                                <RedeemSection rewards={rewards} userPoints={user.reward_points} onRedeem={handleRedeem} />
                                <PointsHistoryTable transactions={history} />
                            </div>
                        )}

                        {activeTab === 'wallet' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
                                    <Ticket className="w-8 h-8 text-rose-500" />
                                    Ví Voucher của tôi
                                </h2>
                                <MyVouchers vouchers={myVouchers} />
                            </div>
                        )}

                        {activeTab === 'orders' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
                                        <Package className="w-8 h-8 text-blue-500" />
                                        Quản lý đơn hàng
                                    </h2>
                                </div>
                                <OrderHistoryList orders={orders} />
                            </div>
                        )}

                        {(activeTab === 'wishlist') && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <WishlistSection
                                    items={wishlistItems}
                                    onRemove={(id) => setWishlistItems(prev => prev.filter(i => i.id !== id))}
                                    onToggleNotify={(id) => setWishlistItems(prev => prev.map(i => i.id === id ? { ...i, notify_on_price_drop: !i.notify_on_price_drop } : i))}
                                    filter="all"
                                    onFilterChange={() => { }} // No filter in profile view for simplicity
                                />
                            </div>
                        )}

                        {(activeTab !== 'membership' && activeTab !== 'orders' && activeTab !== 'wallet' && activeTab !== 'wishlist') && (
                            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[32px] border border-slate-100 shadow-sm">
                                <Settings className="w-16 h-16 text-slate-200 mb-4 animate-spin-slow" />
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Tính năng đang phát triển</h3>
                                <p className="text-slate-500">Chúng tôi đang hoàn thiện chức năng này. Vui lòng quay lại sau.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
