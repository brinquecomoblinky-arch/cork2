import React from 'react'
import { Link } from 'react-router-dom'
import { CreditCard, Shield, Zap, Users } from 'lucide-react'

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <CreditCard className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">PayApp</span>
          </div>
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            Login
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-6">
          Transforme seu
          <span className="text-blue-600"> Negócio</span>
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
          A plataforma completa que você precisa para acelerar seu crescimento e alcançar resultados extraordinários
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/pricing"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
          >
            <CreditCard className="w-5 h-5" />
            <span>Ver Planos</span>
          </Link>
          <Link
            to="/login"
            className="bg-white hover:bg-gray-50 text-gray-900 font-medium py-4 px-8 rounded-lg border border-gray-300 transition-colors duration-200"
          >
            Fazer Login
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Por que escolher nossa plataforma?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Rápido e Eficiente</h3>
            <p className="text-gray-600">
              Tecnologia de ponta que acelera seus processos e aumenta sua produtividade
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Seguro e Confiável</h3>
            <p className="text-gray-600">
              Seus dados protegidos com criptografia de nível bancário e backup automático
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Suporte Dedicado</h3>
            <p className="text-gray-600">
              Equipe especializada pronta para ajudar você a alcançar seus objetivos
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto para começar?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de usuários que já transformaram seus negócios
          </p>
          <Link
            to="/pricing"
            className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-4 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 inline-flex items-center space-x-2"
          >
            <CreditCard className="w-5 h-5" />
            <span>Escolher Plano</span>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Landing