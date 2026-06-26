import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft, Clock, AlertTriangle, CheckCircle2, Ban, Calendar,
  User, Users, DollarSign, FileText, MapPin, Settings, ChevronRight,
  ClipboardList, QrCode, Printer
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { api } from '@/services/api'
import type { WorkOrder } from '@/types'
import { PRIORITY_COLORS } from '@/lib/constants'

const statusConfig: Record<string, { icon: any; label: string; color: string; bg: string }> = {
  open: { icon: Clock, label: 'Aberta', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/20' },
  planned: { icon: Clock, label: 'Planejada', color: 'text-gray-500', bg: 'bg-gray-50 dark:bg-gray-800/20' },
  in_progress: { icon: AlertTriangle, label: 'Em Execução', color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-950/20' },
  completed: { icon: CheckCircle2, label: 'Concluída', color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-950/20' },
  cancelled: { icon: Ban, label: 'Cancelada', color: 'text-gray-400', bg: 'bg-gray-50 dark:bg-gray-800/20' },
  blocked: { icon: AlertTriangle, label: 'Bloqueada', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-950/20' },
}

export function WorkOrderDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState<WorkOrder | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getWorkOrder(id!).then((data) => {
      setOrder(data)
      setLoading(false)
    })
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Ordem de serviço não encontrada</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate('/ordens')}>Voltar</Button>
      </div>
    )
  }

  const config = statusConfig[order.status]
  const StatusIcon = config?.icon || ClipboardList
  const priority = PRIORITY_COLORS[order.priority]
  const hoursProgress = order.estimated_hours && order.actual_hours
    ? (order.actual_hours / order.estimated_hours) * 100
    : 0

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <Breadcrumb
        items={[
          { label: 'Ordens de Serviço', href: '/ordens' },
          { label: order.number },
        ]}
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate('/ordens')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className={`p-3 rounded-xl ${config?.bg || 'bg-muted'}`}>
            <StatusIcon className={`h-6 w-6 ${config?.color || ''}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{order.number}</h1>
              <Badge variant={priority.text.includes('red') ? 'destructive' : priority.text.includes('orange') ? 'warning' : 'secondary'}>
                {priority.label}
              </Badge>
              <Badge variant={config?.color.includes('green') ? 'success' : config?.color.includes('red') ? 'destructive' : 'warning'}>
                {config?.label}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{order.title}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4" />
            Imprimir
          </Button>
          <Button size="sm">Editar</Button>
        </div>
      </div>

      {/* Progress */}
      {order.estimated_hours && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progresso</span>
              <span className="text-sm text-muted-foreground">
                {order.actual_hours || 0}h / {order.estimated_hours}h
              </span>
            </div>
            <Progress value={hoursProgress} className="h-2" />
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Detalhes</TabsTrigger>
          <TabsTrigger value="equipment">Equipamento</TabsTrigger>
          <TabsTrigger value="execution">Execução</TabsTrigger>
          <TabsTrigger value="costs">Custos</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <InfoCard icon={Calendar} label="Início Planejado" value={order.planned_start || '-'} />
            <InfoCard icon={Calendar} label="Fim Planejado" value={order.planned_end || '-'} />
            <InfoCard icon={Calendar} label="Início Real" value={order.actual_start || '-'} />
            <InfoCard icon={Calendar} label="Fim Real" value={order.actual_end || '-'} />
            <InfoCard icon={Clock} label="Horas Estimadas" value={order.estimated_hours ? `${order.estimated_hours}h` : '-'} />
            <InfoCard icon={Clock} label="Horas Reais" value={order.actual_hours ? `${order.actual_hours}h` : '-'} />
            <InfoCard icon={User} label="Solicitante" value={order.requester || '-'} />
            <InfoCard icon={Users} label="Equipe" value={order.assigned_team || '-'} />
            <InfoCard icon={User} label="Responsável" value={order.assigned_to || '-'} />
          </div>
          {order.description && (
            <Card>
              <CardHeader><CardTitle className="text-sm">Descrição</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{order.description}</p>
              </CardContent>
            </Card>
          )}
          {order.notes && (
            <Card>
              <CardHeader><CardTitle className="text-sm">Observações</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{order.notes}</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="equipment" className="space-y-4">
          {order.equipment_id ? (
            <Card
              className="hover:shadow-md transition-shadow cursor-pointer group"
              onClick={() => navigate(`/equipamentos/${order.equipment_id}`)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Settings className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{order.equipment_name}</p>
                      <p className="text-xs text-muted-foreground font-mono">{order.equipment_tag}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-primary">
                    <span>Abrir Equipamento</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                <Settings className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Nenhum equipamento associado</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="execution" className="space-y-4">
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              <ClipboardList className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Detalhes de execução</p>
              <p className="text-xs mt-1">Checklists, fotos e assinaturas</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="costs" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader><CardTitle className="text-sm">Custos Estimados</CardTitle></CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  R$ {order.cost_estimated?.toLocaleString() || '0'}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-sm">Custos Realizados</CardTitle></CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  R$ {order.cost_actual?.toLocaleString() || '0'}
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}

function InfoCard({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <Card className="hover:shadow-sm transition-shadow">
      <CardContent className="p-4 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-muted">
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-sm font-medium">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}
