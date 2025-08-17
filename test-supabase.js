// Script para testar a conexão com Supabase
// Execute este arquivo no console do navegador ou como um script Node.js

const SUPABASE_URL = 'https://uwcobhhtyuzjkojobenz.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3Y29iaGh0eXV6amtvam9iZW56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxODQ1OTQsImV4cCI6MjA3MDc2MDU5NH0._ou4A_QZye1dMAI0UncADmYOswrX6O39FJHDg680-SU'

// Teste de inserção de dados
const testInsert = async () => {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'apikey': SUPABASE_ANON_KEY,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        name: 'Teste',
        email: 'teste@teste.com',
        phone: '11999999999',
        project_type: 'Website',
        description: 'Teste de conexão',
        budget: 'R$ 5.000'
      })
    })

    console.log('Status:', response.status)
    console.log('Headers:', Object.fromEntries(response.headers.entries()))
    
    if (response.ok) {
      console.log('✅ Sucesso! A conexão está funcionando.')
    } else {
      const error = await response.text()
      console.log('❌ Erro:', error)
    }
  } catch (error) {
    console.error('❌ Erro de rede:', error)
  }
}

// Execute este teste
testInsert()
