import { NextRequest, NextResponse } from 'next/server'
import { createTokenCheckoutSession, createSubscriptionCheckoutSession } from '../../../../lib/stripe'
import { supabase } from '../../../../lib/supabase'

export async function POST(request: NextRequest) {
    try {
        const { type, packageId, planId, userId } = await request.json()

        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
        }

        // Get user email from Supabase
        const { data: user, error: userError } = await supabase.auth.admin.getUserById(userId)

        if (userError || !user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        const successUrl = `${request.nextUrl.origin}/dashboard?session=success&type=${type}`
        const cancelUrl = `${request.nextUrl.origin}/dashboard?session=cancelled`

        let session

        if (type === 'tokens' && packageId) {
            // Create token purchase session
            session = await createTokenCheckoutSession(
                packageId,
                userId,
                successUrl,
                cancelUrl
            )
        } else if (type === 'subscription' && planId) {
            // Create subscription session
            session = await createSubscriptionCheckoutSession(
                planId,
                userId,
                user.user.email!,
                successUrl,
                cancelUrl
            )
        } else {
            return NextResponse.json({ error: 'Invalid request parameters' }, { status: 400 })
        }

        return NextResponse.json({ sessionId: session.id, url: session.url })

    } catch (error) {
        console.error('Stripe checkout error:', error)
        return NextResponse.json(
            { error: 'Failed to create checkout session' },
            { status: 500 }
        )
    }
}