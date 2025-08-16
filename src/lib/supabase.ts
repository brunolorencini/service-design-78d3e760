import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if environment variables are available
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase environment variables not found. Please create a .env.local file with:')
  console.warn('VITE_SUPABASE_URL=your_supabase_url')
  console.warn('VITE_SUPABASE_ANON_KEY=your_supabase_anon_key')
  
  // Create a mock client for development
  if (import.meta.env.DEV) {
    console.warn('🔧 Using mock Supabase client for development')
    export const supabase = {
      from: () => ({
        insert: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
        select: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
        delete: () => Promise.resolve({ error: { message: 'Supabase not configured' } })
      })
    } as any
  } else {
    throw new Error('Missing Supabase environment variables')
  }
} else {
  export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
}

// Re-export types for convenience
export type { ContactForm, Lead } from '@/types/supabase'
