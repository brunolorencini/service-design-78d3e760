-- Configuração corrigida para o Supabase
-- Execute este SQL no SQL Editor do seu projeto Supabase

-- Primeiro, vamos verificar se a tabela já existe e remover políticas antigas se necessário
DROP POLICY IF EXISTS "Allow anonymous inserts leads" ON leads;
DROP POLICY IF EXISTS "Allow authenticated reads leads" ON leads;

-- Criar tabela para leads se não existir
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  project_type TEXT NOT NULL,
  description TEXT NOT NULL,
  budget TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Desabilitar RLS temporariamente para limpar
ALTER TABLE leads DISABLE ROW LEVEL SECURITY;

-- Reabilitar RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Criar política para permitir inserções anônimas (esta é a parte crucial)
CREATE POLICY "Enable insert for anonymous users" ON leads
  FOR INSERT 
  TO anon
  WITH CHECK (true);

-- Opcional: Permitir leitura apenas para usuários autenticados
CREATE POLICY "Enable read for authenticated users only" ON leads
  FOR SELECT 
  TO authenticated
  USING (true);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads(phone);

-- Verificar se as políticas foram criadas corretamente
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'leads';
