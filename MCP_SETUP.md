# Configuração MCP (Model Context Protocol) com Supabase

Este documento explica como configurar e usar o MCP com o Supabase neste projeto.

## O que é MCP?

O Model Context Protocol (MCP) é um protocolo que permite que assistentes de IA acessem e interajam com dados externos de forma segura e controlada.

## Configuração Atual

O arquivo `mcp.json` já está configurado com as credenciais do Supabase:

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-supabase"],
      "env": {
        "SUPABASE_URL": "https://uwcobhhtyuzjkojobenz.supabase.co",
        "SUPABASE_ANON_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3Y29iaGh0eXV6amtvam9iZW56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxODQ1OTQsImV4cCI6MjA3MDc2MDU5NH0._ou4A_QZye1dMAI0UncADmYOswrX6O39FJHDg680-SU"
      }
    }
  }
}
```

## Credenciais do Supabase

- **URL**: `https://uwcobhhtyuzjkojobenz.supabase.co`
- **Chave Anônima**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3Y29iaGh0eXV6amtvam9iZW56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxODQ1OTQsImV4cCI6MjA3MDc2MDU5NH0._ou4A_QZye1dMAI0UncADmYOswrX6O39FJHDg680-SU`

## Estrutura do Banco de Dados

### Tabela `leads`
Armazena os formulários de contato enviados pelo site.

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
Tabela antiga mantida para compatibilidade.

## Como Usar

### 1. Com Cursor/VS Code
Se você estiver usando Cursor ou VS Code com extensão MCP:

1. Certifique-se de que o arquivo `mcp.json` está na raiz do projeto
2. Reinicie o editor
3. O MCP será carregado automaticamente

### 2. Com CLI
Para usar via linha de comando:

```bash
# Instalar o servidor MCP do Supabase
npm install -g @modelcontextprotocol/server-supabase

# Executar o servidor
npx @modelcontextprotocol/server-supabase
```

### 3. Verificar Conexão
Para verificar se a conexão está funcionando:

```bash
# Testar conexão com Supabase
curl -X GET "https://uwcobhhtyuzjkojobenz.supabase.co/rest/v1/leads" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3Y29iaGh0eXV6amtvam9iZW56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxODQ1OTQsImV4cCI6MjA3MDc2MDU5NH0._ou4A_QZye1dMAI0UncADmYOswrX6O39FJHDg680-SU" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3Y29iaGh0eXV6amtvam9iZW56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxODQ1OTQsImV4cCI6MjA3MDc2MDU5NH0._ou4A_QZye1dMAI0UncADmYOswrX6O39FJHDg680-SU"
```

## Funcionalidades Disponíveis

Com o MCP configurado, você pode:

1. **Consultar dados**: Buscar leads e formulários de contato
2. **Inserir dados**: Adicionar novos registros
3. **Atualizar dados**: Modificar registros existentes
4. **Deletar dados**: Remover registros (com cuidado)

## Troubleshooting

### Problema: MCP não conecta
- Verifique se as credenciais estão corretas
- Confirme se o projeto Supabase está ativo
- Teste a conexão via curl

### Problema: Erro de permissão
- Verifique se as políticas RLS estão configuradas corretamente
- Confirme se a chave anônima tem as permissões necessárias

### Problema: Tabela não encontrada
- Execute o script SQL em `supabase-setup.sql`
- Verifique se as tabelas foram criadas no Supabase

## Segurança

- As credenciais estão configuradas para acesso anônimo (leitura/escrita limitada)
- Para operações administrativas, use a chave de serviço (não incluída aqui)
- Sempre use políticas RLS para controlar o acesso aos dados

## Próximos Passos

1. Teste o formulário de contato no site
2. Verifique se os dados aparecem na tabela `leads`
3. Configure notificações por email se necessário
4. Implemente dashboard administrativo se necessário
