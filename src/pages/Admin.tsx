import { motion } from 'framer-motion'
import { Shield, Users, FileText, Settings, Key, Database, Bell, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const adminCards = [
  { icon: Users, title: 'Usuários', desc: 'Gerenciar usuários e permissões', color: 'text-blue-500' },
  { icon: Shield, title: 'Perfis de Acesso', desc: 'Configurar RBAC e papéis', color: 'text-green-500' },
  { icon: Key, title: 'Segurança', desc: 'Políticas de senha e LGPD', color: 'text-red-500' },
  { icon: FileText, title: 'Auditoria', desc: 'Logs de alterações do sistema', color: 'text-orange-500' },
  { icon: Database, title: 'Backup', desc: 'Configuração de backups', color: 'text-purple-500' },
  { icon: Bell, title: 'Notificações', desc: 'Alertas e notificações automáticas', color: 'text-yellow-500' },
  { icon: Clock, title: 'Agendamentos', desc: 'Jobs e tarefas automáticas', color: 'text-cyan-500' },
  { icon: Settings, title: 'Configurações', desc: 'Parâmetros gerais do sistema', color: 'text-gray-500' },
]

export function Admin() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Administração</h1>
        <p className="text-sm text-muted-foreground">Gerenciamento do sistema</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {adminCards.map((card) => (
          <Card key={card.title} className="hover:shadow-md transition-shadow cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-muted">
                  <card.icon className={`h-5 w-5 ${card.color}`} />
                </div>
              </div>
              <h3 className="font-semibold text-sm">{card.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{card.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  )
}
