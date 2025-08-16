// Teste de conectividade com Supabase
import { supabase } from './lib/supabase'

// Dados fictícios para teste
const testData = {
  name: 'Teste Automático',
  email: 'teste@exemplo.com',
  phone: '(11) 99999-9999',
  project_type: 'website',
  description: 'Este é um teste automático para verificar a conectividade com o Supabase.',
  budget: 'teste'
}

export async function testSupabaseConnection() {
  console.log('🔍 Testando conexão com Supabase...')
  
  try {
    console.log('📝 Testando inserção na tabela leads...')
    
    const { data, error } = await supabase
      .from('leads')
      .insert([testData])
      .select()

    if (error) {
      console.error('❌ Erro ao inserir dados:', error.message)
      
      if (error.message.includes('relation "leads" does not exist')) {
        console.log('\n💡 Dica: Execute o SQL do arquivo supabase-setup.sql no seu projeto Supabase')
      }
      
      return false
    }

    console.log('✅ Dados inseridos com sucesso!')
    console.log('ID do registro:', data[0].id)
    console.log('Data de criação:', data[0].created_at)
    
    // Testar leitura dos dados
    console.log('\n📖 Testando leitura dos dados...')
    const { data: readData, error: readError } = await supabase
      .from('leads')
      .select('*')
      .eq('email', 'teste@exemplo.com')
      .limit(1)

    if (readError) {
      console.error('❌ Erro ao ler dados:', readError.message)
      return false
    }

    console.log('✅ Leitura realizada com sucesso!')
    console.log('Registros encontrados:', readData.length)
    
    // Limpar dados de teste
    console.log('\n🧹 Limpando dados de teste...')
    const { error: deleteError } = await supabase
      .from('leads')
      .delete()
      .eq('email', 'teste@exemplo.com')

    if (deleteError) {
      console.error('⚠️ Erro ao limpar dados de teste:', deleteError.message)
    } else {
      console.log('✅ Dados de teste removidos!')
    }

    console.log('\n🎉 Teste concluído com sucesso!')
    console.log('✅ Supabase está funcionando corretamente!')
    return true

  } catch (err) {
    console.error('❌ Erro inesperado:', err)
    return false
  }
}

// Executar teste se chamado diretamente
if (import.meta.env.DEV) {
  testSupabaseConnection()
}
