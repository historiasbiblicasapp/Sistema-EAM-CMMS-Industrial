import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Package, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { api } from '@/services/api'
import type { InventoryItem } from '@/types'

export function Warehouse() {
  const [items, setItems] = useState<InventoryItem[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getInventory().then((data) => {
      setItems(data)
      setLoading(false)
    })
  }, [])

  const filtered = items.filter(
    (i) =>
      i.code.toLowerCase().includes(search.toLowerCase()) ||
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.category?.toLowerCase().includes(search.toLowerCase())
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
          <h1 className="text-2xl font-bold tracking-tight">Almoxarifado</h1>
          <p className="text-sm text-muted-foreground">{items.length} itens cadastrados</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          Novo Item
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por código, nome ou categoria..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((item) => {
          const isLow = item.quantity <= item.min_quantity
          return (
            <motion.div key={item.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <Card className={`hover:shadow-md transition-shadow ${isLow ? 'border-l-4 border-l-yellow-500' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${isLow ? 'bg-yellow-100 dark:bg-yellow-900/20' : 'bg-primary/10'}`}>
                      {isLow ? <AlertTriangle className="h-5 w-5 text-yellow-600" /> : <Package className="h-5 w-5 text-primary" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-sm truncate">{item.name}</CardTitle>
                      <p className="text-xs text-muted-foreground font-mono">{item.code}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-2xl font-bold">{item.quantity}</span>
                    <span className="text-xs text-muted-foreground">{item.unit}</span>
                  </div>
                  <Progress
                    value={item.max_quantity ? (item.quantity / item.max_quantity) * 100 : 50}
                    className={`h-2 ${isLow ? 'bg-yellow-100 [&>div]:bg-yellow-500' : ''}`}
                  />
                  <div className="flex justify-between mt-1 text-[10px] text-muted-foreground">
                    <span>Min: {item.min_quantity}</span>
                    {item.max_quantity && <span>Max: {item.max_quantity}</span>}
                  </div>
                  {item.location && (
                    <p className="text-xs text-muted-foreground mt-2">📍 {item.location}</p>
                  )}
                  {item.unit_cost && (
                    <p className="text-xs text-muted-foreground">R$ {item.unit_cost.toFixed(2)}/un</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
