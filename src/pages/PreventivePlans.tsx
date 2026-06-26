import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Filter, CalendarCheck, AlertTriangle, Clock, CheckCircle2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { api } from '@/services/api'
import type { PreventivePlan, PreventiveSummary } from '@/types'
import { PRIORITY_COLORS, CRITICALITY_COLORS } from '@/lib/constants'
import { differenceInDays, parseISO } from 'date-fns'

const periodicityLabels = {
  weekly: 'Semanal',
  monthly: 'Mensal',
  quarterly: 'Trimestral',
  semiannual: 'Semestral',
  annual: 'Anual',
}

const periodicityShort = {
  weekly: 'S',
  monthly: 'M',
  quarterly: 'T',
  semiannual: 'H',
  annual: 'A',
}

export function PreventivePlans() {
  const [plans, setPlans] = useState<PreventivePlan[]>([])
  const [summary, setSummary] = useState<PreventiveSummary | null>(null)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([api.getPreventivePlans(), api.getPreventiveSummary()]).then(([plans, summary]) => {
      setPlans(plans)
      setSummary(summary)
      setLoading(false)
    })
  }, [])

  const filtered = plans.filter(
    (p) =>
      p.code.toLowerCase().includes(search.toLowerCase()) ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.equipment_name.toLowerCase().includes(search.toLowerCase())
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
          <h1 className="text-2xl font-bold tracking-tight">Planos Preventivos</h1>
          <p className="text-sm text-muted-foreground">{plans.length} planos ativos</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          Novo Plano
        </Button>
      </div>

      {/* Preventive Summary Cards */}
      {summary && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <SummaryCard label="Semanal (S)" data={summary.weekly} color="border-l-blue-500" />
          <SummaryCard label="Mensal (M)" data={summary.monthly} color="border-l-green-500" />
          <SummaryCard label="Trimestral (T)" data={summary.quarterly} color="border-l-yellow-500" />
          <SummaryCard label="Semestral (H)" data={summary.semiannual} color="border-l-orange-500" />
          <SummaryCard label="Anual (A)" data={summary.annual} color="border-l-red-500" />
        </div>
      )}

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar planos..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Preventive Plans List */}
      <div className="space-y-3">
        {filtered.map((plan) => {
          const daysLeft = differenceInDays(parseISO(plan.next_due), new Date())
          const isOverdue = daysLeft < 0
          const isNear = daysLeft >= 0 && daysLeft <= 7
          const priority = PRIORITY_COLORS[plan.priority]
          const criticality = CRITICALITY_COLORS[plan.criticality]

          return (
            <motion.div key={plan.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <Card className={`hover:shadow-md transition-shadow border-l-4 ${
                isOverdue ? 'border-l-red-500' : isNear ? 'border-l-yellow-500' : 'border-l-green-500'
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono text-muted-foreground">{plan.code}</span>
                        <Badge variant={priority.text.includes('red') ? 'destructive' : priority.text.includes('orange') ? 'warning' : 'secondary'}>
                          {priority.label}
                        </Badge>
                        <Badge variant="outline">{periodicityLabels[plan.periodicity]}</Badge>
                      </div>
                      <h3 className="text-sm font-medium mt-1">{plan.title}</h3>
                      <div className="flex items-center gap-4 mt-1.5 text-xs text-muted-foreground">
                        <span>📍 {plan.equipment_name} ({plan.equipment_tag})</span>
                        <span>⏱ {plan.estimated_hours}h</span>
                        <span>📅 Próxima: {plan.next_due}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className={`text-lg font-bold ${
                        isOverdue ? 'text-red-500 animate-pulse' : isNear ? 'text-yellow-500' : 'text-green-500'
                      }`}>
                        {isOverdue ? `${Math.abs(daysLeft)}d atrasada` : `${daysLeft}d restantes`}
                      </div>
                      <div className="flex gap-1 mt-2 justify-end">
                        <Button size="sm" variant="default" className="h-7 text-xs">
                          Gerar OS
                        </Button>
                        <Button size="sm" variant="outline" className="h-7 text-xs">
                          Visualizar
                        </Button>
                      </div>
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

function SummaryCard({ label, data, color }: { label: string; data: { total: number; overdue: number; late: number; completed: number; scheduled: number }; color: string }) {
  return (
    <Card className={`border-l-4 ${color}`}>
      <CardContent className="p-3">
        <p className="text-xs font-semibold text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold mt-1">{data.total}</p>
        <div className="flex gap-2 mt-1 text-[10px]">
          <span className="text-green-500">{data.completed} OK</span>
          <span className="text-orange-500">{data.scheduled} Prog.</span>
          <span className="text-red-500">{data.overdue + data.late} Atraso</span>
        </div>
        <Progress value={data.total > 0 ? (data.completed / data.total) * 100 : 0} className="mt-2 h-1" />
      </CardContent>
    </Card>
  )
}
