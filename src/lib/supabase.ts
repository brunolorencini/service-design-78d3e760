import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'

// Create a mock client that always works
const createMockClient = () => {
  console.warn('⚠️ Supabase environment variables not found. Using mock client.')
  console.warn('📝 To enable Supabase, create a .env.local file with:')
  console.warn('VITE_SUPABASE_URL=your_supabase_url')
  console.warn('VITE_SUPABASE_ANON_KEY=your_supabase_anon_key')
  
  return {
    from: () => ({
      insert: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      select: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      delete: () => Promise.resolve({ error: { message: 'Supabase not configured' } })
    })
  } as any
}

// Safely get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create real or mock client based on environment variables
let supabaseClient: any

try {
  if (supabaseUrl && supabaseAnonKey) {
    supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey)
    console.log('✅ Supabase client initialized successfully')
  } else {
    supabaseClient = createMockClient()
  }
} catch (error) {
  console.error('❌ Error initializing Supabase client:', error)
  supabaseClient = createMockClient()
}

export const supabase = supabaseClient

// Re-export types for convenience
export type { ContactForm, Lead } from '@/types/supabase'
