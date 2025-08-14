import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Create admin client for server-side operations
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    }
)

export async function GET(request: NextRequest) {
    try {
        const userId = request.nextUrl.searchParams.get('userId')

        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
        }

        // Get user's token balance
        console.log('Fetching token balance for user:', userId)
        const { data: tokenBalance, error } = await supabaseAdmin
            .from('user_tokens')
            .select('tokens, lifetime_tokens, last_updated')
            .eq('user_id', userId)
            .single()
            
        console.log('Token balance query result:', { tokenBalance, error })

        if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
            throw error
        }

        const balance = tokenBalance?.tokens || 0

        return NextResponse.json({
            balance,
            lastUpdated: tokenBalance?.last_updated || null
        })

    } catch (error) {
        console.error('Token balance error:', error)
        return NextResponse.json(
            { error: 'Failed to get token balance' },
            { status: 500 }
        )
    }
}