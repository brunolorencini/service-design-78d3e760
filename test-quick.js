// Teste rápido - cole no console do navegador
const testSupabase = async () => {
  const response = await fetch('https://uwcobhhtyuzjkojobenz.supabase.co/rest/v1/leads', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3Y29iaGh0eXV6amtvam9iZW56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxODQ1OTQsImV4cCI6MjA3MDc2MDU5NH0._ou4A_QZye1dMAI0UncADmYOswrX6O39FJHDg680-SU',
      'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3Y29iaGh0eXV6amtvam9iZW56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxODQ1OTQsImV4cCI6MjA3MDc2MDU5NH0._ou4A_QZye1dMAI0UncADmYOswrX6O39FJHDg680-SU',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify({
      name: 'Teste Formulário',
      email: 'teste@exemplo.com',
      phone: '11999999999',
      project_type: 'Website',
      description: 'Teste após configuração do banco',
      budget: 'R$ 5.000'
    })
  });
  
  console.log('🔍 Status da resposta:', response.status);
  if (response.status === 201 || response.status === 200) {
    console.log('✅ SUCESSO! O formulário está funcionando!');
  } else {
    console.log('❌ Ainda há problemas. Status:', response.status);
    const error = await response.text();
    console.log('Erro:', error);
  }
};

testSupabase();
