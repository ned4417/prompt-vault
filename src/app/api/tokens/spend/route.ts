import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../../lib/supabase'

export async function POST(request: NextRequest) {
    try {
        const { userId, amount, promptId, description } = await request.json()

        if (!userId || !amount || amount <= 0) {
            return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 })
        }

        // Start a transaction to check balance and deduct tokens
        const { data: currentBalance, error: balanceError } = await supabase
            .from('user_tokens')
            .select('tokens')
            .eq('user_id', userId)
            .single()

        if (balanceError || !currentBalance) {
            return NextResponse.json({ error: 'User not found or no token balance' }, { status: 404 })
        }

        if (currentBalance.tokens < amount) {
            return NextResponse.json({ error: 'Insufficient tokens' }, { status: 400 })
        }

        // Deduct tokens
        const { error: updateError } = await supabase
            .from('user_tokens')
            .update({
                tokens: currentBalance.tokens - amount,
                last_updated: new Date().toISOString()
            })
            .eq('user_id', userId)

        if (updateError) {
            throw updateError
        }

        // Record the transaction
        const { error: transactionError } = await supabase
            .from('token_transactions')
            .insert({
                user_id: userId,
                amount: -amount, // Negative for spending
                type: 'spend',
                description: description || 'Prompt purchase',
                prompt_id: promptId,
                created_at: new Date().toISOString()
            })

        if (transactionError) {
            console.error('Transaction recording error:', transactionError)
            // Don't fail the request if transaction recording fails
        }

        return NextResponse.json({
            success: true,
            newBalance: currentBalance.tokens - amount
        })

    } catch (error) {
        console.error('Token spending error:', error)
        return NextResponse.json(
            { error: 'Failed to spend tokens' },
            { status: 500 }
        )
    }
}