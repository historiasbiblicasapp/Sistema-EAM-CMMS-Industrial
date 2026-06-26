import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft, CalendarCheck, Settings, Clock, AlertTriangle,
  ChevronRight, FileText, History, Play, QrCode
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { api } from '@/services/api'
import type { PreventivePlan, WorkOrder } from '@/types'
import { PRIORITY_COLORS, CRITICALITY_COLORS } from '@/lib/constants'
import { differenceInDays, parseISO } from 'date-fns'

const periodicityLabels: Record<string, string> = {
  weekly: 'Semanal',
  monthly: 'Mensal',
  quarterly: 'Trimestral',
  semiannual: 'Semestral',
  annual: 'Anual',
}

export function PreventivePlanDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [plan, setPlan] = useState<PreventivePlan | null>(null)
  const [orders, setOrders] = useState<WorkOrder[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.getPreventivePlan(id!),
      api.getWorkOrders(),
    ]).then(([p, allOrders]) => {
      setPlan(p)
      setOrders(allOrders.filter(
        (o) => o.equipment_id === p?.equipment_id && o.type === 'preventive'
      ))
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

  if (!plan) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Plano preventivo não encontrado</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate('/preventivas')}>Voltar</Button>
      </div>
    )
  }

  const priority = PRIORITY_COLORS[plan.priority]
  const criticality = CRITICALITY_COLORS[plan.criticality]
  const daysLeft = differenceInDays(parseISO(plan.next_due), new Date())
  const isOverdue = daysLeft < 0
  const isNear = daysLeft >= 0 && daysLeft <= 7

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <Breadcrumb
        items={[
          { label: 'Planos Preventivos', href: '/preventivas' },
          { label: `${plan.code} - ${plan.title}` },
        ]}
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate('/preventivas')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="h-14 w-14 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
            <CalendarCheck className="h-7 w-7 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{plan.title}</h1>
              <Badge variant={priority.text.includes('red') ? 'destructive' : priority.text.includes('orange') ? 'warning' : 'secondary'}>
                {priority.label}
              </Badge>
              <Badge variant={criticality.text.includes('red') ? 'destructive' : 'warning'}>
                {criticality.label}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground font-mono">{plan.code}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="default" size="sm">
            <Play className="h-4 w-4" />
            Gerar Ordem
          </Button>
          <Button variant="outline" size="sm">
            Editar
          </Button>
        </div>
      </div>

      {/* Status Alert */}
      <Card className={`border-l-4 ${
        isOverdue ? 'border-l-red-500' : isNear ? 'border-l-yellow-500' : 'border-l-green-500'
      }`}>
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className={`h-5 w-5 ${
              isOverdue ? 'text-red-500' : isNear ? 'text-yellow-500' : 'text-green-500'
            }`} />
            <div>
              <p className="text-sm font-medium">
                {isOverdue
                  ? `Vencida há ${Math.abs(daysLeft)} dias`
                  : isNear
                  ? `Vence em ${daysLeft} dias`
                  : `Próxima execução em ${daysLeft} dias`}
              </p>
              <p className="text-xs text-muted-foreground">
                Próxima data: {plan.next_due}
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <CalendarCheck className="h-4 w-4" />
            Executar Agora
          </Button>
        </CardContent>
      </Card>

      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Detalhes</TabsTrigger>
          <TabsTrigger value="equipment">Equipamento</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <InfoCard icon={CalendarCheck} label="Periodicidade" value={periodicityLabels[plan.periodicity] || plan.periodicity} />
            <InfoCard icon={Clock} label="Intervalo" value={`${plan.interval_days} dias`} />
            <InfoCard icon={Clock} label="Duração Estimada" value={`${plan.estimated_hours}h`} />
            <InfoCard icon={CalendarCheck} label="Última Execução" value={plan.last_execution || 'Nunca'} />
            <InfoCard icon={CalendarCheck} label="Próxima Execução" value={plan.next_due} />
            <InfoCard icon={AlertTriangle} label="Status" value={plan.is_active ? 'Ativo' : 'Inativo'} />
          </div>
          {plan.description && (
            <Card>
              <CardHeader><CardTitle className="text-sm">Descrição</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="equipment" className="space-y-4">
          <Card
            className="hover:shadow-md transition-shadow cursor-pointer group"
            onClick={() => navigate(`/equipamentos/${plan.equipment_id}`)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Settings className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{plan.equipment_name}</p>
                    <p className="text-xs text-muted-foreground font-mono">{plan.equipment_tag}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-primary">
                  <span>Abrir Equipamento</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-3">
          {orders.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                <History className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Nenhuma ordem gerada para este plano</p>
              </CardContent>
            </Card>
          ) : (
            orders.map((order) => (
              <Card
                key={order.id}
                className="hover:shadow-md transition-shadow cursor-pointer group"
                onClick={() => navigate(`/ordens/${order.id}`)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-muted">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{order.number}</p>
                        <p className="text-xs text-muted-foreground">{order.planned_start}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))
          )}
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
