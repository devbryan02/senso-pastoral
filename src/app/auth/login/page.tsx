'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { LogIn, Mail, Lock, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const supabase = createClient()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    setIsLoading(true)
    setErrorMsg('')
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      setErrorMsg(error.message)
      setIsLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300 p-4">
      <div className="w-full max-w-md">
        {/* Logo y encabezado */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-base-content mb-2">SENSO</h1>
          <p className="text-base-content/70">Sistema de Gestión Eclesiástica</p>
        </div>

        {/* Formulario de login */}
        <div className="card bg-base-100 shadow-2xl">
          <div className="card-body p-8">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold flex items-center justify-center gap-2">
                <LogIn className="w-5 h-5" />
                Iniciar Sesión
              </h2>
              <p className="text-sm text-base-content/60 mt-2">
                Accede a tu panel de administración
              </p>
            </div>

            {/* Campo de email */}
            <div className="form-control w-full mb-4">
              <label className="label">
                <span className="label-text font-medium">Correo electrónico</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="admin@senso.com"
                  className="input input-bordered w-full pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Campo de contraseña */}
            <div className="form-control w-full mb-6">
              <label className="label">
                <span className="label-text font-medium">Contraseña</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/40" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="••••••••"
                  className="input input-bordered w-full pl-10 pr-10"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/40 hover:text-base-content transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Mensaje de error */}
            {errorMsg && (
              <div className="alert alert-error mb-4">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm">{errorMsg}</span>
              </div>
            )}

            {/* Botón de login */}
            <button 
              onClick={handleLogin} 
              className="btn btn-primary w-full"
              disabled={isLoading || !email || !password}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Iniciar sesión
                </>
              )}
            </button>

            {/* Información adicional */}
            <div className="divider my-6"></div>
            
            <div className="text-center">
              <p className="text-xs text-base-content/60">
                ¿Necesitas ayuda? Contacta al administrador del sistema
              </p>
            </div>
          </div>
        </div>

        {/* Footer informativo */}
        <div className="text-center mt-6">
          <p className="text-sm text-base-content/50">
            © 2025 SENSO - Sistema de Gestión Eclesiástica
          </p>
        </div>
      </div>
    </div>
  )
}