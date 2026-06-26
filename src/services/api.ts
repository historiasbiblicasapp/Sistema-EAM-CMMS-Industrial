import { mockEquipments, mockWorkOrders, mockPreventivePlans, mockInventory, mockTeams, mockSuppliers, mockContracts, getDashboardKPI, getPreventiveSummary } from './mock-data'
import type { Equipment, WorkOrder, PreventivePlan, InventoryItem, DashboardKPI, PreventiveSummary, Team, Supplier, Contract } from '@/types'

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

async function simulatedFetch<T>(data: T, ms = 300): Promise<T> {
  await delay(ms)
  return data
}

export const api = {
  // Dashboard
  getDashboardKPI: () => simulatedFetch(getDashboardKPI()),
  getPreventiveSummary: () => simulatedFetch(getPreventiveSummary()),

  // Equipments
  getEquipments: () => simulatedFetch(mockEquipments),
  getEquipment: (id: string) => simulatedFetch(mockEquipments.find((e) => e.id === id)!),
  createEquipment: (data: Partial<Equipment>) => simulatedFetch({ id: String(Date.now()), ...data } as Equipment),
  updateEquipment: (id: string, data: Partial<Equipment>) => simulatedFetch({ ...mockEquipments.find((e) => e.id === id), ...data } as Equipment),

  // Work Orders
  getWorkOrders: () => simulatedFetch(mockWorkOrders),
  getWorkOrder: (id: string) => simulatedFetch(mockWorkOrders.find((o) => o.id === id)!),
  createWorkOrder: (data: Partial<WorkOrder>) => simulatedFetch({ id: String(Date.now()), ...data } as WorkOrder),

  // Preventive Plans
  getPreventivePlans: () => simulatedFetch(mockPreventivePlans),
  getPreventivePlan: (id: string) => simulatedFetch(mockPreventivePlans.find((p) => p.id === id)!),

  // Inventory
  getInventory: () => simulatedFetch(mockInventory),

  // Teams
  getTeams: () => simulatedFetch(mockTeams),

  // Suppliers
  getSuppliers: () => simulatedFetch(mockSuppliers),

  // Contracts
  getContracts: () => simulatedFetch(mockContracts),
}
