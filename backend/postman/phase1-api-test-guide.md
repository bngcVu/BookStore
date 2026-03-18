# BookStore Backend - Phase 1 API Test Guide

Muc tieu: test nhanh cac API Auth va User Profile bang Postman.

## 1) Cau hinh chung

- Base URL: http://localhost:8080
- Header bat buoc cho request co body:
  - Content-Type: application/json
- Neu goi API can auth:
  - Authorization: Bearer <accessToken>

## 2) Thu tu test de nghi

1. Register
2. Send Register OTP
3. Verify Register OTP
4. Login
5. Get Profile
6. Refresh Token
7. Logout
8. Forgot Password
9. Verify Forgot Password OTP
10. Reset Password
11. Login lai voi mat khau moi
12. Admin Login

## 3) Chi tiet tung API

### 3.1 Register

- Method: POST
- URL: /api/v1/auth/register
- Body:

{
  "email": "user1@example.com",
  "password": "Test1234",
  "fullName": "User One",
  "phone": "0900000001"
}

- Ky vong:
  - HTTP 200
  - status = success

### 3.2 Send Register OTP

- Method: POST
- URL: /api/v1/auth/register/send-otp
- Body:

{
  "email": "user1@example.com",
  "type": "register"
}

- Ky vong:
  - HTTP 200
  - status = success

### 3.3 Verify Register OTP

- Method: POST
- URL: /api/v1/auth/register/verify-otp
- Body:

{
  "email": "user1@example.com",
  "code": "123456",
  "type": "register"
}

- Ky vong:
  - HTTP 200
  - status = success

### 3.4 Login

- Method: POST
- URL: /api/v1/auth/login
- Body:

{
  "email": "user1@example.com",
  "password": "Test1234"
}

- Ky vong:
  - HTTP 200
  - data.accessToken co gia tri
  - data.refreshToken co gia tri

- Sau buoc nay: copy accessToken va refreshToken de dung cho cac buoc tiep theo.

### 3.5 Get Profile

- Method: GET
- URL: /api/v1/users/me
- Header:
  - Authorization: Bearer <accessToken>

- Ky vong:
  - HTTP 200
  - status = success
  - data.email = user1@example.com

### 3.6 Refresh Token

- Method: POST
- URL: /api/v1/auth/refresh
- Body:

{
  "refreshToken": "<refreshToken>"
}

- Ky vong:
  - HTTP 200
  - nhan accessToken moi
  - co the nhan refreshToken moi (neu dang rotate)

### 3.7 Logout

- Method: POST
- URL: /api/v1/auth/logout
- Body:

{
  "refreshToken": "<refreshToken>"
}

- Ky vong:
  - HTTP 200
  - refresh token da logout se khong dung duoc nua

### 3.8 Forgot Password

- Method: POST
- URL: /api/v1/auth/forgot-password
- Body:

{
  "email": "user1@example.com"
}

- Ky vong:
  - HTTP 200
  - status = success

### 3.9 Verify Forgot Password OTP

- Method: POST
- URL: /api/v1/auth/forgot-password/verify-otp
- Body:

{
  "email": "user1@example.com",
  "code": "123456",
  "type": "reset_password"
}

- Ky vong:
  - HTTP 200

### 3.10 Reset Password

- Method: POST
- URL: /api/v1/auth/reset-password
- Body:

{
  "email": "user1@example.com",
  "code": "123456",
  "newPassword": "NewPass123"
}

- Ky vong:
  - HTTP 200

### 3.11 Login lai voi mat khau moi

- Method: POST
- URL: /api/v1/auth/login
- Body:

{
  "email": "user1@example.com",
  "password": "NewPass123"
}

- Ky vong:
  - HTTP 200
  - login thanh cong

### 3.12 Admin Login

- Method: POST
- URL: /api/v1/admin/auth/login
- Body:

{
  "email": "admin@example.com",
  "password": "Admin1234"
}

- Ky vong:
  - HTTP 200
  - nhan access token admin

## 4) Cac loi hay gap

- Loi Content-Type text/plain:
  - Nguyen nhan: Postman body khong de JSON.
  - Cach sua: vao Body, chon raw, chon JSON.

- Loi 401 hoac 403 khi goi /users/me:
  - Kiem tra Authorization header
  - Kiem tra token da het han chua

- Loi ket noi localhost:8080:
  - Backend chua run hoac da stop.

## 5) Checklist nhanh

- /api/health tra 200
- Register thanh cong
- OTP flow thanh cong
- Login thanh cong va lay duoc token
- /users/me tra du lieu dung
- Refresh va Logout dung logic
- Forgot/reset password chay duoc
