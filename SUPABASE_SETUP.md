# Configuração do Supabase

Este projeto está configurado para usar o Supabase como backend. Siga os passos abaixo para configurar:

## 1. Criar projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Crie uma nova conta ou faça login
3. Crie um novo projeto
4. Anote a URL do projeto e a chave anônima

## 2. Configurar variáveis de ambiente

1. Copie o arquivo `env.example` para `.env.local`:
   ```bash
   cp env.example .env.local
   ```

2. Edite o arquivo `.env.local` e adicione suas credenciais:
   ```env
   VITE_SUPABASE_URL=https://seu-projeto-id.supabase.co
   VITE_SUPABASE_ANON_KEY=sua-chave-anonima-aqui
   ```

## 3. Criar tabela no Supabase

Execute o seguinte SQL no SQL Editor do Supabase:

```sql
-- Criar tabela para formulários de contato
CREATE TABLE contact_forms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  project_type TEXT NOT NULL,
  description TEXT NOT NULL,
  budget TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Configurar RLS (Row Level Security)
ALTER TABLE contact_forms ENABLE ROW LEVEL SECURITY;

-- Permitir inserção para usuários anônimos
CREATE POLICY "Allow anonymous inserts" ON contact_forms
  FOR INSERT WITH CHECK (true);

-- Permitir leitura apenas para usuários autenticados (opcional)
CREATE POLICY "Allow authenticated reads" ON contact_forms
  FOR SELECT USING (auth.role() = 'authenticated');
```

## 4. Instalar dependências

```bash
npm install @supabase/supabase-js
```

## 5. Testar a integração

1. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

2. Preencha o formulário de contato na página
3. Verifique se os dados aparecem na tabela `contact_forms` no Supabase

## Estrutura das tabelas

### Tabela `leads` (principal)
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | ID único do registro |
| name | TEXT | Nome do contato |
| email | TEXT | Email do contato |
| phone | TEXT | Telefone/WhatsApp |
| project_type | TEXT | Tipo de projeto |
| description | TEXT | Descrição do projeto |
| budget | TEXT | Orçamento estimado |
| created_at | TIMESTAMP | Data e hora de criação |

### Tabela `contact_forms` (legado)
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | ID único do registro |
| name | TEXT | Nome do contato |
| email | TEXT | Email do contato |
| project_type | TEXT | Tipo de projeto |
| description | TEXT | Descrição do projeto |
| budget | TEXT | Orçamento estimado |
| created_at | TIMESTAMP | Data de criação |

## Funcionalidades implementadas

- ✅ Envio de formulário de contato
- ✅ Campo de telefone/WhatsApp
- ✅ Envio automático de email para bruno.lorencini@gmail.com
- ✅ Salvamento na tabela de leads do Supabase
- ✅ Data e hora automática de preenchimento
- ✅ Validação de dados
- ✅ Feedback visual (loading, sucesso, erro)
- ✅ Integração com Supabase
- ✅ Tipagem TypeScript
