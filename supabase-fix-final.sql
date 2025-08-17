-- SOLUÇÃO DEFINITIVA PARA O ERRO 401
-- Execute este SQL completo no Supabase SQL Editor

-- 1. Primeiro, vamos limpar todas as políticas existentes
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON leads;
DROP POLICY IF EXISTS "Enable read for authenticated users only" ON leads;
DROP POLICY IF EXISTS "Allow anonymous inserts leads" ON leads;
DROP POLICY IF EXISTS "Allow authenticated reads leads" ON leads;

-- 2. Desabilitar RLS temporariamente
ALTER TABLE leads DISABLE ROW LEVEL SECURITY;

-- 3. Reabilitar RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- 4. Criar uma política SIMPLES e FUNCIONAL para usuários anônimos
CREATE POLICY "anon_insert_leads" ON leads
  FOR INSERT 
  TO anon, authenticated
  WITH CHECK (true);

-- 5. Criar política para leitura (opcional)
CREATE POLICY "auth_select_leads" ON leads
  FOR SELECT 
  TO authenticated
  USING (true);

-- 6. IMPORTANTE: Verificar se as políticas foram criadas
SELECT 
  schemaname, 
  tablename, 
  policyname, 
  permissive, 
  roles, 
  cmd 
FROM pg_policies 
WHERE tablename = 'leads';

-- 7. Testar se conseguimos inserir dados (deve retornar uma linha)
INSERT INTO leads (name, email, phone, project_type, description, budget) 
VALUES ('Teste Policy', 'teste@policy.com', '11999999999', 'Website', 'Teste de política', 'R$ 1.000')
RETURNING id, name, created_at;
