import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft, Settings, ClipboardList, CalendarCheck, History, DollarSign,
  FileText, MapPin, Building2, Wrench, AlertTriangle, Clock, CheckCircle2,
  Ban, ExternalLink, ChevronRight, Package, QrCode
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { api } from '@/services/api'
import type { Equipment, WorkOrder, PreventivePlan } from '@/types'
import { STATUS_COLORS, CRITICALITY_COLORS, PRIORITY_COLORS } from '@/lib/constants'

const statusConfig: Record<string, { icon: any; label: string; color: string }> = {
  open: { icon: Clock, label: 'Aberta', color: 'text-blue-500' },
  planned: { icon: Clock, label: 'Planejada', color: 'text-gray-500' },
  in_progress: { icon: AlertTriangle, label: 'Em Execução', color: 'text-orange-500' },
  completed: { icon: CheckCircle2, label: 'Concluída', color: 'text-green-500' },
  cancelled: { icon: Ban, label: 'Cancelada', color: 'text-gray-400' },
  blocked: { icon: AlertTriangle, label: 'Bloqueada', color: 'text-red-500' },
}

export function EquipmentDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [equipment, setEquipment] = useState<Equipment | null>(null)
  const [orders, setOrders] = useState<WorkOrder[]>([])
  const [plans, setPlans] = useState<PreventivePlan[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.getEquipment(id!),
      api.getWorkOrders(),
      api.getPreventivePlans(),
    ]).then(([eq, allOrders, allPlans]) => {
      setEquipment(eq)
      setOrders(allOrders.filter((o) => o.equipment_id === id))
      setPlans(allPlans.filter((p) => p.equipment_id === id))
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

  if (!equipment) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Equipamento não encontrado</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate('/equipamentos')}>
          Voltar
        </Button>
      </div>
    )
  }

  const status = STATUS_COLORS[equipment.status]
  const criticality = CRITICALITY_COLORS[equipment.criticality]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <Breadcrumb
        items={[
          { label: 'Equipamentos', href: '/equipamentos' },
          { label: `${equipment.tag} - ${equipment.name}` },
        ]}
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate('/equipamentos')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
            <Settings className="h-7 w-7 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{equipment.name}</h1>
              <Badge variant={status.text.includes('green') ? 'success' : status.text.includes('red') ? 'destructive' : 'warning'}>
                {status.label}
              </Badge>
              <Badge variant={criticality.text.includes('red') ? 'destructive' : 'warning'}>
                {criticality.label}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground font-mono">{equipment.tag}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <QrCode className="h-4 w-4" />
            QR Code
          </Button>
          <Button size="sm">Editar Equipamento</Button>
        </div>
      </div>

      {/* Main Content with Tabs */}
      <Tabs defaultValue="general">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="general">
            <Settings className="h-4 w-4 mr-2" />
            Geral
          </TabsTrigger>
          <TabsTrigger value="work-orders">
            <ClipboardList className="h-4 w-4 mr-2" />
            Ordens de Serviço
            {orders.length > 0 && (
              <span className="ml-2 px-1.5 py-0.5 rounded-full bg-primary/20 text-[10px]">{orders.length}</span>
            )}
          </TabsTrigger>
          <TabsTrigger value="preventive">
            <CalendarCheck className="h-4 w-4 mr-2" />
            Planos Preventivos
            {plans.length > 0 && (
              <span className="ml-2 px-1.5 py-0.5 rounded-full bg-primary/20 text-[10px]">{plans.length}</span>
            )}
          </TabsTrigger>
          <TabsTrigger value="history">
            <History className="h-4 w-4 mr-2" />
            Histórico
          </TabsTrigger>
          <TabsTrigger value="costs">
            <DollarSign className="h-4 w-4 mr-2" />
            Custos
          </TabsTrigger>
        </TabsList>

        {/* Tab: General */}
        <TabsContent value="general" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <InfoCard icon={MapPin} label="Local de Instalação" value={equipment.location || '-'} />
            <InfoCard icon={Building2} label="Localização Funcional" value={equipment.functional_location || '-'} />
            <InfoCard icon={Package} label="Categoria" value={equipment.category || '-'} />
            <InfoCard icon={Settings} label="Fabricante" value={equipment.manufacturer || '-'} />
            <InfoCard icon={FileText} label="Modelo" value={equipment.model || '-'} />
            <InfoCard icon={FileText} label="Nº Série" value={equipment.serial_number || '-'} />
            <InfoCard icon={CalendarCheck} label="Data de Instalação" value={equipment.install_date || '-'} />
            <InfoCard icon={CalendarCheck} label="Garantia até" value={equipment.warranty_end || '-'} />
            <InfoCard icon={Clock} label="Última Atualização" value={equipment.updated_at || '-'} />
          </div>

          {equipment.description && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Descrição</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{equipment.description}</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Tab: Work Orders */}
        <TabsContent value="work-orders" className="space-y-3">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">{orders.length} ordens encontradas</p>
            <Button size="sm" onClick={() => navigate('/ordens')}>
              <ExternalLink className="h-4 w-4" />
              Ver Todas
            </Button>
          </div>
          {orders.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                <ClipboardList className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Nenhuma ordem de serviço para este equipamento</p>
                <Button variant="outline" size="sm" className="mt-4">Nova Ordem</Button>
              </CardContent>
            </Card>
          ) : (
            orders.map((order) => {
              const cfg = statusConfig[order.status]
              const Icon = cfg?.icon || ClipboardList
              const priority = PRIORITY_COLORS[order.priority]
              return (
                <Card
                  key={order.id}
                  className="hover:shadow-md transition-shadow cursor-pointer group"
                  onClick={() => navigate(`/ordens/${order.id}`)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="p-2 rounded-lg bg-muted">
                          <Icon className={`h-4 w-4 ${cfg?.color || ''}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-muted-foreground">{order.number}</span>
                            <Badge variant={priority.text.includes('red') ? 'destructive' : 'warning'} className="text-[10px]">
                              {priority.label}
                            </Badge>
                            <Badge variant={cfg?.color.includes('green') ? 'success' : 'default'} className="text-[10px]">
                              {cfg?.label}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium mt-0.5">{order.title}</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </TabsContent>

        {/* Tab: Preventive Plans */}
        <TabsContent value="preventive" className="space-y-3">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">{plans.length} planos encontrados</p>
            <Button size="sm" onClick={() => navigate('/preventivas')}>
              <ExternalLink className="h-4 w-4" />
              Ver Todos
            </Button>
          </div>
          {plans.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                <CalendarCheck className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Nenhum plano preventivo para este equipamento</p>
                <Button variant="outline" size="sm" className="mt-4">Novo Plano</Button>
              </CardContent>
            </Card>
          ) : (
            plans.map((plan) => (
              <Card
                key={plan.id}
                className="hover:shadow-md transition-shadow cursor-pointer group"
                onClick={() => navigate(`/preventivas/${plan.id}`)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="p-2 rounded-lg bg-muted">
                        <CalendarCheck className="h-4 w-4 text-blue-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-muted-foreground">{plan.code}</span>
                          <Badge variant="outline">{plan.periodicity}</Badge>
                        </div>
                        <p className="text-sm font-medium mt-0.5">{plan.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Próxima: {plan.next_due}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Tab: History */}
        <TabsContent value="history" className="space-y-3">
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              <History className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Histórico de manutenções registradas</p>
              <p className="text-xs mt-1">As ordens concluídas aparecerão aqui</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Costs */}
        <TabsContent value="costs" className="space-y-3">
          <div className="grid gap-4 md:grid-cols-3">
            <CostCard title="Custo Total" value="R$ 12.450" subtitle="Últimos 12 meses" />
            <CostCard title="Custo Médio/OS" value="R$ 3.112" subtitle="4 ordens realizadas" />
            <CostCard title="Peças Utilizadas" value="R$ 8.230" subtitle="66% do total" />
          </div>
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              <DollarSign className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Gráfico de custos por período</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}

function InfoCard({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <Card className="hover:shadow-sm transition-shadow cursor-pointer group">
      <CardContent className="p-4 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
          <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-sm font-medium">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function CostCard({ title, value, subtitle }: { title: string; value: string; subtitle: string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-xs text-muted-foreground">{title}</p>
        <p className="text-xl font-bold mt-1">{value}</p>
        <p className="text-[10px] text-muted-foreground mt-0.5">{subtitle}</p>
      </CardContent>
    </Card>
  )
}
