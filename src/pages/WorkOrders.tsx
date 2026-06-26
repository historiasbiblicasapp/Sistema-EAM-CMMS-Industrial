import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Filter, Clock, AlertTriangle, CheckCircle2, Ban } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { api } from '@/services/api'
import type { WorkOrder } from '@/types'
import { PRIORITY_COLORS } from '@/lib/constants'

const statusConfig = {
  open: { icon: Clock, label: 'Aberta', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/20' },
  planned: { icon: Clock, label: 'Planejada', color: 'text-gray-500', bg: 'bg-gray-50 dark:bg-gray-800/20' },
  in_progress: { icon: AlertTriangle, label: 'Em Execução', color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-950/20' },
  completed: { icon: CheckCircle2, label: 'Concluída', color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-950/20' },
  cancelled: { icon: Ban, label: 'Cancelada', color: 'text-gray-400', bg: 'bg-gray-50 dark:bg-gray-800/20' },
  blocked: { icon: AlertTriangle, label: 'Bloqueada', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-950/20' },
}

export function WorkOrders() {
  const [orders, setOrders] = useState<WorkOrder[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getWorkOrders().then((data) => {
      setOrders(data)
      setLoading(false)
    })
  }, [])

  const filtered = orders.filter(
    (o) =>
      o.number.toLowerCase().includes(search.toLowerCase()) ||
      o.title.toLowerCase().includes(search.toLowerCase()) ||
      o.equipment_name?.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Ordens de Serviço</h1>
          <p className="text-sm text-muted-foreground">{orders.length} ordens registradas</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          Nova Ordem
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por número, título ou equipamento..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-3">
        {filtered.map((order) => {
          const config = statusConfig[order.status]
          const StatusIcon = config.icon
          const priority = PRIORITY_COLORS[order.priority]
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className={`p-2 rounded-lg ${config.bg} mt-0.5`}>
                        <StatusIcon className={`h-5 w-5 ${config.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-mono text-muted-foreground">{order.number}</span>
                          <Badge variant={priority.text.includes('red') ? 'destructive' : priority.text.includes('orange') ? 'warning' : 'secondary'} className="text-[10px]">
                            {priority.label}
                          </Badge>
                          <Badge variant={config.color.includes('green') ? 'success' : config.color.includes('red') ? 'destructive' : 'warning'} className="text-[10px]">
                            {config.label}
                          </Badge>
                        </div>
                        <h3 className="text-sm font-medium mt-1">{order.title}</h3>
                        <div className="flex items-center gap-4 mt-1.5 text-xs text-muted-foreground">
                          {order.equipment_name && <span>📍 {order.equipment_name}</span>}
                          {order.assigned_team && <span>👥 {order.assigned_team}</span>}
                          {order.planned_start && <span>📅 {order.planned_start}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      {order.cost_estimated && (
                        <p className="text-sm font-semibold">R$ {order.cost_estimated.toLocaleString()}</p>
                      )}
                      {order.estimated_hours && (
                        <p className="text-xs text-muted-foreground">{order.estimated_hours}h estimadas</p>
                      )}
                      {order.actual_hours && (
                        <div className="mt-1">
                          <Progress value={(order.actual_hours / (order.estimated_hours || 1)) * 100} className="h-1.5 w-20" />
                          <p className="text-[10px] text-muted-foreground mt-0.5">{order.actual_hours}h realizadas</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
