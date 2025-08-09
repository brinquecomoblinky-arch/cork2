import { loadStripe } from '@stripe/stripe-js'

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY

if (!stripePublishableKey) {
  throw new Error('Stripe publishable key not found in environment variables')
}

export const stripe = loadStripe(stripePublishableKey)

export const products = [
  {
    id: 'premium-plan',
    name: 'Plano Premium',
    description: 'Acesso completo a todas as funcionalidades',
    price: 'R$ 19,90',
    paymentLink: 'https://buy.stripe.com/test_14AcN4dqy9qpfXZ3xQefC01',
    features: [
      'Acesso ilimitado',
      'Suporte prioritário',
      'Recursos avançados',
      'Sem anúncios'
    ]
  },
  {
    id: 'basic-plan',
    name: 'Plano Básico',
    description: 'Funcionalidades essenciais para começar',
    price: 'R$ 9,90',
    paymentLink: null, // No payment link for basic plan
    features: [
      'Acesso básico',
      'Suporte por email',
      'Recursos essenciais'
    ]
  }
]