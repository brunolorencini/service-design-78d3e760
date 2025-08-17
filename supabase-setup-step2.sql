-- PASSO 2: Configurar RLS e políticas
-- Execute este bloco DEPOIS de executar o passo 1

-- Habilitar RLS na tabela
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Criar política para permitir inserções anônimas
CREATE POLICY "Enable insert for anonymous users" ON leads
  FOR INSERT 
  TO anon
  WITH CHECK (true);

-- Opcional: Permitir leitura apenas para usuários autenticados
CREATE POLICY "Enable read for authenticated users only" ON leads
  FOR SELECT 
  TO authenticated
  USING (true);
