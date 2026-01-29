# IMPLEMENTATION WALKTHROUGH - ADVANCED FEATURES

> **Source Document:** ADVANCED-FEATURES.md
> **Format:** Step-by-step actionable tasks
> **Stack:** Next.js 15 + TypeScript + Tailwind CSS v4
> **Database:** MySQL 8.x with Stored Procedures

---

## 🗺️ ROADMAP OVERVIEW

```
Phase 1: Wishlist (Week 1)          ✅ Quick Win
Phase 2: Loyalty System (Week 2-3)  ⭐ Foundation
Phase 3: Notifications (Week 4)     📢 Engagement
Phase 4: Promotions (Week 5-6)      🎁 Revenue
Phase 5: Refunds (Week 7)           ↩️  Support
```

---

# PHASE 1: WISHLIST FEATURE

**Priority:** 🔥 High | **Effort:** Low | **Impact:** High

---

## TASK 1.1: Setup Types & API Mock

**Mục tiêu:** Tạo TypeScript interfaces và mock API responses

### Files to Create/Edit:
- `frontend/types/index.ts` (Edit)
- `frontend/lib/api-mock.ts` (Create)

### Steps:

**Step 1.1.1: Update Types**
```typescript
// File: frontend/types/index.ts
// Thêm interface mới vào file hiện có

export interface WishlistItem {
  id: number;
  user_id: number;
  book_id: number;
  book: Book; // Reference to existing Book interface
  created_at: string;
}

export interface UserBookInteraction {
  id: number;
  user_id: number;
  book_id: number;
  interaction_type: 'view' | 'wishlist' | 'cart' | 'purchase';
  interaction_count: number;
  last_interaction_at: string;
}
```

**Step 1.1.2: Create Mock API**
```typescript
// File: frontend/lib/api-mock.ts
import { WishlistItem } from '@/types';

export const wishlistAPI = {
  // Get user's wishlist
  async getWishlist(userId: number): Promise<WishlistItem[]> {
    // Mock data for development
    return [
      {
        id: 1,
        user_id: userId,
        book_id: 1,
        book: {
          book_id: 1,
          title: "Cây Cam Ngọt Của Tôi",
          slug: "cay-cam-ngot-cua-toi",
          primary_image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
          author_name: "José Mauro",
          publisher_name: "NXB Hội Nhà Văn",
          avg_rating: 4.8,
          review_count: 1250,
          min_price: 96000,
          max_price: 120000,
        },
        created_at: new Date().toISOString(),
      }
    ];
  },

  // Add book to wishlist
  async addToWishlist(userId: number, bookId: number): Promise<{ success: boolean; wishlist_count: number }> {
    console.log(`[Mock API] Adding book ${bookId} to wishlist for user ${userId}`);
    return { success: true, wishlist_count: 5 };
  },

  // Remove from wishlist
  async removeFromWishlist(userId: number, bookId: number): Promise<{ success: boolean }> {
    console.log(`[Mock API] Removing book ${bookId} from wishlist`);
    return { success: true };
  },

  // Check if book is in wishlist
  async isInWishlist(userId: number, bookId: number): Promise<boolean> {
    // Mock: Random true/false for demo
    return Math.random() > 0.5;
  }
};
```

**Verification:**
- [ ] TypeScript compiler không có lỗi
- [ ] Mock API functions có return type đúng

---

## TASK 1.2: Create Heart Icon Component

**Mục tiêu:** Tạo component tái sử dụng cho Wishlist toggle

### Files to Create:
- `frontend/components/ui/WishlistButton.tsx`

### Steps:

**Step 1.2.1: Create Component**
```typescript
// File: frontend/components/ui/WishlistButton.tsx
"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  bookId: number;
  initialState?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onToggle?: (isWishlisted: boolean) => void;
}

export function WishlistButton({ 
  bookId, 
  initialState = false,
  size = 'md',
  onToggle 
}: WishlistButtonProps) {
  const [isWishlisted, setIsWishlisted] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsLoading(true);

    try {
      // TODO: Replace with real API call
      await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
      
      const newState = !isWishlisted;
      setIsWishlisted(newState);
      onToggle?.(newState);
      
      // Optional: Show toast notification
      console.log(newState ? 'Added to wishlist' : 'Removed from wishlist');
    } catch (error) {
      console.error('Failed to toggle wishlist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={cn(
        sizeClasses[size],
        "rounded-full flex items-center justify-center",
        "bg-white/90 backdrop-blur-sm shadow-md",
        "hover:bg-white hover:scale-110",
        "transition-all duration-200",
        "border border-gray-100",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "group"
      )}
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart 
        className={cn(
          iconSizes[size],
          "transition-colors duration-200",
          isWishlisted 
            ? "fill-red-500 text-red-500" 
            : "text-gray-400 group-hover:text-red-400"
        )}
      />
    </button>
  );
}
```

**Verification:**
- [ ] Component renders without errors
- [ ] Heart icon toggles fill state khi click
- [ ] Hover effect hoạt động smooth
- [ ] Loading state prevents double clicks

---

## TASK 1.3: Integrate Wishlist Button vào ProductCard

**Mục tiêu:** Thêm Heart icon vào ProductCard component hiện có

### Files to Edit:
- `frontend/components/features/ProductCard.tsx`

### Steps:

**Step 1.3.1: Import WishlistButton**
```typescript
// Add to imports
import { WishlistButton } from "@/components/ui/WishlistButton";
```

**Step 1.3.2: Add to UI (Inside Image Container)**
Tìm div chứa Image, thêm absolute positioned button:

```tsx
{/* Existing Image Container */}
<div className="relative aspect-[3/4] bg-gray-50 overflow-hidden">
  {/* Existing Image */}
  <Image src={...} />
  
  {/* ADD THIS: Wishlist Button - Top Right */}
  <div className="absolute top-3 right-3 z-10">
    <WishlistButton 
      bookId={book.book_id} 
      size="sm"
      onToggle={(isWishlisted) => {
        console.log(`Book ${book.title} wishlist state:`, isWishlisted);
      }}
    />
  </div>
  
  {/* Existing Quick Actions Overlay */}
  <div className="absolute inset-0 ...">
    ...
  </div>
</div>
```

**Verification:**
- [ ] Heart icon hiển thị ở góc trên bên phải mỗi Product Card
- [ ] Click Heart không trigger navigation đến PDP
- [ ] Heart icon nổi trên ảnh với shadow rõ ràng
- [ ] State persist trong session (tạm thời)

---

## TASK 1.4: Create Wishlist Page

**Mục tiêu:** Tạo trang hiển thị danh sách Wishlist

### Files to Create:
- `frontend/app/wishlist/page.tsx`

### Steps:

**Step 1.4.1: Create Page Component**
```tsx
// File: frontend/app/wishlist/page.tsx
import { ProductCard } from "@/components/features/ProductCard";
import { Book } from "@/types";
import { Heart, ShoppingCart } from "lucide-react";

// Mock data - Replace with API call
const MOCK_WISHLIST: Book[] = [
  {
    book_id: 1,
    title: "Cây Cam Ngọt Của Tôi",
    slug: "cay-cam-ngot-cua-toi",
    primary_image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
    author_name: "José Mauro de Vasconcelos",
    publisher_name: "NXB Hội Nhà Văn",
    avg_rating: 4.8,
    review_count: 1250,
    min_price: 96000,
    max_price: 120000,
    discount_percent: 20,
    is_flash_sale: true,
  },
  // Add more mock items...
];

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-red-500 fill-current" />
            </div>
            <div>
              <h1 className="text-3xl font-heading font-bold text-gray-900">
                Sách Yêu Thích
              </h1>
              <p className="text-gray-500">
                {MOCK_WISHLIST.length} sản phẩm
              </p>
            </div>
          </div>

          {/* Bulk Actions */}
          <button className="btn-primary flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            <span>Thêm tất cả vào giỏ</span>
          </button>
        </div>

        {/* Empty State */}
        {MOCK_WISHLIST.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Heart className="w-12 h-12 text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Chưa có sách yêu thích
            </h2>
            <p className="text-gray-500 mb-6">
              Khám phá và lưu những cuốn sách bạn yêu thích
            </p>
            <a href="/" className="btn-primary">
              Khám phá ngay
            </a>
          </div>
        )}

        {/* Wishlist Grid */}
        {MOCK_WISHLIST.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_WISHLIST.map((book) => (
              <ProductCard key={book.book_id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

**Verification:**
- [ ] Navigate to `/wishlist` shows page
- [ ] Grid layout responsive (2 col mobile, 4 col desktop)
- [ ] Empty state hiển thị khi không có item
- [ ] Header shows count correctly

---

## TASK 1.5: Add Wishlist Link to Header

**Mục tiêu:** Thêm navigation link vào Header

### Files to Edit:
- `frontend/components/layout/Header.tsx`

### Steps:

**Step 1.5.1: Add Wishlist Link**
Tìm phần Actions, thêm Heart button:

```tsx
{/* Existing Actions div */}
<div className="flex items-center gap-2 md:gap-4">
  {/* ADD THIS: Wishlist Link */}
  <a 
    href="/wishlist"
    className="p-2.5 hover:bg-gray-50 rounded-xl text-gray-600 hover:text-primary transition-colors relative hidden sm:flex"
  >
    <Heart className="w-6 h-6" />
    {/* Optional: Badge for count */}
    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full ring-2 ring-white">
      3
    </span>
  </a>

  {/* Existing Cart button */}
  <button className="...">
    <ShoppingBag />
  </button>
  
  {/* ... rest of header */}
</div>
```

**Verification:**
- [ ] Heart icon hiển thị trong Header
- [ ] Click navigate to `/wishlist`
- [ ] Badge count hiển thị (mock number)
- [ ] Responsive: Ẩn trên mobile nếu cần

---

## TESTING CHECKLIST - PHASE 1

**Manual Testing:**
- [ ] Từ Homepage, click Heart trên product card → State toggle
- [ ] Click nhiều lần nhanh → Không bị duplicate request
- [ ] Navigate to `/wishlist` → See products
- [ ] Click "Thêm tất cả vào giỏ" → Console log (chưa implement)
- [ ] Remove item from wishlist page → Grid updates

**Visual Testing:**
- [ ] Heart icon animation smooth
- [ ] No layout shift khi toggle
- [ ] Colors match design system (Red-500 for filled)
- [ ] Shadow/blur effect on hover

---

# PHASE 2: LOYALTY & REWARDS SYSTEM

**Priority:** ⭐ High | **Effort:** Medium | **Impact:** Very High

---

## TASK 2.1: Setup Loyalty Types & Context

**Mục tiêu:** Tạo TypeScript interfaces và Context API để quản lý loyalty state

### Files to Create/Edit:
- `frontend/types/index.ts` (Edit)
- `frontend/contexts/LoyaltyContext.tsx` (Create)

### Steps:

**Step 2.1.1: Update Types**
```typescript
// File: frontend/types/index.ts
export interface CustomerTier {
  id: number;
  name: string;
  min_spent: number;
  discount_percent: number;
  benefits: string;
  icon?: string;
  color?: string;
}

export interface RewardPointsTransaction {
  id: number;
  user_id: number;
  points: number; // +/- value
  type: 'earn' | 'redeem' | 'expire' | 'adjust';
  reference_type: string | null; // 'order', 'review', 'referral'
  reference_id: number | null;
  description: string;
  expires_at: string | null;
  created_at: string;
}

export interface UserLoyalty {
  current_tier: CustomerTier;
  next_tier: CustomerTier | null;
  total_spent: number;
  reward_points: number;
  progress_to_next_tier: number; // Percentage 0-100
  amount_needed_for_upgrade: number;
}
```

**Step 2.1.2: Create Loyalty Context**
```typescript
// File: frontend/contexts/LoyaltyContext.tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserLoyalty, CustomerTier } from '@/types';

interface LoyaltyContextType {
  loyalty: UserLoyalty | null;
  isLoading: boolean;
  refreshLoyalty: () => Promise<void>;
}

const LoyaltyContext = createContext<LoyaltyContextType | undefined>(undefined);

// Mock tiers
const MOCK_TIERS: CustomerTier[] = [
  {
    id: 1,
    name: 'Bạc',
    min_spent: 0,
    discount_percent: 0,
    benefits: 'Tích điểm 1% giá trị đơn hàng',
    icon: '🥈',
    color: '#C0C0C0'
  },
  {
    id: 2,
    name: 'Vàng',
    min_spent: 2000000,
    discount_percent: 3,
    benefits: 'Tích điểm 2%, ưu tiên hỗ trợ, freeship đơn từ 300K',
    icon: '🥇',
    color: '#FFD700'
  },
  {
    id: 3,
    name: 'Kim cương',
    min_spent: 10000000,
    discount_percent: 5,
    benefits: 'Tích điểm 3%, freeship mọi đơn, quà sinh nhật',
    icon: '💎',
    color: '#4FC3F7'
  }
];

export function LoyaltyProvider({ children }: { children: ReactNode }) {
  const [loyalty, setLoyalty] = useState<UserLoyalty | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshLoyalty = async () => {
    setIsLoading(true);
    try {
      // Mock data - Replace with real API
      const mockTotalSpent = 5000000; // 5 triệu
      const currentTier = MOCK_TIERS.find(t => 
        mockTotalSpent >= t.min_spent && 
        mockTotalSpent < (MOCK_TIERS[MOCK_TIERS.indexOf(t) + 1]?.min_spent || Infinity)
      ) || MOCK_TIERS[0];
      
      const currentIndex = MOCK_TIERS.indexOf(currentTier);
      const nextTier = MOCK_TIERS[currentIndex + 1] || null;
      
      const amountNeeded = nextTier 
        ? nextTier.min_spent - mockTotalSpent 
        : 0;
      
      const progress = nextTier
        ? ((mockTotalSpent - currentTier.min_spent) / (nextTier.min_spent - currentTier.min_spent)) * 100
        : 100;

      setLoyalty({
        current_tier: currentTier,
        next_tier: nextTier,
        total_spent: mockTotalSpent,
        reward_points: 15000,
        progress_to_next_tier: Math.min(progress, 100),
        amount_needed_for_upgrade: Math.max(amountNeeded, 0)
      });
    } catch (error) {
      console.error('Failed to load loyalty data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshLoyalty();
  }, []);

  return (
    <LoyaltyContext.Provider value={{ loyalty, isLoading, refreshLoyalty }}>
      {children}
    </LoyaltyContext.Provider>
  );
}

export function useLoyalty() {
  const context = useContext(LoyaltyContext);
  if (context === undefined) {
    throw new Error('useLoyalty must be used within LoyaltyProvider');
  }
  return context;
}
```

**Verification:**
- [ ] Context provider wraps app without errors
- [ ] Mock data loads correctly
- [ ] Progress calculation accurate

---

## TASK 2.2: Create Membership Card Component

**Mục tiêu:** Tạo component hiển thị thẻ thành viên với gradient theo tier

### Files to Create:
- `frontend/components/features/MembershipCard.tsx`

### Steps:

**Step 2.2.1: Create Component**
```typescript
// File: frontend/components/features/MembershipCard.tsx
"use client";

import { useLoyalty } from "@/contexts/LoyaltyContext";
import { formatCurrency } from "@/lib/utils";
import { Sparkles, TrendingUp } from "lucide-react";

export function MembershipCard() {
  const { loyalty, isLoading } = useLoyalty();

  if (isLoading) {
    return (
      <div className="h-48 bg-gray-100 rounded-2xl animate-pulse"></div>
    );
  }

  if (!loyalty) return null;

  const { current_tier, next_tier, reward_points, progress_to_next_tier, amount_needed_for_upgrade } = loyalty;

  // Gradient colors by tier
  const gradients = {
    'Bạc': 'from-gray-400 to-gray-600',
    'Vàng': 'from-yellow-400 to-yellow-600',
    'Kim cương': 'from-blue-400 to-cyan-500'
  };

  const gradient = gradients[current_tier.name as keyof typeof gradients] || gradients['Bạc'];

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-6 text-white shadow-xl`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-24 -translate-x-24"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Tier Name & Icon */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{current_tier.icon}</span>
            <div>
              <p className="text-sm font-medium opacity-90">Hạng thành viên</p>
              <h3 className="text-2xl font-heading font-bold">{current_tier.name}</h3>
            </div>
          </div>
          <Sparkles className="w-6 h-6" />
        </div>

        {/* Points Display */}
        <div className="flex items-baseline gap-2 mb-6">
          <span className="text-4xl font-bold">{reward_points.toLocaleString()}</span>
          <span className="text-lg opacity-90">điểm</span>
        </div>

        {/* Progress to Next Tier */}
        {next_tier && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>Đến hạng {next_tier.name}</span>
              </div>
              <span className="font-semibold">{Math.round(progress_to_next_tier)}%</span>
            </div>
            
            {/* Progress Bar */}
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-500"
                style={{ width: `${progress_to_next_tier}%` }}
              ></div>
            </div>
            
            <p className="text-xs opacity-75">
              Còn {formatCurrency(amount_needed_for_upgrade)} để lên hạng
            </p>
          </div>
        )}

        {/* Benefits */}
        <div className="mt-6 pt-6 border-t border-white/20">
          <p className="text-sm opacity-90">{current_tier.benefits}</p>
        </div>
      </div>
    </div>
  );
}
```

**Verification:**
- [ ] Card hiển thị gradient đúng theo tier
- [ ] Progress bar animate smooth
- [ ] Points format với thousands separator
- [ ] Responsive layout

---

## TASK 2.3: Create Points History Component

**Mục tiêu:** Hiển thị lịch sử giao dịch điểm

### Files to Create:
- `frontend/components/features/PointsHistory.tsx`

### Steps:

**Step 2.3.1: Create Component**
```typescript
// File: frontend/components/features/PointsHistory.tsx
import { RewardPointsTransaction } from "@/types";
import { ArrowDownCircle, ArrowUpCircle, Clock } from "lucide-react";

// Mock data
const MOCK_TRANSACTIONS: RewardPointsTransaction[] = [
  {
    id: 1,
    user_id: 1,
    points: 500,
    type: 'earn',
    reference_type: 'order',
    reference_id: 12345,
    description: 'Tích điểm từ đơn hàng #ORD12345',
    expires_at: '2026-12-31T00:00:00Z',
    created_at: '2026-01-20T10:30:00Z'
  },
  {
    id: 2,
    user_id: 1,
    points: -200,
    type: 'redeem',
    reference_type: 'order',
    reference_id: 12350,
    description: 'Đổi điểm giảm 200.000đ',
    expires_at: null,
    created_at: '2026-01-25T15:00:00Z'
  },
  // Add more mock items...
];

export function PointsHistory() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-xl font-heading font-bold mb-6">Lịch sử điểm thưởng</h3>

      <div className="space-y-4">
        {MOCK_TRANSACTIONS.map((transaction) => {
          const isEarn = transaction.points > 0;
          
          return (
            <div 
              key={transaction.id}
              className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {/* Icon */}
              <div className={`p-2 rounded-full ${isEarn ? 'bg-green-100' : 'bg-red-100'}`}>
                {isEarn ? (
                  <ArrowUpCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <ArrowDownCircle className="w-5 h-5 text-red-600" />
                )}
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900">{transaction.description}</p>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{new Date(transaction.created_at).toLocaleDateString('vi-VN')}</span>
                </div>
              </div>

              {/* Points */}
              <div className="text-right">
                <p className={`text-lg font-bold ${isEarn ? 'text-green-600' : 'text-red-600'}`}>
                  {isEarn ? '+' : ''}{transaction.points.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">{transaction.type}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

**Verification:**
- [ ] List displays transactions chronologically
- [ ] Icons và colors đúng (Green=Earn, Red=Redeem)
- [ ] Date format Vietnamese
- [ ] Hover effect smooth

---

## TASK 2.4: Create User Dashboard với Loyalty Tab

**Mục tiêu:** Tạo trang Dashboard tích hợp Membership Card và Points History

### Files to Create:
- `frontend/app/account/page.tsx`

### Steps:

**Step 2.4.1: Wrap App với LoyaltyProvider**
```tsx
// File: frontend/app/layout.tsx
import { LoyaltyProvider } from '@/contexts/LoyaltyContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="...">
        <LoyaltyProvider>
          {children}
        </LoyaltyProvider>
      </body>
    </html>
  );
}
```

**Step 2.4.2: Create Account Page**
```tsx
// File: frontend/app/account/page.tsx
import { MembershipCard } from "@/components/features/MembershipCard";
import { PointsHistory } from "@/components/features/PointsHistory";
import { User, Package, MapPin, Gift } from "lucide-react";

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold mb-2">Tài khoản của tôi</h1>
          <p className="text-gray-500">Quản lý thông tin và đơn hàng</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <nav className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 text-primary font-semibold">
                <Gift className="w-5 h-5" />
                <span>Hạng thành viên</span>
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700">
                <User className="w-5 h-5" />
                <span>Hồ sơ</span>
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700">
                <Package className="w-5 h-5" />
                <span>Đơn hàng</span>
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700">
                <MapPin className="w-5 h-5" />
                <span>Sổ địa chỉ</span>
              </a>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9 space-y-8">
            {/* Membership Card */}
            <MembershipCard />

            {/* Points History */}
            <PointsHistory />
          </main>
        </div>
      </div>
    </div>
  );
}
```

**Verification:**
- [ ] Navigate to `/account` shows dashboard
- [ ] Sidebar navigation highlights active tab
- [ ] Membership card loads với mock data
- [ ] Points history displays transactions
- [ ] Responsive grid layout

---

## TESTING CHECKLIST - PHASE 2

**Manual Testing:**
- [ ] Loyalty context loads without errors
- [ ] Membership card shows correct tier
- [ ] Progress bar percentage accurate
- [ ] Points history sorted newest first
- [ ] Navigation between tabs smooth

**Visual Testing:**
- [ ] Gradient colors match tier
- [ ] Card shadow/elevation proper
- [ ] Icons align correctly
- [ ] Responsive: Card full-width on mobile

---

## 📊 NEXT PHASES (Quick Reference)

**Phase 3: Notifications** - Implement bell icon + notification list
**Phase 4: Promotions** - Badge system + auto-apply logic
**Phase 5: Refunds** - Request form + admin approval flow

---

## 🔄 ITERATION NOTES

After completing Phase 1 & 2:
1. Replace mock API with real backend calls
2. Add error handling (try-catch, fallbacks)
3. Implement loading states (Skeletons)
4. Add toast notifications for user actions
5. Write unit tests for critical components

---

*Last Updated: 2026-01-29 | Document Version: 1.0*
