import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { ContactForm } from '@/types/supabase'

interface UseContactFormReturn {
  isLoading: boolean
  error: string | null
  success: boolean
  submitForm: (data: Omit<ContactForm, 'id' | 'created_at'>) => Promise<void>
  resetForm: () => void
}

export const useContactForm = (): UseContactFormReturn => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const submitForm = async (data: Omit<ContactForm, 'id' | 'created_at'>) => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const { error: supabaseError } = await supabase
        .from('contact_forms')
        .insert([data])

      if (supabaseError) {
        throw new Error(supabaseError.message)
      }

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
