import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Lead } from '@/types/supabase'

interface UseContactFormReturn {
  isLoading: boolean
  error: string | null
  success: boolean
  submitForm: (data: Omit<Lead, 'id' | 'created_at'>) => Promise<void>
  resetForm: () => void
}

export const useContactForm = (): UseContactFormReturn => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const sendEmail = async (data: Omit<Lead, 'id' | 'created_at'>) => {
    const emailBody = `
Novo lead recebido através do site:

Nome: ${data.name}
Email: ${data.email}
Telefone: ${data.phone}
Tipo de Projeto: ${data.project_type}
Orçamento: ${data.budget || 'Não informado'}

Descrição do Projeto:
${data.description}

Data/Hora: ${new Date().toLocaleString('pt-BR')}
    `.trim()

    const mailtoLink = `mailto:bruno.lorencini@gmail.com?subject=Novo Lead - ${data.name}&body=${encodeURIComponent(emailBody)}`
    
    // Abre o cliente de email padrão
    window.open(mailtoLink, '_blank')
  }

  const submitForm = async (data: Omit<Lead, 'id' | 'created_at'>) => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // Salvar na tabela de leads
      const { error: supabaseError } = await supabase
        .from('leads')
        .insert([data])

      if (supabaseError) {
        throw new Error(supabaseError.message)
      }

      // Enviar email
      await sendEmail(data)

      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao enviar formulário')
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setError(null)
    setSuccess(false)
  }

  return {
    isLoading,
    error,
    success,
    submitForm,
    resetForm
  }
}
