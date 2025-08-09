import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      setMessage('Preencha todos os campos')
      return
    }

    if (password.length < 6) {
      setMessage('A senha deve ter pelo menos 6 caracteres')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      if (isLogin) {
        const { error } = await signIn(email, password)
        if (error) {
          setMessage('Email ou senha incorretos')
        } else {
          navigate('/dashboard')
        }
      } else {
        const { error } = await signUp(email, password)
        if (error) {
          setMessage(error.message)
        } else {
          setMessage('Conta criada com sucesso! Faça login.')
          setIsLogin(true)
          setPassword('')
        }
      }
    } catch (error: any) {
      setMessage('Erro inesperado. Tente novamente.')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
          {isLogin ? 'Login' : 'Cadastro'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha (mín. 6 caracteres)"
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              minLength={6}
            />
          </div>

          {message && (
            <div className={`p-4 rounded-lg text-sm ${
              message.includes('sucesso') 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : 'bg-red-100 text-red-700 border border-red-200'
            }`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            {loading ? 'Carregando...' : (isLogin ? 'Entrar' : 'Cadastrar')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin)
              setMessage('')
              setPassword('')
            }}
            className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
          >
            {isLogin ? 'Criar conta' : 'Já tenho conta'}
          </button>
        </div>

        <div className="mt-4 text-center">
          <Link to="/landing" className="text-gray-500 hover:text-gray-700 font-medium hover:underline">
            ← Voltar
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login