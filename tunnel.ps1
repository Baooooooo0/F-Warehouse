# Tunnel Script - Tạo Public URL
# Chạy lệnh này trong terminal riêng khi dev server đang chạy

Write-Host "Starting tunnel for port 3001..." -ForegroundColor Green
Write-Host "Dev server should be running at http://localhost:3001" -ForegroundColor Yellow
Write-Host ""

# Chạy localtunnel
npx localtunnel --port 3001

# Hoặc nếu muốn subdomain tùy chỉnh:
# npx localtunnel --port 3001 --subdomain mywarehouse
