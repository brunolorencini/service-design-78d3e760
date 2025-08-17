#!/bin/bash

# Script para configurar o ambiente do Supabase

echo "🔧 Configurando ambiente do Supabase..."

# Verificar se o arquivo .env.local já existe
if [ -f ".env.local" ]; then
    echo "⚠️  Arquivo .env.local já existe. Fazendo backup..."
    cp .env.local .env.local.backup
fi

# Copiar o arquivo de exemplo
cp env.local.example .env.local

echo "✅ Arquivo .env.local criado com sucesso!"
echo "📝 Credenciais do Supabase configuradas:"
echo "   URL: https://uwcobhhtyuzjkojobenz.supabase.co"
echo "   Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

echo ""
echo "🚀 Para iniciar o projeto, execute:"
echo "   npm run dev"
