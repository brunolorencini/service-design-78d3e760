-- CORREÇÃO FINAL: Adicionar permissão de SELECT para anon
-- O problema é que o Supabase client faz SELECT após INSERT

-- Remover a política atual
DROP POLICY IF EXISTS "allow_all_leads" ON leads;

-- Criar política que permite INSERT e SELECT para usuários anônimos
CREATE POLICY "anon_insert_select_leads" ON leads
  FOR ALL 
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Verificar se a política foi criada
SELECT 
  schemaname, 
  tablename, 
  policyname, 
  permissive, 
  roles, 
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'leads';

-- Teste de inserção
INSERT INTO leads (name, email, phone, project_type, description, budget) 
VALUES ('Teste SELECT+INSERT', 'teste@selectinsert.com', '11777777777', 'App', 'Teste com SELECT', 'R$ 3.000')
RETURNING id, name, created_at;
