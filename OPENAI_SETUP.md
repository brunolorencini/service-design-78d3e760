# 🔒 Configuração Segura da OpenAI API

## 🛡️ **IMPLEMENTAÇÃO SEGURA**

Esta configuração mantém sua chave OpenAI **PROTEGIDA NO SERVIDOR**, nunca exposta no frontend.

## 🔑 Como Adicionar sua Chave da API

### 1. **Obter a Chave da OpenAI**
- Acesse: [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- Faça login na sua conta OpenAI
- Clique em "Create new secret key"
- Copie a chave (começa com `sk-proj-` ou `sk-`)

### 2. **Configurar no Projeto (Desenvolvimento)**

Crie um arquivo `.env.local` na raiz do projeto com o seguinte conteúdo:

```env
# Supabase Configuration (já configurado)
VITE_SUPABASE_URL=https://uwcobhhtyuzjkojobenz.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3Y29iaGh0eXV6amtvam9iZW56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxODQ1OTQsImV4cCI6MjA3MDc2MDU5NH0._ou4A_QZye1dMAI0UncADmYOswrX6O39FJHDg680-SU

# OpenAI Configuration - SERVIDOR SEGURO (sem VITE_)
OPENAI_API_KEY=sk-proj-sua-chave-da-openai-aqui
```

⚠️ **IMPORTANTE:** Note que agora é `OPENAI_API_KEY` (sem `VITE_`), mantendo a chave segura no servidor!

### 3. **Para Produção (Vercel)**

Na sua dashboard da Vercel:
1. Vá para **Settings → Environment Variables**
2. Adicione a variável:
   - **Name**: `OPENAI_API_KEY` (SEM VITE_)
   - **Value**: sua chave da OpenAI
   - **Environment**: Production, Preview, Development

### 4. **Testar a Integração**

1. Reinicie o servidor de desenvolvimento: `npm run dev`
2. Acesse o formulário de contato
3. Preencha a descrição do projeto
4. Clique em "Refinar com IA"
5. A IA agora fará perguntas reais usando GPT-4!

## 🚀 Como Funciona

### **Fluxo da Conversa:**
1. **Input**: Descrição inicial do projeto do usuário
2. **IA**: Faz perguntas estratégicas para entender melhor
3. **Usuário**: Responde às perguntas
4. **IA**: Continua refinando com follow-ups
5. **Geração**: Cria proposta detalhada baseada na conversa

### **Prompts Especializados:**
- **Chat**: Focado em refinamento e perguntas estratégicas
- **Proposta**: Gera briefing técnico profissional e detalhado

### **Modelo Usado:**
- `gpt-4o-mini` - Versão econômica e rápida do GPT-4
- Ideal para conversas e geração de propostas

## 💰 Custos Estimados

- **Chat**: ~$0.01 por conversa (5-10 mensagens)
- **Proposta**: ~$0.02 por proposta gerada
- **Total por usuário**: ~$0.03

## 🔒 Segurança

### ✅ **IMPLEMENTAÇÃO SEGURA ATUAL:**
- ✅ Chave OpenAI fica **APENAS NO SERVIDOR** (Vercel Functions)
- ✅ **NUNCA exposta** no código frontend
- ✅ **NUNCA visível** no browser ou DevTools
- ✅ **NUNCA incluída** no bundle JavaScript
- ✅ Comunicação via **API routes seguras** (/api/chat)

### ⚠️ **IMPORTANTE**: 
- O arquivo `.env.local` está no `.gitignore` e não será commitado
- Use `OPENAI_API_KEY` (sem VITE_) para manter no servidor
- Nunca use `VITE_` prefix para chaves sensíveis
- Em produção, configure apenas no Vercel Environment Variables

### 🛡️ **Como a Segurança Funciona:**
1. Frontend envia mensagem para `/api/chat`
2. Vercel Function (servidor) recebe a requisição
3. Servidor usa `OPENAI_API_KEY` para chamar OpenAI
4. Resposta é enviada de volta para o frontend
5. Chave nunca sai do ambiente servidor

## 🐛 Troubleshooting

### **Erro: "Chave da OpenAI não configurada"**
- Verifique se criou o arquivo `.env.local`
- Confirme se a variável se chama exatamente `VITE_OPENAI_API_KEY`
- Reinicie o servidor de desenvolvimento

### **Erro: "401 Unauthorized"**
- Sua chave da API está incorreta ou expirada
- Verifique se tem créditos na conta OpenAI
- Confirme se a chave não tem restrições de IP

### **Erro: "Rate limit exceeded"**
- Você excedeu o limite de requisições
- Aguarde alguns minutos ou aumente seu plano na OpenAI

## 📚 Documentação

- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- [Pricing](https://openai.com/pricing)
- [Usage Dashboard](https://platform.openai.com/usage)
