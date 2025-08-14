import { NextRequest, NextResponse } from 'next/server'
import { createTokenCheckoutSession, createSubscriptionCheckoutSession } from '../../../../lib/stripe'
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

export async function POST(request: NextRequest) {
    try {
        console.log('Checkout API called')
        const { type, packageId, planId, userId } = await request.json()
        console.log('Request data:', { type, packageId, planId, userId })

        if (!userId) {
            console.log('Error: No userId provided')
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
        }

        // Check if environment variables are available
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
            console.error('Missing Supabase environment variables:', {
                supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
                serviceRoleKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY
            })
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
        }

        // Get user email from Supabase
        console.log('Fetching user from Supabase...')
        const { data: user, error: userError } = await supabaseAdmin.auth.admin.getUserById(userId)

        if (userError) {
            console.error('Supabase user fetch error:', userError)
            return NextResponse.json({ error: `User fetch failed: ${userError.message}` }, { status: 500 })
        }

        if (!user) {
            console.log('User not found in Supabase')
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        console.log('User found:', user.user.email)

        const successUrl = `${request.nextUrl.origin}/dashboard?session=success&type=${type}`
        const cancelUrl = `${request.nextUrl.origin}/dashboard?session=cancelled`

        let session

        console.log('Creating Stripe session...')
        if (type === 'tokens' && packageId) {
            console.log('Creating token purchase session for package:', packageId)
            // Create token purchase session
            session = await createTokenCheckoutSession(
                packageId,
                userId,
                successUrl,
                cancelUrl
            )
        } else if (type === 'subscription' && planId) {
            console.log('Creating subscription session for plan:', planId)
            // Create subscription session
            session = await createSubscriptionCheckoutSession(
                planId,
                userId,
                user.user.email!,
                successUrl,
                cancelUrl
            )
        } else {
            console.log('Invalid request parameters:', { type, packageId, planId })
            return NextResponse.json({ error: 'Invalid request parameters' }, { status: 400 })
        }

        console.log('Stripe session created successfully:', session.id)
        return NextResponse.json({ sessionId: session.id, url: session.url })

    } catch (error) {
        console.error('Stripe checkout error:', error)
        return NextResponse.json(
            { error: 'Failed to create checkout session' },
            { status: 500 }
        )
    }
}