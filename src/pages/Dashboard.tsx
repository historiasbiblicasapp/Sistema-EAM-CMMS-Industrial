import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend 
} from 'recharts'
import { 
  Activity, Clock, AlertTriangle, TrendingUp, DollarSign, Users,
  Wrench, CheckCircle2, Gauge, Zap, BarChart3 
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { api } from '@/services/api'
import type { DashboardKPI } from '@/types'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

const pieData = [
  { name: 'Operando', value: 6, color: '#22c55e' },
  { name: 'Parado', value: 1, color: '#ef4444' },
  { name: 'Manutenção', value: 2, color: '#f97316' },
  { name: 'Disponível', value: 1, color: '#3b82f6' },
]

const monthlyData = [
  { name: 'Jan', ordens: 42, preventivas: 28, custos: 38 },
  { name: 'Fev', ordens: 38, preventivas: 25, custos: 32 },
  { name: 'Mar', ordens: 45, preventivas: 30, custos: 42 },
  { name: 'Abr', ordens: 40, preventivas: 26, custos: 35 },
  { name: 'Mai', ordens: 48, preventivas: 32, custos: 45 },
  { name: 'Jun', ordens: 35, preventivas: 29, custos: 40 },
]

const efficiencyData = [
  { name: 'Sem 1', eficiencia: 82, meta: 85 },
  { name: 'Sem 2', eficiencia: 86, meta: 85 },
  { name: 'Sem 3', eficiencia: 79, meta: 85 },
  { name: 'Sem 4', eficiencia: 91, meta: 85 },
  { name: 'Sem 5', eficiencia: 88, meta: 85 },
]

export function Dashboard() {
  const [kpi, setKpi] = useState<DashboardKPI | null>(null)

  useEffect(() => {
    api.getDashboardKPI().then(setKpi)
  }, [])

  if (!kpi) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard Executivo</h1>
          <p className="text-sm text-muted-foreground">Indicadores em tempo real</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="success" className="text-xs">Sistema Online</Badge>
          <Badge variant="info" className="text-xs">Atualizado</Badge>
        </div>
      </div>

      {/* KPI Cards */}
      <motion.div variants={container} className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
        <KPICard icon={Activity} title="Disponibilidade" value={`${kpi.availability}%`} color="text-green-500" />
        <KPICard icon={Clock} title="MTBF" value={`${kpi.mtbf}h`} color="text-blue-500" />
        <KPICard icon={AlertTriangle} title="MTTR" value={`${kpi.mttr}h`} color="text-orange-500" />
        <KPICard icon={Gauge} title="OEE" value={`${kpi.oee}%`} color="text-green-500" />
        <KPICard icon={CheckCircle2} title="SLA" value={`${kpi.sla}%`} color="text-blue-500" />
        <KPICard icon={BarChart3} title="Backlog" value={String(kpi.backlog)} color="text-yellow-500" />
        <KPICard icon={DollarSign} title="Custos" value={`R$ ${(kpi.total_cost / 1000).toFixed(1)}k`} color="text-red-500" />
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Equipamentos em Operação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">{kpi.equipments_operating}</div>
            <p className="text-xs text-muted-foreground mt-1">de {10} equipamentos</p>
            <Progress value={60} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Equipamentos Parados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">{kpi.equipments_stopped}</div>
            <p className="text-xs text-muted-foreground mt-1">fora de operação</p>
            <Progress value={10} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Preventivas Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-500">{kpi.preventive_pending}</div>
            <p className="text-xs text-muted-foreground mt-1">fora do prazo</p>
            <Progress value={40} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ordens Concluídas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-500">{kpi.orders_completed}</div>
            <p className="text-xs text-muted-foreground mt-1">este mês</p>
            <Progress value={75} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Ordens & Preventivas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Bar dataKey="ordens" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Ordens" />
                  <Bar dataKey="preventivas" fill="#22c55e" radius={[4, 4, 0, 0]} name="Preventivas" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Eficiência vs Meta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={efficiencyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Line type="monotone" dataKey="eficiencia" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} name="Eficiência" />
                  <Line type="monotone" dataKey="meta" stroke="#22c55e" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Meta" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Status dos Equipamentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Custos Mensais (R$ mil)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Area type="monotone" dataKey="custos" stroke="#f97316" fill="#f97316" fillOpacity={0.2} name="Custos" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preventive Maintenance Card */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-500" />
            Panorama de Manutenção Preventiva
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <PreventiveBadge label="Semanal (S)" total={4} done={2} color="text-blue-500" />
            <PreventiveBadge label="Mensal (M)" total={8} done={4} color="text-green-500" />
            <PreventiveBadge label="Trimestral (T)" total={3} done={1} color="text-yellow-500" />
            <PreventiveBadge label="Semestral (H)" total={2} done={0} color="text-orange-500" />
            <PreventiveBadge label="Anual (A)" total={1} done={0} color="text-red-500" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function KPICard({ icon: Icon, title, value, color }: { icon: any; title: string; value: string; color: string }) {
  return (
    <motion.div variants={item}>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Icon className={`h-4 w-4 ${color}`} />
            <span className="text-xs text-muted-foreground truncate">{title}</span>
          </div>
          <div className={`text-xl font-bold mt-2 ${color}`}>{value}</div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function PreventiveBadge({ label, total, done, color }: { label: string; total: number; done: number; color: string }) {
  const pending = total - done
  return (
    <div className="text-center p-3 rounded-lg bg-muted/50">
      <p className="text-sm font-semibold">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${color}`}>{total}</p>
      <div className="flex justify-center gap-2 mt-1 text-xs text-muted-foreground">
        <span className="text-green-500">{done} OK</span>
        <span className={pending > 0 ? 'text-red-500' : 'text-green-500'}>{pending} Pend.</span>
      </div>
      <Progress value={(done / total) * 100} className="mt-2 h-1.5" />
    </div>
  )
}
