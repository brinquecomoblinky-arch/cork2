import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Dashboard: React.FC = () => {
  const { user, signOut, hasActiveSubscription } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/landing')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-900">Home</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 text-sm">
                {user?.email}
              </span>
              <button
                onClick={handleSignOut}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Dashboard</h2>
          <p className="text-gray-600">
            Bem-vindo ao dashboard! Você está logado como: <strong>{user?.email}</strong>
          </p>
          
          <div className={`mt-6 p-4 rounded-lg border ${
            hasActiveSubscription 
              ? 'bg-green-50 border-green-200' 
              : 'bg-yellow-50 border-yellow-200'
          }`}>
            <p className={`text-sm ${
              hasActiveSubscription ? 'text-green-800' : 'text-yellow-800'
            }`}>
              Status da assinatura: {hasActiveSubscription ? 'Ativa ✅' : 'Inativa ⚠️'}
            </p>
            {!hasActiveSubscription && (
              <div className="mt-2">
                <Link 
                  to="/pricing"
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline"
                >
                  Assinar plano premium →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard