import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckCircle, Home, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Success: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // If user is not logged in, redirect to login
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Pagamento Confirmado!
          </h1>
          <p className="text-gray-600">
            Obrigado pela sua compra. Seu plano foi ativado com sucesso.
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800 text-sm">
            Você agora tem acesso completo a todas as funcionalidades do seu plano.
          </p>
        </div>

        <div className="space-y-3">
          <Link
            to="/dashboard"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <User className="w-5 h-5" />
            <span>Ir para Dashboard</span>
          </Link>
          
          <Link
            to="/landing"
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Home className="w-5 h-5" />
            <span>Voltar ao Início</span>
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Você receberá um email de confirmação em breve com os detalhes da sua compra.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Success