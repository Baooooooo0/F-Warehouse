import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    server: {
      port: parseInt(env.VITE_PORT || '3000'), // Sử dụng port từ .env hoặc mặc định 3000
      host: true, // Cho phép truy cập từ network
      open: true, // Tự động mở browser
      cors: true, // Bật CORS
      proxy: {
        // Cấu hình proxy cho backend API (nếu cần)
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:5000',
          changeOrigin: true,
          secure: false,
        }
      }
    }
  }
})
