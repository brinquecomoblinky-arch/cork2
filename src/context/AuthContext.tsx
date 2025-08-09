import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

interface AuthContextType {
  user: User | null
  session: Session | null
  hasActiveSubscription: boolean
  loading: boolean
  signUp: (email: string, password: string) => Promise<any>
  signIn: (email: string, password: string) => Promise<any>
  signOut: () => Promise<any>
  checkSubscription: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Erro ao obter sessão:', error)
        }
        
        if (mounted) {
          setSession(session)
          setUser(session?.user ?? null)
          setLoading(false)
        }
      } catch (error) {
        console.error('Erro inesperado ao obter sessão:', error)
        if (mounted) {
          setLoading(false)
        }
      }
    }

    getInitialSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (mounted) {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const checkSubscription = async () => {
    if (!user?.email) {
      setHasActiveSubscription(false)
      return
    }

    const supabaseFunctionsUrl = import.meta.env.VITE_SUPABASE_FUNCTIONS_URL;
    if (!supabaseFunctionsUrl) {
      console.error('VITE_SUPABASE_FUNCTIONS_URL is not defined. Cannot check subscription.');
      setHasActiveSubscription(false);
      return;
    }

   try {
  // Call your backend API to check subscription status
  const response = await fetch(`${supabaseFunctionsUrl}/check-subscription`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
    },
    body: JSON.stringify({ email: user.email }),
  })

  if (response.ok) {
    const data = await response.json()
    setHasActiveSubscription(data.hasActiveSubscription)
  } else {
    setHasActiveSubscription(false)
  }
} catch (error) {
  console.error('Erro ao verificar assinatura:', error)
  setHasActiveSubscription(false)
}

      if (response.ok) {
        const data = await response.json()
        setHasActiveSubscription(data.hasActiveSubscription)
      } else {
        setHasActiveSubscription(false)
      }
    } catch (error) {
      console.error('Erro ao verificar assinatura:', error)
      setHasActiveSubscription(false)
    }
  }

  // Check subscription when user changes
  useEffect(() => {
    if (user) {
      checkSubscription()
    } else {
      setHasActiveSubscription(false)
    }
  }, [user])

  const signUp = async (email: string, password: string) => {
    try {
      return await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: undefined
        }
      })
    } catch (error) {
      console.error('Erro no cadastro:', error)
      throw error
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      return await supabase.auth.signInWithPassword({
        email,
        password,
      })
    } catch (error) {
      console.error('Erro no login:', error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      return await supabase.auth.signOut()
    } catch (error) {
      console.error('Erro no logout:', error)
      throw error
    }
  }

  const value = {
    user,
    session,
    hasActiveSubscription,
    loading,
    signUp,
    signIn,
    signOut,
    checkSubscription,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}