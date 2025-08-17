-- ALTERNATIVA: Se o primeiro não funcionar, use este
-- Execute no SQL Editor do Supabase

-- Remover todas as políticas
DROP POLICY IF EXISTS "anon_insert_leads" ON leads;
DROP POLICY IF EXISTS "auth_select_leads" ON leads;

-- Desabilitar RLS completamente para testar
ALTER TABLE leads DISABLE ROW LEVEL SECURITY;

-- Teste: inserir um registro sem RLS
INSERT INTO leads (name, email, phone, project_type, description, budget) 
VALUES ('Teste Sem RLS', 'teste@semrls.com', '11888888888', 'App', 'Teste sem RLS', 'R$ 2.000')
RETURNING id, name;

-- Se funcionou, reabilitar RLS com política mais permissiva
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Política MUITO permissiva para depuração
CREATE POLICY "allow_all_leads" ON leads
  FOR ALL 
  USING (true)
  WITH CHECK (true);

-- Verificar novamente
SELECT * FROM pg_policies WHERE tablename = 'leads';
