import { motion } from 'framer-motion'
import { FileText, Download, Printer, FileSpreadsheet } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const reports = [
  { title: 'Relatório de Ordens de Serviço', desc: 'Resumo completo de todas as OS do período', icon: FileText },
  { title: 'Histórico de Equipamentos', desc: 'Manutenções realizadas por equipamento', icon: FileSpreadsheet },
  { title: 'Custos de Manutenção', desc: 'Análise detalhada de custos por centro', icon: FileText },
  { title: 'Indicadores de Desempenho', desc: 'KPIs e métricas de manutenção', icon: FileSpreadsheet },
  { title: 'Inventário do Almoxarifado', desc: 'Listagem completa de itens em estoque', icon: FileText },
  { title: 'Cronograma de Preventivas', desc: 'Calendário de manutenções preventivas', icon: FileSpreadsheet },
  { title: 'Checklists Executados', desc: 'Relatório de inspeções e checklists', icon: FileText },
  { title: 'SLA e Níveis de Serviço', desc: 'Acompanhamento de SLAs por contrato', icon: FileSpreadsheet },
]

export function Reports() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Relatórios</h1>
        <p className="text-sm text-muted-foreground">Geração de relatórios em PDF</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {reports.map((report) => (
          <Card key={report.title} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="p-2 rounded-lg bg-primary/10 w-fit mb-3">
                <report.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-sm mb-1">{report.title}</h3>
              <p className="text-xs text-muted-foreground mb-4">{report.desc}</p>
              <div className="flex gap-2">
                <Button size="sm" variant="default" className="h-8 text-xs">
                  <Download className="h-3 w-3" />
                  PDF
                </Button>
                <Button size="sm" variant="outline" className="h-8 text-xs">
                  <Printer className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  )
}
