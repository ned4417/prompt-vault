import Stripe from 'stripe'
import { TokenPackage, SubscriptionPlan } from '../types/models'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16', // Use the supported API version
})

// Token packages configuration
export const TOKEN_PACKAGES: Record<string, TokenPackage> = {
    starter: {
        id: 'starter',
        name: 'Starter Pack',
        tokens: 25,
        price: 999, // $9.99 in cents
        description: 'Perfect for trying out prompts',
        popular: false,
    },
    popular: {
        id: 'popular',
        name: 'Popular Pack',
        tokens: 75,
        price: 2499, // $24.99 in cents
        description: 'Most popular choice',
        popular: true,
        bonus: 12, // 12 bonus tokens (17% bonus)
    },
    pro: {
        id: 'pro',
        name: 'Pro Pack',
        tokens: 200,
        price: 5999, // $59.99 in cents
        description: 'For serious prompt users',
        popular: false,
        bonus: 40, // 40 bonus tokens (25% bonus)
    },
}

// Subscription plans configuration
export const SUBSCRIPTION_PLANS: Record<string, SubscriptionPlan> = {
    basic: {
        id: 'basic',
        name: 'Basic Plan',
        tokens: 50,
        price: 1999, // $19.99 in cents
        description: 'Great for regular users',
        stripePriceId: process.env.STRIPE_BASIC_PRICE_ID!,
    },
    pro: {
        id: 'pro',
        name: 'Pro Plan',
        tokens: 150,
        price: 4999, // $49.99 in cents
        description: 'Perfect for power users',
        stripePriceId: process.env.STRIPE_PRO_PRICE_ID!,
        popular: true,
    },
    enterprise: {
        id: 'enterprise',
        name: 'Enterprise Plan',
        tokens: 500,
        price: 14999, // $149.99 in cents
        description: 'For teams and businesses',
        stripePriceId: process.env.STRIPE_ENTERPRISE_PRICE_ID!,
    },
}

// Create Stripe checkout session for token purchase
export async function createTokenCheckoutSession(
    packageId: keyof typeof TOKEN_PACKAGES,
    userId: string,
    successUrl: string,
    cancelUrl: string
) {
    const tokenPackage = TOKEN_PACKAGES[packageId]

    if (!tokenPackage) {
        throw new Error('Invalid token package')
    }

    const totalTokens = tokenPackage.tokens + (tokenPackage.bonus || 0)

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        customer_email: undefined, // Will be filled from user data
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: `${tokenPackage.name} - ${totalTokens} Tokens`,
                        description: tokenPackage.description,
                        images: [], // Add your token package images
                    },
                    unit_amount: tokenPackage.price,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
            type: 'token_purchase',
            user_id: userId,
            package_id: packageId,
            tokens: totalTokens.toString(),
        },
        allow_promotion_codes: true,
    })

    return session
}

// Create Stripe checkout session for subscription
export async function createSubscriptionCheckoutSession(
    planId: keyof typeof SUBSCRIPTION_PLANS,
    userId: string,
    customerEmail: string,
    successUrl: string,
    cancelUrl: string
) {
    const plan = SUBSCRIPTION_PLANS[planId]

    if (!plan) {
        throw new Error('Invalid subscription plan')
    }

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        customer_email: customerEmail,
        line_items: [
            {
                price: plan.stripePriceId,
                quantity: 1,
            },
        ],
        mode: 'subscription',
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
            type: 'subscription',
            user_id: userId,
            plan_id: planId,
        },
        subscription_data: {
            metadata: {
                user_id: userId,
                plan_id: planId,
                tokens_per_month: plan.tokens.toString(),
            },
        },
        allow_promotion_codes: true,
    })

    return session
}

// Create customer portal session for subscription management
export async function createCustomerPortalSession(
    customerId: string,
    returnUrl: string
) {
    const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: returnUrl,
    })

    return session
}

// Webhook handler for Stripe events
export async function handleStripeWebhook(event: Stripe.Event) {
    switch (event.type) {
        case 'checkout.session.completed':
            return handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session)

        case 'invoice.payment_succeeded':
            return handleSubscriptionPayment(event.data.object as Stripe.Invoice)

        case 'customer.subscription.updated':
        case 'customer.subscription.deleted':
            return handleSubscriptionChange(event.data.object as Stripe.Subscription)

        default:
            console.log(`Unhandled event type: ${event.type}`)
    }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
    const { metadata } = session

    if (!metadata) return

    if (metadata.type === 'token_purchase') {
        // Handle token purchase
        await addTokensToUser(
            metadata.user_id,
            parseInt(metadata.tokens),
            session.payment_intent as string,
            parseInt(session.amount_total!.toString())
        )
    } else if (metadata.type === 'subscription') {
        // Handle subscription start
        await createOrUpdateSubscription(
            metadata.user_id,
            session.subscription as string,
            session.customer as string,
            metadata.plan_id
        )
    }
}

async function handleSubscriptionPayment(invoice: Stripe.Invoice) {
    if (invoice.subscription && invoice.paid) {
        // Add monthly tokens for subscription payment
        const subscription = await stripe.subscriptions.retrieve(
            invoice.subscription as string
        )

        const tokens = parseInt(subscription.metadata.tokens_per_month || '0')
        const userId = subscription.metadata.user_id

        if (tokens && userId) {
            await addTokensToUser(userId, tokens, invoice.payment_intent as string, invoice.amount_paid)
        }
    }
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
    // Update subscription status in database
    // This would integrate with your Supabase database
}

// Database helper functions (integrate with your Supabase setup)
async function addTokensToUser(
    userId: string,
    tokens: number,
    paymentIntentId: string,
    amount: number
) {
    // This would integrate with your Supabase database
    // Example implementation:
    /*
    const { error } = await supabase
      .from('user_tokens')
      .upsert({
        user_id: userId,
        tokens: tokens,
        payment_intent_id: paymentIntentId,
        amount: amount,
        created_at: new Date().toISOString()
      }, {
        onConflict: 'user_id',
        ignoreDuplicates: false
      })
    */
}

async function createOrUpdateSubscription(
    userId: string,
    stripeSubscriptionId: string,
    stripeCustomerId: string,
    planId: string
) {
    // This would integrate with your Supabase database
    // Example implementation:
    /*
    const plan = SUBSCRIPTION_PLANS[planId as keyof typeof SUBSCRIPTION_PLANS]
    
    const { error } = await supabase
      .from('subscriptions')
      .upsert({
        user_id: userId,
        stripe_subscription_id: stripeSubscriptionId,
        stripe_customer_id: stripeCustomerId,
        plan_id: planId,
        tokens_per_month: plan.tokens,
        status: 'active',
        updated_at: new Date().toISOString()
      })
    */
}

export default stripe