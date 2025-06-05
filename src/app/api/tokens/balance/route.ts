import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../../lib/supabase'

export async function GET(request: NextRequest) {
    try {
        const userId = request.nextUrl.searchParams.get('userId')

        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
        }

        // Get user's token balance
        const { data: tokenBalance, error } = await supabase
            .from('user_tokens')
            .select('tokens, last_updated')
            .eq('user_id', userId)
            .single()

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