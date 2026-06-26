import { motion } from 'framer-motion'
import { Search, Filter, ScrollText } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const logs = [
  { id: '1', user: 'João Silva', action: 'Criação', entity: 'Ordem de Serviço', entity_id: 'OS-2026-010', details: 'Criou nova ordem corretiva', created_at: '2026-06-25 14:32:00' },
  { id: '2', user: 'Maria Oliveira', action: 'Atualização', entity: 'Equipamento', entity_id: 'BT-003', details: 'Alterou status para manutenção', created_at: '2026-06-25 13:15:00' },
  { id: '3', user: 'Sistema', action: 'Geração Automática', entity: 'Ordem de Serviço', entity_id: 'OS-2026-007', details: 'Plano preventivo PP-002', created_at: '2026-06-25 08:00:00' },
  { id: '4', user: 'Carlos Santos', action: 'Exclusão', entity: 'Item Almoxarifado', entity_id: 'PAR-002', details: 'Excluiu item obsoleto', created_at: '2026-06-24 16:45:00' },
  { id: '5', user: 'Ana Costa', action: 'Login', entity: 'Usuário', entity_id: 'ana.costa', details: 'Autenticação bem-sucedida', created_at: '2026-06-24 07:30:00' },
  { id: '6', user: 'Pedro Alves', action: 'Finalização', entity: 'Ordem de Serviço', entity_id: 'OS-2026-002', details: 'Concluiu ordem de lubrificação', created_at: '2026-06-24 17:00:00' },
]

export function Audit() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Auditoria</h1>
        <p className="text-sm text-muted-foreground">Registro de alterações no sistema</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar logs..." className="pl-9" />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>Ação</TableHead>
                <TableHead>Entidade</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Detalhes</TableHead>
                <TableHead>Data/Hora</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.user}</TableCell>
                  <TableCell>
                    <Badge variant={log.action.includes('Criação') || log.action.includes('Geração') ? 'success' : log.action === 'Exclusão' ? 'destructive' : 'default'}>
                      {log.action}
                    </Badge>
                  </TableCell>
                  <TableCell>{log.entity}</TableCell>
                  <TableCell className="font-mono text-xs">{log.entity_id}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{log.details}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{log.created_at}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  )
}
