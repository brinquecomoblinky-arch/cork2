import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, CreditCard } from 'lucide-react'
import { PricingCard } from '../components/PricingCard'
import { products } from '../lib/stripe'

const Pricing: React.FC = () => {
  const [loading, setLoading] = useState<string | null>(null)

  const handleCheckout = async (paymentLink: string | null, productId: string) => {
    setLoading(productId)
    
    try {
      if (!paymentLink) {
        alert('Este plano não está disponível no momento.')
        return
      }

      // Redirect to Stripe payment link
      window.location.href = paymentLink
    } catch (error) {
      console.error('Erro inesperado:', error)
      alert('Erro inesperado. Tente novamente.')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link
            to="/landing"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </Link>
        </div>

        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <CreditCard className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Escolha seu Plano
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Selecione o plano que melhor se adapta às suas necessidades e comece a aproveitar todos os benefícios
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {products.map((product, index) => (
            <PricingCard
              key={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              features={product.features}
              isPopular={index === 0}
              onSelect={() => handleCheckout(product.paymentLink, product.id)}
              loading={loading === product.id}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Pagamento seguro processado pelo Stripe • Cancele a qualquer momento
          </p>
        </div>
      </div>
    </div>
  )
}

export default Pricing