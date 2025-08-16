-- Configuração das tabelas para o Supabase
-- Execute este SQL no SQL Editor do seu projeto Supabase

-- Criar tabela para formulários de contato (mantida para compatibilidade)
CREATE TABLE IF NOT EXISTS contact_forms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  project_type TEXT NOT NULL,
  description TEXT NOT NULL,
  budget TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela para leads (nova tabela principal)
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

-- Configurar RLS (Row Level Security) para contact_forms
ALTER TABLE contact_forms ENABLE ROW LEVEL SECURITY;

-- Permitir inserção para usuários anônimos em contact_forms
CREATE POLICY "Allow anonymous inserts" ON contact_forms
  FOR INSERT WITH CHECK (true);

-- Permitir leitura apenas para usuários autenticados em contact_forms (opcional)
CREATE POLICY "Allow authenticated reads" ON contact_forms
  FOR SELECT USING (auth.role() = 'authenticated');

-- Configurar RLS (Row Level Security) para leads
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Permitir inserção para usuários anônimos em leads
CREATE POLICY "Allow anonymous inserts leads" ON leads
  FOR INSERT WITH CHECK (true);

-- Permitir leitura apenas para usuários autenticados em leads (opcional)
CREATE POLICY "Allow authenticated reads leads" ON leads
  FOR SELECT USING (auth.role() = 'authenticated');

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_contact_forms_created_at ON contact_forms(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_forms_email ON contact_forms(email);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads(phone);
