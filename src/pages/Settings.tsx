import { motion } from 'framer-motion'
import { Sun, Moon, Globe, Bell, Shield, Palette } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useThemeStore } from '@/stores/theme-store'

export function Settings() {
  const { theme, toggleTheme } = useThemeStore()

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Configurações</h1>
        <p className="text-sm text-muted-foreground">Personalize o sistema</p>
      </div>

      <div className="max-w-2xl space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Aparência
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Modo Escuro</Label>
                <p className="text-xs text-muted-foreground">Alternar entre tema claro e escuro</p>
              </div>
              <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Idioma</Label>
                <p className="text-xs text-muted-foreground">Idioma da interface</p>
              </div>
              <Select className="w-40" defaultValue="pt-BR">
                <option value="pt-BR">Português (BR)</option>
                <option value="en">English</option>
                <option value="es">Español</option>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notificações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Alertas de Preventivas</Label>
                <p className="text-xs text-muted-foreground">Notificar quando preventivas estiverem próximas</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Ordens de Emergência</Label>
                <p className="text-xs text-muted-foreground">Notificar quando ordens de emergência forem abertas</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Estoque Baixo</Label>
                <p className="text-xs text-muted-foreground">Alertar quando itens estiverem abaixo do mínimo</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Segurança
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Autenticação em Dois Fatores</Label>
                <p className="text-xs text-muted-foreground">Camada adicional de segurança</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Registro de Auditoria</Label>
                <p className="text-xs text-muted-foreground">Registrar todas as ações do sistema</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
