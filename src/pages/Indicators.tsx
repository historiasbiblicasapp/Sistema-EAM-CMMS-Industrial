import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

const availabilityData = [
  { month: 'Jan', disponibilidade: 94.2, meta: 95 },
  { month: 'Fev', disponibilidade: 93.8, meta: 95 },
  { month: 'Mar', disponibilidade: 95.1, meta: 95 },
  { month: 'Abr', disponibilidade: 92.5, meta: 95 },
  { month: 'Mai', disponibilidade: 94.7, meta: 95 },
  { month: 'Jun', disponibilidade: 92.5, meta: 95 },
]

const mtbfData = [
  { month: 'Jan', mtbf: 720, mttr: 3.8 },
  { month: 'Fev', mtbf: 680, mttr: 4.2 },
  { month: 'Mar', mtbf: 840, mttr: 3.5 },
  { month: 'Abr', mtbf: 650, mttr: 4.8 },
  { month: 'Mai', mtbf: 780, mttr: 3.9 },
  { month: 'Jun', mtbf: 876, mttr: 4.2 },
]

const costBreakdown = [
  { name: 'Mão de Obra', value: 185000 },
  { name: 'Peças', value: 142000 },
  { name: 'Serviços', value: 78900 },
  { name: 'Materiais', value: 53000 },
]

export function Indicators() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Indicadores</h1>
        <p className="text-sm text-muted-foreground">Análise de desempenho da manutenção</p>
      </div>

      <Tabs defaultValue="availability">
        <TabsList>
          <TabsTrigger value="availability">Disponibilidade</TabsTrigger>
          <TabsTrigger value="reliability">Confiabilidade</TabsTrigger>
          <TabsTrigger value="costs">Custos</TabsTrigger>
          <TabsTrigger value="efficiency">Eficiência</TabsTrigger>
        </TabsList>

        <TabsContent value="availability" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard title="Disponibilidade Média" value="92.5%" subtitle="Últimos 6 meses" />
            <StatCard title="Melhor Mês" value="95.1%" subtitle="Março 2026" />
            <StatCard title="Pior Mês" value="92.5%" subtitle="Abril 2026" />
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Disponibilidade (%)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={availabilityData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[90, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="disponibilidade" stroke="#3b82f6" strokeWidth={2} dot={{ r: 5 }} name="Disponibilidade" />
                    <Line type="monotone" dataKey="meta" stroke="#22c55e" strokeWidth={2} strokeDasharray="5 5" name="Meta" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reliability" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard title="MTBF Médio" value="758h" subtitle="Últimos 6 meses" />
            <StatCard title="MTTR Médio" value="4.1h" subtitle="Últimos 6 meses" />
            <StatCard title="Confiabilidade" value="94.6%" subtitle="Índice Geral" />
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">MTBF vs MTTR</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mtbfData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="mtbf" fill="#3b82f6" radius={[4, 4, 0, 0]} name="MTBF (h)" />
                    <Bar yAxisId="right" dataKey="mttr" fill="#f97316" radius={[4, 4, 0, 0]} name="MTTR (h)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="costs" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard title="Custo Total" value="R$ 458.900" subtitle="Mês atual" />
            <StatCard title="Custo Médio/OS" value="R$ 3.420" subtitle="Mês atual" />
            <StatCard title="Orçamento" value="72%" subtitle="Utilizado" />
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Distribuição de Custos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={costBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#f97316" fill="#f97316" fillOpacity={0.2} name="Valor (R$)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="efficiency" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard title="OEE" value="85.3%" subtitle="Mês atual" />
            <StatCard title="SLA" value="94.1%" subtitle="Mês atual" />
            <StatCard title="Eficiência" value="87.8%" subtitle="Mês atual" />
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}

function StatCard({ title, value, subtitle }: { title: string; value: string; subtitle: string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
      </CardContent>
    </Card>
  )
}
