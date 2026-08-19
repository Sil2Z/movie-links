import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Movie = {
  id: string
  title: string
  description: string | null
  url: string
  category: string
  rating: number
  image_url: string | null
  created_at: string
  updated_at: string
}

export type Category = {
  id: string
  name: string
  created_at: string
}