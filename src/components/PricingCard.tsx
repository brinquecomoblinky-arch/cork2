import React from 'react'
import { Check, Star } from 'lucide-react'

interface PricingCardProps {
  name: string
  description: string
  price: string
  features: string[]
  isPopular?: boolean
  onSelect: () => void
  loading?: boolean
}

export const PricingCard: React.FC<PricingCardProps> = ({
  name,
  description,
  price,
  features,
  isPopular = false,
  onSelect,
  loading = false
}) => {
  return (
    <div className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl hover:scale-105 ${
      isPopular ? 'border-blue-500' : 'border-gray-200'
    }`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
            <Star className="w-4 h-4" />
            <span>Mais Popular</span>
          </div>
        </div>
      )}
      
      <div className="p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        
        <div className="mb-8">
          <span className="text-4xl font-bold text-gray-900">{price}</span>
          <span className="text-gray-600 ml-2">/mês</span>
        </div>
        
        <ul className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-3">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
        
        <button
          onClick={onSelect}
          disabled={loading}
          className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all duration-200 ${
            isPopular
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-900 hover:bg-gray-800 text-white'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {loading ? 'Processando...' : 'Escolher Plano'}
        </button>
      </div>
    </div>
  )
}