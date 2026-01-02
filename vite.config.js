import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true, // Cho phép truy cập từ network
    open: true, // Tự động mở browser
    cors: true, // Bật CORS
    proxy: {
      // Cấu hình proxy cho backend API (nếu cần)
      '/api': {
        target: 'http://localhost:5000', // URL backend của bạn
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
