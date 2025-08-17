-- PASSO 3: Criar índices para performance
-- Execute este bloco por último

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads(phone);

-- Verificar se as políticas foram criadas corretamente
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'leads';
