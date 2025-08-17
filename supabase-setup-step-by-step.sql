-- PASSO 1: Criar a tabela leads primeiro
-- Execute este bloco primeiro no SQL Editor

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
