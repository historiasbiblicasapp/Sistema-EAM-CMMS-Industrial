export const NAV_ITEMS = [
  { label: 'Dashboard', href: '/', icon: 'LayoutDashboard' },
  { label: 'Equipamentos', href: '/equipamentos', icon: 'Settings' },
  { label: 'Ordens de Serviço', href: '/ordens', icon: 'ClipboardList' },
  { label: 'Planos Preventivos', href: '/preventivas', icon: 'CalendarCheck' },
  { label: 'Almoxarifado', href: '/almoxarifado', icon: 'Package' },
  { label: 'Compras', href: '/compras', icon: 'ShoppingCart' },
  { label: 'Contratos', href: '/contratos', icon: 'FileText' },
  { label: 'Fornecedores', href: '/fornecedores', icon: 'Truck' },
  { label: 'Equipes', href: '/equipes', icon: 'Users' },
  { label: 'Indicadores', href: '/indicadores', icon: 'BarChart3' },
  { label: 'Relatórios', href: '/relatorios', icon: 'Printer' },
  { label: 'Administração', href: '/admin', icon: 'Shield' },
  { label: 'Auditoria', href: '/auditoria', icon: 'ScrollText' },
  { label: 'Configurações', href: '/configuracoes', icon: 'Cog' },
]

export const STATUS_COLORS = {
  operating: { bg: 'bg-green-100 dark:bg-green-900/20', text: 'text-green-700 dark:text-green-400', label: 'Operando' },
  available: { bg: 'bg-green-100 dark:bg-green-900/20', text: 'text-green-700 dark:text-green-400', label: 'Disponível' },
  stopped: { bg: 'bg-red-100 dark:bg-red-900/20', text: 'text-red-700 dark:text-red-400', label: 'Parado' },
  broken: { bg: 'bg-red-100 dark:bg-red-900/20', text: 'text-red-700 dark:text-red-400', label: 'Quebrado' },
  maintenance: { bg: 'bg-orange-100 dark:bg-orange-900/20', text: 'text-orange-700 dark:text-orange-400', label: 'Manutenção' },
}

export const PRIORITY_COLORS = {
  low: { bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-600 dark:text-gray-400', label: 'Baixa' },
  medium: { bg: 'bg-yellow-100 dark:bg-yellow-900/20', text: 'text-yellow-700 dark:text-yellow-400', label: 'Média' },
  high: { bg: 'bg-orange-100 dark:bg-orange-900/20', text: 'text-orange-700 dark:text-orange-400', label: 'Alta' },
  emergency: { bg: 'bg-red-100 dark:bg-red-900/20', text: 'text-red-700 dark:text-red-400', label: 'Emergência' },
}

export const CRITICALITY_COLORS = {
  low: { bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-600 dark:text-gray-400', label: 'Baixa' },
  medium: { bg: 'bg-yellow-100 dark:bg-yellow-900/20', text: 'text-yellow-700 dark:text-yellow-400', label: 'Média' },
  high: { bg: 'bg-orange-100 dark:bg-orange-900/20', text: 'text-orange-700 dark:text-orange-400', label: 'Alta' },
  critical: { bg: 'bg-red-100 dark:bg-red-900/20', text: 'text-red-700 dark:text-red-400', label: 'Crítica' },
}
