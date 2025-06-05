import { NextRequest, NextResponse } from 'next/server'
import { createCustomerPortalSession } from '../../../../lib/stripe'
import { supabase } from '../../../../lib/supabase'

export async function POST(request: NextRequest) {
    try {
        const { userId } = await request.json()

        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
        }

        // Get user's Stripe customer ID from database
        const { data: subscription, error } = await supabase
            .from('subscriptions')
            .select('stripe_customer_id')
            .eq('user_id', userId)
            .eq('status', 'active')
            .single()

        if (error || !subscription?.stripe_customer_id) {
            return NextResponse.json({ error: 'No active subscription found' }, { status: 404 })
        }

        const returnUrl = `${request.nextUrl.origin}/dashboard`

        const session = await createCustomerPortalSession(
            subscription.stripe_customer_id,
            returnUrl
        )

        return NextResponse.json({ url: session.url })

    } catch (error) {
        console.error('Customer portal error:', error)
        return NextResponse.json(
            { error: 'Failed to create portal session' },
            { status: 500 }
        )
    }
}