# F-Warehouse - Inventory Management System

Hệ thống quản lý kho hàng với React + Vite

## 🚀 Cài đặt

### 1. Clone repository
```bash
git clone <repository-url>
cd F-Warehouse
```

### 2. Cài đặt dependencies
```bash
npm install
```

### 3. Cấu hình môi trường
```bash
# Copy file .env.example thành .env
cp .env.example .env

# Hoặc trên Windows
copy .env.example .env
```

### 4. Tùy chỉnh port (Tùy chọn)
Mở file `.env` và thay đổi port nếu cần:
```env
VITE_PORT=3000  # Đổi thành port bạn muốn (3001, 3002, v.v.)
```

**Ví dụ:**
- Máy A: `VITE_PORT=3000`
- Máy B: `VITE_PORT=3001`
- Máy C: `VITE_PORT=4000`

### 5. Chạy development server
```bash
npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:3000` (hoặc port bạn đã cấu hình)

## 🔐 Tài khoản demo

Để đăng nhập vào hệ thống, sử dụng:

**Admin:**
- Email: `admin@company.com`
- Password: `admin123`

**User:**
- Email: `user@company.com`
- Password: `user123`

## 📁 Cấu trúc thư mục

```
src/
├── api/                    # Giao tiếp backend
├── assets/                 # Ảnh, icon
├── components/             # Component dùng chung
├── contexts/               # Context API (Auth)
├── hooks/                  # Custom hooks
├── layouts/                # Layout templates
├── pages/                  # Các trang chính
├── routes/                 # Cấu hình routing
├── styles/                 # CSS files
└── utils/                  # Utility functions
```

## 🌐 Chia sẻ với người khác

### Trong cùng mạng LAN:
Người khác có thể truy cập qua Network URL hiển thị khi chạy `npm run dev`

### Qua Internet:
```bash
# Terminal 1: Chạy dev server
npm run dev

# Terminal 2: Chạy tunnel
npm run tunnel
```

Xem hướng dẫn chi tiết trong [TUNNEL_GUIDE.md](TUNNEL_GUIDE.md)

## 🛠️ Scripts

- `npm run dev` - Chạy development server
- `npm run build` - Build production
- `npm run preview` - Preview production build
- `npm run tunnel` - Tạo public URL với LocalTunnel
- `npm run lint` - Chạy ESLint

## 📦 Dependencies chính

- React 19.2.0
- React Router DOM 6.x
- Axios
- Tailwind CSS 3.x

## ⚙️ Cấu hình riêng cho từng máy

Mỗi developer có thể tạo file `.env.local` để override cấu hình mà không ảnh hưởng đến người khác:

```env
# .env.local (không bị track bởi git)
VITE_PORT=3005
VITE_API_URL=http://my-custom-api.com/api
```

**Thứ tự ưu tiên:**
1. `.env.local` (cao nhất - dùng cho config cá nhân)
2. `.env` (mặc định cho team)
3. `.env.example` (template)

### Ví dụ workflow cho team:

**Developer A:**
```env
# .env.local
VITE_PORT=3000
```

**Developer B (port 3000 đang dùng):**
```env
# .env.local
VITE_PORT=3001
```

**Developer C (thích port cao):**
```env
# .env.local
VITE_PORT=5000
```

→ Mỗi người chạy `npm run dev` sẽ dùng port riêng của mình!

## 🔒 Bảo mật

- File `.env` và `.env.local` đã được thêm vào `.gitignore`
- Không commit các thông tin nhạy cảm
- Sử dụng `.env.example` để chia sẻ cấu trúc environment variables

## 📝 Lưu ý khi pull code về

1. **Luôn chạy:** `npm install` sau khi pull
2. **Tạo file .env:** Copy từ `.env.example`
3. **Tùy chỉnh port:** Nếu port 3000 bận, đổi trong `.env`
4. **Nếu port tự động đổi:** Vite sẽ tự chuyển sang port khác (3001, 3002...)

## 🤝 Contributing

1. Tạo branch mới: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m 'Add some feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Tạo Pull Request

## 📄 License

MIT
