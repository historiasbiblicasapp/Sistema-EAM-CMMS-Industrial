import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Factory, Eye, EyeOff } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthStore } from '@/stores/auth-store'

export function Login() {
  const [email, setEmail] = useState('admin@sistema.com')
  const [password, setPassword] = useState('123456')
  const [showPassword, setShowPassword] = useState(false)
  const { login, isLoading } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await login(email, password)
    navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <Factory className="h-10 w-10 text-blue-400" />
            <div className="text-white">
              <h1 className="text-xl font-bold">SGMI</h1>
              <p className="text-xs text-gray-400">EAM / CMMS</p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Acessar Sistema</CardTitle>
            <p className="text-sm text-muted-foreground">Sistema de Gestão de Manutenção Industrial</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-gray-500 mt-6">
          SGMI v1.0.0 - Sistema de Gestão de Manutenção Industrial
        </p>
      </motion.div>
    </div>
  )
}
