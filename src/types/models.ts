// types/models.ts
// Centralized type definitions for the entire application

import { User, Session } from '@supabase/supabase-js'

// ===========================================
// Authentication Types
// ===========================================
export interface AuthContextType {
    user: User | null
    session: Session | null
    loading: boolean
    signUp: (email: string, password: string, fullName: string) => Promise<any>
    signIn: (email: string, password: string) => Promise<any>
    signOut: () => Promise<any>
    resetPassword: (email: string) => Promise<any>
}

// ===========================================
// Token System Types
// ===========================================
export interface TokenPackage {
    id: string
    name: string
    tokens: number
    price: number
    description: string
    popular: boolean
    bonus?: number
    originalPrice?: number
    gradient?: string
    icon?: string
}

export interface SubscriptionPlan {
    id: string
    name: string
    tokens: number
    price: number
    description: string
    stripePriceId: string
    popular?: boolean
    features?: string[]
}

export interface UserTokenBalance {
    balance: number
    lastUpdated: string | null
}

export interface TokenTransaction {
    id: string
    user_id: string
    amount: number
    type: 'purchase' | 'subscription' | 'spend' | 'refund' | 'bonus'
    description?: string
    prompt_id?: string
    bundle_id?: string
    stripe_payment_intent_id?: string
    stripe_subscription_id?: string
    created_at: string
}

// ===========================================
// Prompt System Types
// ===========================================
export interface Prompt {
    id: string
    title: string
    description: string
    content: string
    preview: string
    price: number
    token_cost: number
    category: string
    category_id?: string
    is_free: boolean
    is_featured: boolean
    is_premium: boolean
    tags: string[]
    success_rate: number
    difficulty_level: 'beginner' | 'intermediate' | 'advanced'
    estimated_tokens?: number
    author: {
        name: string
        avatar: string
        verified: boolean
    }
    created_by?: string
    created_at: string
    updated_at: string
    // UI specific properties
    rating?: number
    reviews?: number
    sales?: number
    gradient?: string
}

export interface PurchasedPrompt {
    id: string
    title: string
    description: string
    content: string
    price: number
    category: string
    purchased_at: string
    tags: string[]
    success_rate: number
}

export interface PromptBundle {
    id: string
    title: string
    description: string
    token_cost: number
    original_token_cost?: number
    is_featured: boolean
    category_id?: string
    category?: string
    prompts?: Prompt[]
    created_by?: string
    created_at: string
    updated_at: string
    // UI specific properties
    gradient?: string
    icon?: string
    features?: string[]
}

// ===========================================
// Category Types
// ===========================================
export interface Category {
    id: string
    name: string
    description?: string
    icon?: string
    color?: string
    count?: number
    progress?: number
    hoverBorder?: string
    progressBg?: string
    created_at: string
}

// ===========================================
// Purchase & Subscription Types
// ===========================================
export interface Purchase {
    id: string
    user_id: string
    prompt_id?: string
    bundle_id?: string
    stripe_payment_intent_id?: string
    amount: number
    currency: string
    status: string
    tokens_received: number
    purchase_type: 'prompt' | 'bundle' | 'tokens' | 'subscription'
    purchased_at: string
}

export interface Subscription {
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
    tokens_per_month: number
    last_token_grant?: string
    created_at: string
    updated_at: string
}

export interface UserProfile {
    id: string
    email?: string
    full_name?: string
    avatar_url?: string
    is_creator: boolean
    created_at: string
    updated_at: string
}

// ===========================================
// Dashboard & Stats Types
// ===========================================
export interface UserStats {
    totalPurchases: number
    totalSpent: number
    promptsOwned: number
    favoriteCategory: string
}

export interface StatsCard {
    title: string
    value: string | number
    icon: any // React component
    color: string
    bgColor: string
}

// ===========================================
// UI Component Types
// ===========================================
export interface ModalProps {
    isOpen: boolean
    onClose: () => void
}

export interface TokenPurchaseModalProps extends ModalProps { }

export interface AuthModalProps extends ModalProps {
    defaultMode?: 'signin' | 'signup'
}

export interface PromptModalProps extends ModalProps {
    prompt: Prompt | null
}

export interface PromptViewModalProps extends ModalProps {
    prompt: PurchasedPrompt | null
}

export interface FeaturedPromptsProps {
    onPromptSelect: (prompt: Prompt) => void
}

export interface TokenBalanceProps {
    onPurchaseClick?: () => void
    showPurchaseButton?: boolean
}

// ===========================================
// API Response Types
// ===========================================
export interface ApiResponse<T> {
    data?: T
    error?: string
    message?: string
}

export interface StripeCheckoutResponse {
    sessionId?: string
    url?: string
    error?: string
}

export interface TokenSpendResponse {
    success: boolean
    newBalance: number
    error?: string
}

// ===========================================
// Stripe Webhook Types
// ===========================================
export interface StripeWebhookMetadata {
    type: 'token_purchase' | 'subscription'
    user_id: string
    package_id?: string
    plan_id?: string
    tokens?: string
}

// ===========================================
// Database Query Types
// ===========================================
export interface DatabasePrompt {
    id: string
    title: string
    description: string
    content: string
    price: number
    token_cost: number
    tags: string[]
    success_rate: number
    categories: {
        name: string
    } | null
}

export interface DatabasePurchase {
    id: string
    amount: number
    purchased_at: string
    prompts: DatabasePrompt
}

// ===========================================
// Form Types
// ===========================================
export interface SignUpFormData {
    email: string
    password: string
    fullName: string
}

export interface SignInFormData {
    email: string
    password: string
}

export interface ResetPasswordFormData {
    email: string
}

export interface UserSettingsFormData {
    fullName: string
    email: string
}

// ===========================================
// Navigation Types
// ===========================================
export interface NavItem {
    name: string
    href: string
    badge?: string | null
}

export interface SocialLink {
    name: string
    icon: string
    href: string
    color: string
}

// ===========================================
// Constants & Enums
// ===========================================
export enum PurchaseType {
    PROMPT = 'prompt',
    BUNDLE = 'bundle',
    TOKENS = 'tokens',
    SUBSCRIPTION = 'subscription'
}

export enum TransactionType {
    PURCHASE = 'purchase',
    SUBSCRIPTION = 'subscription',
    SPEND = 'spend',
    REFUND = 'refund',
    BONUS = 'bonus'
}

export enum SubscriptionStatus {
    ACTIVE = 'active',
    CANCELED = 'canceled',
    INCOMPLETE = 'incomplete',
    PAST_DUE = 'past_due',
    TRIALING = 'trialing',
    UNPAID = 'unpaid'
}

export enum DifficultyLevel {
    BEGINNER = 'beginner',
    INTERMEDIATE = 'intermediate',
    ADVANCED = 'advanced'
}