import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Plus, Settings, Filter, MoreHorizontal, QrCode } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { api } from '@/services/api'
import type { Equipment } from '@/types'
import { STATUS_COLORS, CRITICALITY_COLORS } from '@/lib/constants'

export function Equipments() {
  const [equipments, setEquipments] = useState<Equipment[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getEquipments().then((data) => {
      setEquipments(data)
      setLoading(false)
    })
  }, [])

  const filtered = equipments.filter(
    (e) =>
      e.tag.toLowerCase().includes(search.toLowerCase()) ||
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.location?.toLowerCase().includes(search.toLowerCase())
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
          <h1 className="text-2xl font-bold tracking-tight">Equipamentos</h1>
          <p className="text-sm text-muted-foreground">{equipments.length} equipamentos cadastrados</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          Novo Equipamento
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por TAG, nome ou local..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((equipment) => {
          const status = STATUS_COLORS[equipment.status]
          const criticality = CRITICALITY_COLORS[equipment.criticality]
          return (
            <motion.div
              key={equipment.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card className="hover:shadow-md transition-shadow cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Settings className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-sm">{equipment.name}</CardTitle>
                        <p className="text-xs text-muted-foreground font-mono">{equipment.tag}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant={status.text.includes('green') ? 'success' : status.text.includes('red') ? 'destructive' : 'warning'}>
                      {status.label}
                    </Badge>
                    <Badge variant={criticality.text.includes('red') ? 'destructive' : criticality.text.includes('orange') ? 'warning' : 'secondary'}>
                      {criticality.label}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    {equipment.location && (
                      <p><span className="font-medium">Local:</span> {equipment.location}</p>
                    )}
                    {equipment.category && (
                      <p><span className="font-medium">Categoria:</span> {equipment.category}</p>
                    )}
                    {equipment.manufacturer && (
                      <p><span className="font-medium">Fabricante:</span> {equipment.manufacturer}</p>
                    )}
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
