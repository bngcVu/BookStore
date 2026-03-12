# Khuyến Nghị Kiến Trúc Backend cho BookStore

> Tài liệu được tạo dựa trên phân tích các skill từ `.antigravity` folder và requirements từ Frontend/Database

## 📋 Tổng Quan Quyết Định

### Kiến Trúc Được Chọn: **Clean Architecture với Domain-Driven Design**
- **Lý do**: Complexity cao (38 bảng, nhiều business rules), cần tách biệt domain logic
- **Trade-off**: Tăng complexity ban đầu nhưng maintainable và testable cao
- **Skill Reference**: `architecture-patterns/SKILL.md`

---

## 🏗️ Cấu Trúc Thư Mục Backend (Dựa trên Clean Architecture)

```
backend/src/main/java/com/bookstore/
├── domain/                    # Entities & Business Rules (Core Layer)
│   ├── entities/
│   │   ├── User.java
│   │   ├── Book.java  
│   │   ├── Order.java
│   │   ├── CustomerTier.java
│   │   └── FlashSale.java
│   ├── valueobjects/
│   │   ├── Email.java
│   │   ├── Money.java
│   │   └── ISBN.java
│   ├── aggregates/
│   │   ├── OrderAggregate.java
│   │   └── CartAggregate.java
│   └── interfaces/            # Repository interfaces
│       ├── UserRepository.java
│       ├── BookRepository.java
│       └── OrderRepository.java
│
├── application/               # Use Cases (Application Layer)
│   ├── usecases/
│   │   ├── user/
│   │   │   ├── RegisterUserUseCase.java
│   │   │   ├── LoginUserUseCase.java
│   │   │   └── UpdateUserTierUseCase.java
│   │   ├── book/
│   │   │   ├── SearchBooksUseCase.java
│   │   │   ├── GetBookDetailsUseCase.java
│   │   │   └── UpdateBookInventoryUseCase.java
│   │   ├── order/
│   │   │   ├── CreateOrderUseCase.java
│   │   │   ├── ProcessPaymentUseCase.java
│   │   │   └── ApplyPromotionUseCase.java
│   │   └── flashsale/
│   │       ├── StartFlashSaleUseCase.java
│   │       └── CheckFlashSaleEligibilityUseCase.java
│   └── services/              # Application Services
│       ├── AuthenticationService.java
│       ├── RecommendationService.java  
│       └── NotificationService.java
│
├── infrastructure/            # External Concerns (Infrastructure Layer)
│   ├── adapters/
│   │   ├── persistence/       # JPA Implementations
│   │   │   ├── JpaUserRepository.java
│   │   │   ├── JpaBookRepository.java
│   │   │   └── entities/      # JPA Entities (separate from domain)
│   │   ├── web/              # REST Controllers
│   │   │   ├── UserController.java
│   │   │   ├── BookController.java
│   │   │   ├── OrderController.java
│   │   │   └── AdminController.java
│   │   └── gateway/          # External Services
│   │       ├── PaymentGateway.java
│   │       ├── EmailService.java
│   │       └── SmsService.java
│   ├── config/
│   │   ├── DatabaseConfig.java
│   │   ├── SecurityConfig.java
│   │   └── CacheConfig.java
│   └── security/
│       ├── JwtAuthenticationFilter.java
│       └── UserDetailsServiceImpl.java
│
└── interfaces/               # API Layer (Interface Adapters)
    ├── dto/
    │   ├── request/
    │   │   ├── CreateUserRequest.java
    │   │   ├── OrderRequest.java
    │   │   └── SearchBookRequest.java
    │   └── response/
    │       ├── UserResponse.java
    │       ├── BookResponse.java
    │       └── OrderResponse.java
    └── mappers/
        ├── UserMapper.java
        ├── BookMapper.java
        └── OrderMapper.java
```

---

## 🔗 API Design (Dựa trên REST Best Practices)

### 1. Resource-Oriented Endpoints

```yaml
# User Management
GET    /api/v1/users/{id}              # Get user profile  
POST   /api/v1/users                   # Register user
PATCH  /api/v1/users/{id}              # Update profile
DELETE /api/v1/users/{id}              # Deactivate account

GET    /api/v1/users/{id}/addresses    # Get user addresses
POST   /api/v1/users/{id}/addresses    # Add new address

# Authentication
POST   /api/v1/auth/login              # Login
POST   /api/v1/auth/logout             # Logout  
POST   /api/v1/auth/refresh            # Refresh token
POST   /api/v1/auth/forgot-password    # Reset password

# Product Catalog
GET    /api/v1/books                   # List books (with filters)
GET    /api/v1/books/{id}              # Get book details
GET    /api/v1/books/{id}/reviews      # Get book reviews
POST   /api/v1/books/{id}/reviews      # Add review

GET    /api/v1/categories              # List categories
GET    /api/v1/categories/{slug}/books # Books by category

# Shopping Cart
GET    /api/v1/cart                    # Get user cart
POST   /api/v1/cart/items              # Add item to cart
PATCH  /api/v1/cart/items/{id}         # Update quantity
DELETE /api/v1/cart/items/{id}         # Remove item

# Orders
GET    /api/v1/orders                  # List user orders
POST   /api/v1/orders                  # Create order
GET    /api/v1/orders/{id}             # Get order details
PATCH  /api/v1/orders/{id}/cancel      # Cancel order

# Flash Sales
GET    /api/v1/flash-sales             # Active flash sales
GET    /api/v1/flash-sales/{id}        # Flash sale details
POST   /api/v1/flash-sales/{id}/join   # Join flash sale

# Admin Endpoints  
GET    /api/v1/admin/dashboard/stats   # Dashboard metrics
GET    /api/v1/admin/books             # Manage books
POST   /api/v1/admin/books             # Create book
PATCH  /api/v1/admin/books/{id}        # Update book

GET    /api/v1/admin/orders            # Manage orders
PATCH  /api/v1/admin/orders/{id}/status # Update order status

GET    /api/v1/admin/customers         # Customer management
PATCH  /api/v1/admin/customers/{id}/tier # Update customer tier
```

### 2. HTTP Status Codes & Error Handling

```java
// Standard Response Format
{
    "status": "success|error",  
    "message": "Human readable message",
    "data": {...},              // Response payload
    "errors": [...],            // Validation errors  
    "timestamp": "2024-03-12T10:30:00Z"
}

// HTTP Status Usage
200 OK          - Successful GET/PATCH
201 Created     - Successful POST
204 No Content  - Successful DELETE
400 Bad Request - Validation errors
401 Unauthorized - Authentication required
403 Forbidden   - Insufficient permissions  
404 Not Found   - Resource not exists
429 Too Many Requests - Rate limiting
500 Internal Server Error - Unexpected errors
```

---

## 🔒 Security Architecture (Based on 007 Skills)

### 1. Authentication Strategy
```yaml
authentication:
  strategy: JWT + Refresh Token
  access_token_lifetime: 15_minutes
  refresh_token_lifetime: 7_days  
  algorithm: RS256              # Asymmetric keys
  refresh_token_rotation: true  # New refresh token on each use
  
storage:
  access_token: Authorization header (Bearer)
  refresh_token: HttpOnly secure cookie
```

### 2. Authorization Patterns
```java
public enum Role {
    CUSTOMER,
    STAFF,      
    ADMIN,
    SUPER_ADMIN
}

public enum Permission {
    // Book management
    BOOK_READ, BOOK_WRITE, BOOK_DELETE,
    
    // Order management  
    ORDER_READ, ORDER_UPDATE_STATUS, ORDER_CANCEL,
    
    // User management
    USER_READ, USER_UPDATE, USER_DELETE,
    CUSTOMER_TIER_UPDATE,
    
    // System
    DASHBOARD_VIEW, SYSTEM_CONFIG
}
```

### 3. Rate Limiting Strategy
```yaml
rate_limiting:
  # Public APIs
  books_search: 100/minute/ip
  book_details: 200/minute/ip
  
  # Authentication  
  login_attempts: 5/hour/ip
  password_reset: 3/hour/email
  
  # User actions
  add_to_cart: 60/minute/user
  place_order: 10/minute/user
  write_review: 5/hour/user
  
  # Admin APIs
  admin_operations: 1000/minute/admin
```

---

## 📊 Database Strategy

### 1. Repository Pattern Implementation
```java
// Domain interface (in domain layer)
public interface BookRepository {
    Optional<Book> findById(Long id);
    Optional<Book> findBySlug(String slug);
    Page<Book> findBooksWithFilters(BookFilter filter, Pageable pageable);
    List<Book> findFlashSaleBooks();
    void save(Book book);
}

// Infrastructure implementation (in infrastructure layer)
@Repository
public class JpaBookRepository implements BookRepository {
    @Autowired
    private BookJpaRepository jpaRepository;
    
    @Override
    public Optional<Book> findById(Long id) {
        return jpaRepository.findById(id)
                .map(BookMapper::toDomain);
    }
    
    // Custom queries for complex filters
    @Query("SELECT b FROM BookEntity b WHERE ...")
    Page<BookEntity> findBooksWithFilters(...);
}
```

### 2. Caching Strategy  
```yaml
caching:
  # Product data (rarely changes)
  book_details: 1_hour
  categories: 6_hours  
  publishers: 12_hours
  
  # Dynamic data (frequently changes)
  flash_sale_status: 5_minutes
  inventory_count: 1_minute
  user_cart: 15_minutes
  
  # Aggregated data
  bestsellers: 30_minutes
  dashboard_stats: 5_minutes
```

---

## 🔄 Business Logic Implementation

### 1. Domain Services (Core Business Rules)
```java
@Service
public class CustomerTierService {
    public void updateUserTier(User user) {
        CustomerTier newTier = calculateTierFromSpending(user.getTotalSpent());
        if (!user.getTier().equals(newTier)) {
            user.updateTier(newTier);
            // Domain event: TierUpgraded
            publishEvent(new TierUpgradedEvent(user.getId(), newTier));
        }
    }
}

@Service  
public class FlashSaleService {
    public FlashSaleResult attemptJoinFlashSale(Long userId, Long flashSaleId) {
        FlashSale flashSale = flashSaleRepository.findById(flashSaleId)
                .orElseThrow(() -> new FlashSaleNotFoundException());
                
        if (!flashSale.isActive()) {
            return FlashSaleResult.expired();
        }
        
        if (flashSale.isSoldOut()) {
            return FlashSaleResult.soldOut();
        }
        
        return flashSale.join(userId);
    }
}
```

### 2. Event-Driven Architecture cho Business Events
```java
// Domain Events
public class OrderCreatedEvent {
    private Long orderId;
    private Long userId; 
    private BigDecimal totalAmount;
    private Instant createdAt;
}

public class TierUpgradedEvent {
    private Long userId;
    private CustomerTier newTier;
    private CustomerTier oldTier; 
}

// Event Handlers
@EventHandler
public class OrderEventHandler {
    public void handle(OrderCreatedEvent event) {
        // Update user total spent
        // Update book sold count
        // Send confirmation email
        // Update inventory
    }
}
```

---

## 📋 Implementation Priority (Based on Frontend Dependencies)

### Phase 1: Authentication & Core APIs (Week 1-2)
- [ ] User registration/login APIs
- [ ] JWT authentication setup
- [ ] Basic book listing APIs  
- [ ] Category APIs

### Phase 2: Shopping Flow (Week 3-4)  
- [ ] Product detail APIs
- [ ] Cart management APIs
- [ ] Order creation & management
- [ ] Address management

### Phase 3: Advanced Features (Week 5-6)
- [ ] Flash sale system
- [ ] Customer tier system  
- [ ] Review & rating system
- [ ] Wishlist functionality

### Phase 4: Admin Features (Week 7-8)
- [ ] Admin authentication
- [ ] Product management APIs
- [ ] Order management APIs  
- [ ] Analytics & dashboard APIs

### Phase 5: Optimization (Week 9-10)
- [ ] Caching implementation
- [ ] Performance optimization
- [ ] Rate limiting
- [ ] Security hardening

---

## ✅ Verification Checklist

### Security
- [ ] JWT properly configured với RS256
- [ ] Rate limiting implemented
- [ ] Input validation on all endpoints
- [ ] SQL injection protection
- [ ] CORS properly configured

### Performance  
- [ ] Database queries optimized
- [ ] Caching strategy implemented
- [ ] Pagination on list endpoints
- [ ] Response time < 200ms for simple queries

### Architecture
- [ ] Domain logic separated from infrastructure
- [ ] Repository pattern implemented
- [ ] Use cases clearly defined
- [ ] Error handling standardized

### API Design
- [ ] REST conventions followed
- [ ] Consistent response format
- [ ] Proper HTTP status codes
- [ ] API documentation complete

---

## 🔗 Skill References & Quick Access

### 🏗️ Architecture & Design Patterns
- **Clean Architecture**: [`.antigravity/skills/architecture-patterns/SKILL.md`](../.antigravity/skills/architecture-patterns/SKILL.md)
- **Implementation Playbook**: [`.antigravity/skills/architecture-patterns/resources/implementation-playbook.md`](../.antigravity/skills/architecture-patterns/resources/implementation-playbook.md)
- **Decision Framework**: [`.antigravity/skills/architecture/SKILL.md`](../.antigravity/skills/architecture/SKILL.md)
- **Trade-off Analysis**: [`.antigravity/skills/architecture/trade-off-analysis.md`](../.antigravity/skills/architecture/trade-off-analysis.md)
- **Pattern Selection**: [`.antigravity/skills/architecture/pattern-selection.md`](../.antigravity/skills/architecture/pattern-selection.md)

### 🔗 API Design & Development
- **API Design Principles**: [`.antigravity/skills/api-design-principles/SKILL.md`](../.antigravity/skills/api-design-principles/SKILL.md)
- **REST Best Practices**: [`.antigravity/skills/api-design-principles/references/rest-best-practices.md`](../.antigravity/skills/api-design-principles/references/rest-best-practices.md)
- **REST API Template**: [`.antigravity/skills/api-design-principles/assets/rest-api-template.py`](../.antigravity/skills/api-design-principles/assets/rest-api-template.py)
- **API Patterns**: [`.antigravity/skills/api-patterns/SKILL.md`](../.antigravity/skills/api-patterns/SKILL.md)
- **API Security Testing**: [`.antigravity/skills/api-security-testing/SKILL.md`](../.antigravity/skills/api-security-testing/SKILL.md)

### 🔒 Security & Authentication  
- **007 Security Framework**: [`.antigravity/skills/007/SKILL.md`](../.antigravity/skills/007/SKILL.md)
- **API Security Patterns**: [`.antigravity/skills/007/references/api-security-patterns.md`](../.antigravity/skills/007/references/api-security-patterns.md)
- **JWT Best Practices**: [`.antigravity/skills/007/references/jwt-security.md`](../.antigravity/skills/007/references/jwt-security.md)
- **API Security Best Practices**: [`.antigravity/skills/api-security-best-practices/SKILL.md`](../.antigravity/skills/api-security-best-practices/SKILL.md)

### 📊 Database & Performance
- **Database Patterns**: [`.antigravity/skills/database-patterns/SKILL.md`](../.antigravity/skills/database-patterns/SKILL.md) (nếu có)
- **Performance Optimization**: [`.antigravity/skills/application-performance-performance-optimization/SKILL.md`](../.antigravity/skills/application-performance-performance-optimization/SKILL.md)
- **Caching Strategies**: [`.antigravity/skills/caching-strategies/SKILL.md`](../.antigravity/skills/caching-strategies/SKILL.md) (nếu có)

### 🧪 Testing & Quality
- **Testing Patterns**: [`.antigravity/skills/testing-patterns/SKILL.md`](../.antigravity/skills/testing-patterns/SKILL.md) (nếu có)
- **API Testing**: [`.antigravity/skills/api-testing-observability-api-mock/SKILL.md`](../.antigravity/skills/api-testing-observability-api-mock/SKILL.md)

### ⚡ Quick Command Reference

```bash
# Xem skill cụ thể
code .antigravity/skills/architecture-patterns/SKILL.md

# Mở implementation playbook  
code .antigravity/skills/architecture-patterns/resources/implementation-playbook.md

# Security patterns
code .antigravity/skills/007/references/api-security-patterns.md

# REST API template để tham khảo
code .antigravity/skills/api-design-principles/assets/rest-api-template.py
```

### 📚 Additional Resources
- **All Skills Index**: [`.antigravity/skills/README.md`](../.antigravity/skills/README.md)
- **Workflow Bundles**: [`.antigravity/skills/workflow_bundles_readme.md`](../.antigravity/skills/workflow_bundles_readme.md)

---

## 🚀 Quick Usage Guide for .antigravity Skills

### 📋 When to Use Which Skill

| Scenario | Skill to Use | File Path |
|----------|-------------|-----------|
| **Designing new REST API** | API Design Principles | [`.antigravity/skills/api-design-principles/`](../.antigravity/skills/api-design-principles/) |
| **Architecture decisions** | Architecture Framework | [`.antigravity/skills/architecture/`](../.antigravity/skills/architecture/) |
| **Security implementation** | 007 Security | [`.antigravity/skills/007/`](../.antigravity/skills/007/) |
| **Clean Code structure** | Architecture Patterns | [`.antigravity/skills/architecture-patterns/`](../.antigravity/skills/architecture-patterns/) |
| **API security audit** | API Security Testing | [`.antigravity/skills/api-security-testing/`](../.antigravity/skills/api-security-testing/) |

### ⚡ Development Workflow with Skills

1. **Planning Phase** → Use [Architecture Framework](../.antigravity/skills/architecture/SKILL.md)
2. **API Design** → Use [API Design Principles](../.antigravity/skills/api-design-principles/SKILL.md) 
3. **Security Setup** → Use [007 Security](../.antigravity/skills/007/SKILL.md)
4. **Implementation** → Use [Architecture Patterns](../.antigravity/skills/architecture-patterns/SKILL.md)
5. **Testing** → Use [API Testing](../.antigravity/skills/api-testing-observability-api-mock/SKILL.md)

### 🎯 Code Templates & Examples

| Template Type | Location | Description |
|---------------|----------|-------------|
| **REST API Controller** | [`.antigravity/skills/api-design-principles/assets/rest-api-template.py`](../.antigravity/skills/api-design-principles/assets/rest-api-template.py) | FastAPI production-ready template |
| **Security Patterns** | [`.antigravity/skills/007/references/api-security-patterns.md`](../.antigravity/skills/007/references/api-security-patterns.md) | JWT, OAuth, rate limiting patterns |
| **Clean Architecture** | [`.antigravity/skills/architecture-patterns/resources/implementation-playbook.md`](../.antigravity/skills/architecture-patterns/resources/implementation-playbook.md) | Full implementation guide |

### 🔧 VS Code Integration

```json
// Add to VS Code settings.json for quick access
{
  "files.associations": {
    "*.antigravity": "markdown"
  },
  "markdown.preview.breaks": true,
  "workbench.startupEditor": "readme",
  "explorer.compactFolders": false
}
```

### 📖 Reading Order for New Developers

1. **Start here**: [Architecture Framework](../.antigravity/skills/architecture/SKILL.md)
2. **Then**: [API Design Principles](../.antigravity/skills/api-design-principles/SKILL.md)
3. **Security**: [007 Security Patterns](../.antigravity/skills/007/references/api-security-patterns.md)
4. **Implementation**: [Clean Architecture Playbook](../.antigravity/skills/architecture-patterns/resources/implementation-playbook.md)

### 🎨 Customization Tips

```bash
# Create shortcuts for common skills
alias arch="code .antigravity/skills/architecture/SKILL.md"
alias api="code .antigravity/skills/api-design-principles/SKILL.md"  
alias sec="code .antigravity/skills/007/SKILL.md"
alias clean="code .antigravity/skills/architecture-patterns/SKILL.md"

# Search skills by keyword
find .antigravity/skills -name "*.md" -exec grep -l "authentication" {} \;
```

---

*Document generated: March 12, 2026*  
*Next Review: After Phase 1 completion*  
*Skills Version: .antigravity folder snapshot - March 2026*