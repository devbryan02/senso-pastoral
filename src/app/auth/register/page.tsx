'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { UserPlus } from 'lucide-react'

export default function RegisterPage() {
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mensaje, setMensaje] = useState('')

  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) return setMensaje('⚠️ ' + error.message)
    setMensaje('✅ Registro exitoso, revisa tu correo 📬')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md shadow-xl bg-base-100 p-6">
        <h1 className="text-2xl font-bold flex items-center gap-2 mb-4">
          <UserPlus className="w-6 h-6" /> Registro
        </h1>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo"
          className="input input-bordered w-full mb-3"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          className="input input-bordered w-full mb-3"
        />
        <button onClick={handleRegister} className="btn btn-primary w-full">
          Registrarse
        </button>

        {mensaje && <p className="mt-4 text-sm text-info">{mensaje}</p>}
      </div>
    </div>
  )
}
