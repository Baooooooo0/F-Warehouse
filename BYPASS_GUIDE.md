# 🔓 Hướng dẫn Bypass LocalTunnel Warning

Khi người dùng truy cập URL LocalTunnel lần đầu tiên, họ sẽ thấy trang cảnh báo bảo mật.

## 📋 Các bước bypass:

### Bước 1: Truy cập URL
Mở trình duyệt và truy cập: `https://dry-lines-stay.loca.lt`

### Bước 2: Thấy trang cảnh báo
Họ sẽ thấy thông báo: 
```
"This is a LocalTunnel endpoint
Please visit https://localtunnel.github.io/www/ for more information."
```

### Bước 3: Có 2 cách bypass:

#### Cách 1: Click nút Continue (Đơn giản nhất)
- Tìm và click nút **"Click to Continue"** hoặc **"Continue to site"**
- Xong! Sẽ vào được ứng dụng

#### Cách 2: Nhập thông tin endpoint
Nếu không có nút, làm theo:
1. Tìm ô input hoặc form trên trang
2. Nhập địa chỉ **IP của người truy cập** (IP của họ, không phải của bạn)
3. Hoặc để trống và submit
4. Click "Submit" hoặc "Continue"

## 💡 Lưu ý:

### IP là gì?
- **Không phải** IP máy chủ của bạn
- **Không phải** 192.168.1.3
- Là IP public của người truy cập
- Họ có thể check IP của mình tại: https://whatismyipaddress.com/

### Thường thì:
- 🎯 **LocalTunnel mới nhất**: Chỉ cần click "Continue" là xong
- 🔄 **Phiên bản cũ**: Có thể cần nhập IP
- ✅ **Sau lần đầu**: Cookie sẽ lưu, không cần bypass nữa

## 🚀 Cách tránh bị cảnh báo:

### Dùng Ngrok (Không có warning page):
```bash
# Cài ngrok
# Download từ: https://ngrok.com/download

# Chạy tunnel
ngrok http 3001
```

Ngrok sẽ cho URL sạch, không có trang warning!

## 📱 Hướng dẫn cho người nhận:

**Gửi tin nhắn này cho họ:**

---

Xin chào! Đây là link demo ứng dụng:
🔗 https://dry-lines-stay.loca.lt

**Cách vào:**
1. Click vào link
2. Nếu thấy trang cảnh báo "LocalTunnel endpoint"
3. → Click nút "Continue" hoặc "Click to Continue"
4. Xong! Bạn sẽ thấy trang đăng nhập

**Tài khoản test:**
- Email: admin@company.com
- Password: admin123

---

## ❓ Nếu vẫn không vào được:

1. **Thử trình duyệt khác** (Chrome, Firefox, Edge)
2. **Tắt VPN/Proxy** nếu đang bật
3. **Xóa cache và cookie** của trình duyệt
4. Hoặc dùng **chế độ ẩn danh/Incognito**

## 🔧 Nếu muốn tránh hoàn toàn:

### Option 1: Dùng subdomain tùy chỉnh
```bash
npx localtunnel --port 3001 --subdomain mywarehouse
```
→ Sẽ có URL: `https://mywarehouse.loca.lt`

### Option 2: Chuyển sang Ngrok (Không có warning)
```bash
ngrok http 3001
```

### Option 3: Deploy lên Vercel (Production-ready)
```bash
npm install -g vercel
npm run build
vercel --prod
```
→ URL sạch, không cảnh báo, có SSL

## 📞 Hỗ trợ:

Nếu người dùng vẫn gặp vấn đề:
- Kiểm tra xem tunnel có đang chạy không
- Kiểm tra dev server có chạy ở port 3001 không
- Thử restart cả tunnel và dev server
