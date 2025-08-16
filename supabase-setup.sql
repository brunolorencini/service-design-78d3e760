-- Configuração da tabela contact_forms para o Supabase
-- Execute este SQL no SQL Editor do seu projeto Supabase

-- Criar tabela para formulários de contato
CREATE TABLE IF NOT EXISTS contact_forms (
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

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_contact_forms_created_at ON contact_forms(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_forms_email ON contact_forms(email);
