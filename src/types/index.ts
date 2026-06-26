export type EquipmentStatus = 'operating' | 'available' | 'stopped' | 'broken' | 'maintenance'
export type OrderStatus = 'open' | 'planned' | 'in_progress' | 'completed' | 'cancelled' | 'blocked'
export type OrderPriority = 'low' | 'medium' | 'high' | 'emergency'
export type OrderType = 'corrective' | 'preventive' | 'predictive' | 'lubrication' | 'inspection'
export type Criticality = 'low' | 'medium' | 'high' | 'critical'
export type Periodicity = 'weekly' | 'monthly' | 'quarterly' | 'semiannual' | 'annual'

export interface Equipment {
  id: string
  tag: string
  name: string
  description?: string
  status: EquipmentStatus
  criticality: Criticality
  location?: string
  functional_location?: string
  category?: string
  manufacturer?: string
  model?: string
  serial_number?: string
  install_date?: string
  warranty_end?: string
  created_at: string
  updated_at: string
}

export interface WorkOrder {
  id: string
  number: string
  title: string
  description?: string
  status: OrderStatus
  priority: OrderPriority
  type: OrderType
  equipment_id?: string
  equipment_tag?: string
  equipment_name?: string
  assigned_team?: string
  assigned_to?: string
  requester?: string
  planned_start?: string
  planned_end?: string
  actual_start?: string
  actual_end?: string
  estimated_hours?: number
  actual_hours?: number
  cost_estimated?: number
  cost_actual?: number
  notes?: string
  created_at: string
  updated_at: string
}

export interface PreventivePlan {
  id: string
  code: string
  title: string
  description?: string
  equipment_id: string
  equipment_tag: string
  equipment_name: string
  periodicity: Periodicity
  interval_days: number
  estimated_hours: number
  priority: OrderPriority
  criticality: Criticality
  last_execution?: string
  next_due: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface PreventiveSummary {
  weekly: { total: number; overdue: number; late: number; completed: number; scheduled: number }
  monthly: { total: number; overdue: number; late: number; completed: number; scheduled: number }
  quarterly: { total: number; overdue: number; late: number; completed: number; scheduled: number }
  semiannual: { total: number; overdue: number; late: number; completed: number; scheduled: number }
  annual: { total: number; overdue: number; late: number; completed: number; scheduled: number }
}

export interface InventoryItem {
  id: string
  code: string
  name: string
  description?: string
  category?: string
  unit: string
  quantity: number
  min_quantity: number
  max_quantity?: number
  location?: string
  supplier?: string
  unit_cost?: number
  created_at: string
  updated_at: string
}

export interface DashboardKPI {
  availability: number
  mtbf: number
  mttr: number
  oee: number
  sla: number
  backlog: number
  total_cost: number
  efficiency: number
  hours_worked: number
  equipments_operating: number
  equipments_stopped: number
  preventive_pending: number
  orders_open: number
  orders_completed: number
}

export interface Team {
  id: string
  name: string
  leader?: string
  members: number
  specialty?: string
  is_active: boolean
}

export interface Supplier {
  id: string
  name: string
  cnpj?: string
  contact?: string
  phone?: string
  email?: string
  category?: string
  is_active: boolean
}

export interface Contract {
  id: string
  number: string
  supplier_id: string
  supplier_name: string
  description: string
  start_date: string
  end_date: string
  value: number
  status: 'active' | 'expiring' | 'expired' | 'cancelled'
}

export interface AuditLog {
  id: string
  user: string
  action: string
  entity: string
  entity_id: string
  details?: string
  ip_address?: string
  created_at: string
}

export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'manager' | 'supervisor' | 'technician' | 'viewer'
  avatar?: string
  is_active: boolean
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'warning' | 'critical' | 'success'
  read: boolean
  created_at: string
}
