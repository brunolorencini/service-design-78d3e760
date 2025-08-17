# Script PowerShell para configurar o ambiente do Supabase

Write-Host "Configurando ambiente do Supabase..." -ForegroundColor Green

# Verificar se o arquivo .env.local já existe
if (Test-Path ".env.local") {
    Write-Host "Arquivo .env.local já existe. Fazendo backup..." -ForegroundColor Yellow
    Copy-Item ".env.local" ".env.local.backup"
}

# Copiar o arquivo de exemplo
Copy-Item "env.local.example" ".env.local"

Write-Host "Arquivo .env.local criado com sucesso!" -ForegroundColor Green
Write-Host "Credenciais do Supabase configuradas:" -ForegroundColor Cyan
Write-Host "   URL: https://uwcobhhtyuzjkojobenz.supabase.co" -ForegroundColor White
Write-Host "   Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." -ForegroundColor White

Write-Host ""
Write-Host "Para iniciar o projeto, execute:" -ForegroundColor Green
Write-Host "   npm run dev" -ForegroundColor White
