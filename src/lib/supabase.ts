import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'
import { SUPABASE_CONFIG } from '@/config/supabase'

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

// Use configuration from config file
const supabaseUrl = SUPABASE_CONFIG.url
const supabaseAnonKey = SUPABASE_CONFIG.anonKey

// Debug configuration
console.log('🔍 Supabase configuration:')
console.log('URL:', supabaseUrl ? '✅ Found' : '❌ Missing')
console.log('Key:', supabaseAnonKey ? '✅ Found' : '❌ Missing')

// Create real or mock client based on configuration
let supabaseClient: any

try {
  if (supabaseUrl && supabaseAnonKey) {
    supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey)
    console.log('✅ Supabase client initialized successfully')
  } else {
    console.warn('⚠️ Missing configuration, using mock client')
    supabaseClient = createMockClient()
  }
} catch (error) {
  console.error('❌ Error initializing Supabase client:', error)
  supabaseClient = createMockClient()
}

export const supabase = supabaseClient

// Re-export types for convenience
export type { ContactForm, Lead } from '@/types/supabase'
