export interface ContactForm {
  id?: string
  name: string
  email: string
  phone: string
  project_type: string
  description: string
  budget?: string
  created_at?: string
}

export interface Lead {
  id?: string
  name: string
  email: string
  phone: string
  project_type: string
  description: string
  budget?: string
  created_at?: string
}

export interface Database {
  public: {
    Tables: {
      contact_forms: {
        Row: ContactForm
        Insert: Omit<ContactForm, 'id' | 'created_at'>
        Update: Partial<Omit<ContactForm, 'id' | 'created_at'>>
      }
      leads: {
        Row: Lead
        Insert: Omit<Lead, 'id' | 'created_at'>
        Update: Partial<Omit<Lead, 'id' | 'created_at'>>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
