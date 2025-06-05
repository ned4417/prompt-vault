import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { handleStripeWebhook } from '../../../../lib/stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16',
})

export async function POST(request: NextRequest) {
    const body = await request.text()
    const headersList = headers()
    const signature = headersList.get('stripe-signature')!

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (error) {
        console.error('Webhook signature verification failed:', error)
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    try {
        await handleStripeWebhook(event)
        return NextResponse.json({ received: true })
    } catch (error) {
        console.error('Webhook handling error:', error)
        return NextResponse.json({ error: 'Webhook handling failed' }, { status: 500 })
    }
}