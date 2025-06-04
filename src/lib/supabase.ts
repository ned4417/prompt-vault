// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types for TypeScript
export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          description: string | null
          icon: string | null
          color: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          icon?: string | null
          color?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          icon?: string | null
          color?: string | null
          created_at?: string
        }
      }
      prompts: {
        Row: {
          id: string
          title: string
          description: string
          content: string
          preview: string
          price: number
          category_id: string | null
          is_free: boolean
          is_featured: boolean
          tags: string[] | null
          success_rate: number | null
          difficulty_level: string
          estimated_tokens: number | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          content: string
          preview: string
          price?: number
          category_id?: string | null
          is_free?: boolean
          is_featured?: boolean
          tags?: string[] | null
          success_rate?: number | null
          difficulty_level?: string
          estimated_tokens?: number | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          content?: string
          preview?: string
          price?: number
          category_id?: string | null
          is_free?: boolean
          is_featured?: boolean
          tags?: string[] | null
          success_rate?: number | null
          difficulty_level?: string
          estimated_tokens?: number | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      purchases: {
        Row: {
          id: string
          user_id: string
          prompt_id: string | null
          bundle_id: string | null
          stripe_payment_intent_id: string | null
          amount: number
          currency: string
          status: string
          purchased_at: string
        }
        Insert: {
          id?: string
          user_id: string
          prompt_id?: string | null
          bundle_id?: string | null
          stripe_payment_intent_id?: string | null
          amount: number
          currency?: string
          status?: string
          purchased_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          prompt_id?: string | null
          bundle_id?: string | null
          stripe_payment_intent_id?: string | null
          amount?: number
          currency?: string
          status?: string
          purchased_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          stripe_subscription_id: string
          stripe_customer_id: string
          status: string
          current_period_start: string
          current_period_end: string
          cancel_at_period_end: boolean
          plan_name: string
          plan_amount: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          stripe_subscription_id: string
          stripe_customer_id: string
          status: string
          current_period_start: string
          current_period_end: string
          cancel_at_period_end?: boolean
          plan_name: string
          plan_amount: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          stripe_subscription_id?: string
          stripe_customer_id?: string
          status?: string
          current_period_start?: string
          current_period_end?: string
          cancel_at_period_end?: boolean
          plan_name?: string
          plan_amount?: number
          created_at?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          email: string | null
          full_name: string | null
          avatar_url: string | null
          is_creator: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          is_creator?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          is_creator?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}