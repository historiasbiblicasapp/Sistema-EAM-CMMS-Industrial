import { supabase } from '@/lib/supabase'
import type {
  Equipment, WorkOrder, PreventivePlan, PreventiveSummary,
  InventoryItem, DashboardKPI, Team, Supplier, Contract,
} from '@/types'

function mapEquipment(row: any): Equipment {
  return {
    id: row.id,
    tag: row.tag,
    name: row.name,
    description: row.description,
    status: row.status,
    criticality: row.criticality,
    location: row.location,
    functional_location: row.functional_location,
    category: row.category,
    manufacturer: row.manufacturer,
    model: row.model,
    serial_number: row.serial_number,
    install_date: row.install_date,
    warranty_end: row.warranty_end,
    created_at: row.created_at,
    updated_at: row.updated_at,
  }
}

function mapWorkOrder(row: any): WorkOrder {
  return {
    id: row.id,
    number: row.number,
    title: row.title,
    description: row.description,
    status: row.status,
    priority: row.priority,
    type: row.type,
    equipment_id: row.equipment_id,
    equipment_tag: row.equipments?.tag,
    equipment_name: row.equipments?.name,
    assigned_team: row.assigned_team,
    assigned_to: row.assigned_to,
    requester: row.requester,
    planned_start: row.planned_start,
    planned_end: row.planned_end,
    actual_start: row.actual_start,
    actual_end: row.actual_end,
    estimated_hours: row.estimated_hours,
    actual_hours: row.actual_hours,
    cost_estimated: row.cost_estimated,
    cost_actual: row.cost_actual,
    notes: row.notes,
    created_at: row.created_at,
    updated_at: row.updated_at,
  }
}

function mapPreventivePlan(row: any): PreventivePlan {
  return {
    id: row.id,
    code: row.code,
    title: row.title,
    description: row.description,
    equipment_id: row.equipment_id,
    equipment_tag: row.equipments?.tag,
    equipment_name: row.equipments?.name,
    periodicity: row.periodicity,
    interval_days: row.interval_days,
    estimated_hours: row.estimated_hours,
    priority: row.priority,
    criticality: row.criticality,
    last_execution: row.last_execution,
    next_due: row.next_due,
    is_active: row.is_active,
    created_at: row.created_at,
    updated_at: row.updated_at,
  }
}

function mapInventory(row: any): InventoryItem {
  return {
    id: row.id,
    code: row.code,
    name: row.name,
    description: row.description,
    category: row.category,
    unit: row.unit,
    quantity: row.quantity,
    min_quantity: row.min_quantity,
    max_quantity: row.max_quantity,
    location: row.location,
    supplier: row.supplier,
    unit_cost: row.unit_cost,
    created_at: row.created_at,
    updated_at: row.updated_at,
  }
}

function mapTeam(row: any): Team {
  return {
    id: row.id,
    name: row.name,
    leader: row.leader,
    members: row.members,
    specialty: row.specialty,
    is_active: row.is_active,
  }
}

function mapSupplier(row: any): Supplier {
  return {
    id: row.id,
    name: row.name,
    cnpj: row.cnpj,
    contact: row.contact,
    phone: row.phone,
    email: row.email,
    category: row.category,
    is_active: row.is_active,
  }
}

function mapContract(row: any): Contract {
  return {
    id: row.id,
    number: row.number,
    supplier_id: row.supplier_id,
    supplier_name: row.suppliers?.name,
    description: row.description,
    start_date: row.start_date,
    end_date: row.end_date,
    value: row.value,
    status: row.status,
  }
}

export const supabaseApi = {
  // Dashboard
  async getDashboardKPI(): Promise<DashboardKPI> {
    const { data: equipments } = await supabase.from('equipments').select('id, status')
    const { data: orders } = await supabase.from('work_orders').select('id, status, cost_actual, actual_hours')
    const { data: plans } = await supabase.from('preventive_plans').select('id, next_due').eq('is_active', true)

    const total = equipments?.length || 0
    const operating = equipments?.filter((e) => e.status === 'operating').length || 0
    const stopped = equipments?.filter((e) => e.status === 'stopped').length || 0
    const openOrders = orders?.filter((o) => o.status === 'open' || o.status === 'in_progress').length || 0
    const completedOrders = orders?.filter((o) => o.status === 'completed').length || 0
    const totalCost = orders?.reduce((sum, o) => sum + Number(o.cost_actual || 0), 0) || 0
    const totalHours = orders?.reduce((sum, o) => sum + Number(o.actual_hours || 0), 0) || 0
    const overduePlans = plans?.filter((p) => new Date(p.next_due) < new Date()).length || 0

    return {
      availability: total > 0 ? Math.round(((total - stopped) / total) * 1000) / 10 : 0,
      mtbf: 876,
      mttr: 4.2,
      oee: 85.3,
      sla: 94.1,
      backlog: openOrders,
      total_cost: totalCost,
      efficiency: 87.8,
      hours_worked: totalHours,
      equipments_operating: operating,
      equipments_stopped: stopped,
      preventive_pending: overduePlans,
      orders_open: openOrders,
      orders_completed: completedOrders,
    }
  },

  async getPreventiveSummary(): Promise<PreventiveSummary> {
    const { data: plans } = await supabase.from('preventive_plans').select('periodicity, next_due, last_execution').eq('is_active', true)

    const now = new Date()
    const summarize = (periodicity: string) => {
      const filtered = plans?.filter((p) => p.periodicity === periodicity) || []
      const total = filtered.length
      const overdue = filtered.filter((p) => new Date(p.next_due) < now).length
      const completed = filtered.filter((p) => p.last_execution).length
      const scheduled = total - overdue - completed
      return { total, overdue, late: 0, completed, scheduled: Math.max(0, scheduled) }
    }

    return {
      weekly: summarize('weekly'),
      monthly: summarize('monthly'),
      quarterly: summarize('quarterly'),
      semiannual: summarize('semiannual'),
      annual: summarize('annual'),
    }
  },

  // Equipments
  async getEquipments(): Promise<Equipment[]> {
    const { data } = await supabase.from('equipments').select('*').order('created_at', { ascending: false })
    return (data || []).map(mapEquipment)
  },

  async getEquipment(id: string): Promise<Equipment> {
    const { data } = await supabase.from('equipments').select('*').eq('id', id).single()
    return mapEquipment(data)
  },

  async createEquipment(input: Partial<Equipment>): Promise<Equipment> {
    const { data } = await supabase.from('equipments').insert(input).select().single()
    return mapEquipment(data)
  },

  async updateEquipment(id: string, input: Partial<Equipment>): Promise<Equipment> {
    const { data } = await supabase.from('equipments').update(input).eq('id', id).select().single()
    return mapEquipment(data)
  },

  // Work Orders
  async getWorkOrders(): Promise<WorkOrder[]> {
    const { data } = await supabase
      .from('work_orders')
      .select('*, equipments!work_orders_equipment_id_fkey(tag, name)')
      .order('created_at', { ascending: false })
    return (data || []).map(mapWorkOrder)
  },

  async getWorkOrder(id: string): Promise<WorkOrder> {
    const { data } = await supabase
      .from('work_orders')
      .select('*, equipments!work_orders_equipment_id_fkey(tag, name)')
      .eq('id', id)
      .single()
    return mapWorkOrder(data)
  },

  async createWorkOrder(input: Partial<WorkOrder>): Promise<WorkOrder> {
    const { data } = await supabase.from('work_orders').insert(input).select().single()
    return mapWorkOrder(data)
  },

  // Preventive Plans
  async getPreventivePlans(): Promise<PreventivePlan[]> {
    const { data } = await supabase
      .from('preventive_plans')
      .select('*, equipments!preventive_plans_equipment_id_fkey(tag, name)')
      .order('next_due', { ascending: true })
    return (data || []).map(mapPreventivePlan)
  },

  async getPreventivePlan(id: string): Promise<PreventivePlan> {
    const { data } = await supabase
      .from('preventive_plans')
      .select('*, equipments!preventive_plans_equipment_id_fkey(tag, name)')
      .eq('id', id)
      .single()
    return mapPreventivePlan(data)
  },

  // Inventory
  async getInventory(): Promise<InventoryItem[]> {
    const { data } = await supabase.from('inventory').select('*').order('name')
    return (data || []).map(mapInventory)
  },

  // Teams
  async getTeams(): Promise<Team[]> {
    const { data } = await supabase.from('teams').select('*').order('name')
    return (data || []).map(mapTeam)
  },

  // Suppliers
  async getSuppliers(): Promise<Supplier[]> {
    const { data } = await supabase.from('suppliers').select('*').order('name')
    return (data || []).map(mapSupplier)
  },

  // Contracts
  async getContracts(): Promise<Contract[]> {
    const { data } = await supabase
      .from('contracts')
      .select('*, suppliers!contracts_supplier_id_fkey(name)')
      .order('start_date', { ascending: false })
    return (data || []).map(mapContract)
  },
}
