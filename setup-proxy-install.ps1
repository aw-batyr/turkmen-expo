# setup-proxy-install.ps1
# -----------------------
# Этот скрипт временно включает прокси для Git, npm и pnpm
# (через V2rayN на 127.0.0.1:10808), выполняет установку зависимостей,
# а затем отключает прокси обратно.

$proxy = "http://127.0.0.1:10808"

Write-Host "🔧 Настраиваю прокси для Git, npm и pnpm..." -ForegroundColor Cyan

# Git proxy
git config --global http.proxy $proxy
git config --global https.proxy $proxy

# npm proxy
npm config set proxy $proxy
npm config set https-proxy $proxy
npm config set strict-ssl false

# pnpm proxy
pnpm config set proxy $proxy
pnpm config set https-proxy $proxy
pnpm config set strict-ssl false

Write-Host "✅ Прокси настроен. Запускаю pnpm install..." -ForegroundColor Green

# Установка зависимостей
pnpm install

Write-Host "♻️ Отключаю прокси после завершения..." -ForegroundColor Yellow

# Сброс Git proxy
git config --global --unset http.proxy
git config --global --unset https.proxy

# Сброс npm/pnpm proxy
npm config delete proxy
npm config delete https-proxy
pnpm config delete proxy
pnpm config delete https-proxy

Write-Host "✅ Прокси отключён. Всё готово!" -ForegroundColor Green
