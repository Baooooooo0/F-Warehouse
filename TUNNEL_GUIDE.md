# 🌐 Hướng dẫn chia sẻ ứng dụng cho người ngoài mạng LAN

## Cách 1: Sử dụng LocalTunnel (Miễn phí, Nhanh)

### Bước 1: Chạy dev server
```bash
npm run dev
```

### Bước 2: Mở terminal mới và chạy tunnel
```bash
npm run tunnel
```

Hoặc chạy PowerShell script:
```bash
.\tunnel.ps1
```

→ Bạn sẽ nhận được URL dạng: `https://random-name.loca.lt`

### Lưu ý LocalTunnel:
- ⚠️ Lần đầu truy cập cần nhập IP để bypass warning
- 🔄 URL sẽ thay đổi mỗi lần restart
- ⏱️ Miễn phí nhưng có thể bị giới hạn

---

## Cách 2: Sử dụng Ngrok (Ổn định hơn)

### Cài đặt:
1. Tải ngrok: https://ngrok.com/download
2. Đăng ký tài khoản miễn phí
3. Lấy authtoken và chạy: `ngrok config add-authtoken YOUR_TOKEN`

### Sử dụng:
```bash
ngrok http 3001
```

→ Nhận URL dạng: `https://abc123.ngrok.io`

### Ưu điểm Ngrok:
- ✅ Ổn định hơn LocalTunnel
- ✅ Có dashboard để xem requests
- ✅ Hỗ trợ HTTPS
- ⚠️ Free tier: 1 tunnel, 40 connections/phút

---

## Cách 3: Port Forwarding (Nâng cao)

### Yêu cầu:
- Có quyền truy cập router
- IP public (không phải Carrier-Grade NAT)

### Các bước:
1. Vào router admin (thường là 192.168.1.1)
2. Tìm "Port Forwarding" hoặc "Virtual Server"
3. Forward port 3001 → IP máy tính của bạn
4. Chia sẻ: `http://YOUR_PUBLIC_IP:3001`

### Lưu ý:
- 🔒 Cần cấu hình firewall
- 💰 Có thể cần IP tĩnh (mất phí)
- ⚠️ Không khuyến khích cho dev

---

## Cách 4: Deploy lên Cloud (Production)

### Các nền tảng miễn phí:
- **Vercel**: `npm install -g vercel` → `vercel`
- **Netlify**: Drag & drop build folder
- **Railway**: Connect GitHub repo
- **Render**: Free tier với SSL

---

## 📋 So sánh nhanh:

| Phương pháp | Tốc độ | Ổn định | Chi phí | Khuyến nghị |
|-------------|--------|---------|---------|-------------|
| LocalTunnel | ⚡⚡⚡ | ⭐⭐ | Miễn phí | Test nhanh |
| Ngrok | ⚡⚡ | ⭐⭐⭐⭐ | Miễn phí/Trả phí | Demo khách hàng |
| Port Forward | ⚡⚡⚡ | ⭐⭐⭐ | Tùy ISP | Nội bộ công ty |
| Cloud Deploy | ⚡ | ⭐⭐⭐⭐⭐ | Miễn phí/Trả phí | Production |

---

## 🚀 Khuyến nghị:

**Cho test nhanh:** Dùng LocalTunnel
```bash
npm run tunnel
```

**Cho demo:** Dùng Ngrok
```bash
ngrok http 3001
```

**Cho production:** Deploy lên Vercel/Netlify
