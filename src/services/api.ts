import { supabaseApi } from './supabase-api'
import { mockEquipments, mockWorkOrders, mockPreventivePlans, mockInventory, mockTeams, mockSuppliers, mockContracts, getDashboardKPI, getPreventiveSummary } from './mock-data'
import type { Equipment, WorkOrder, PreventivePlan, PreventiveSummary, Team, Supplier, Contract, DashboardKPI, InventoryItem } from '@/types'

// Fallback: try Supabase first, fall back to mock data if offline/no tables exist
async function withFallback<T>(fn: () => Promise<T>, fallback: () => T | Promise<T>): Promise<T> {
  try {
    return await fn()
  } catch {
    return await fallback()
  }
}

export const api = {
  getDashboardKPI: () => withFallback(
    () => supabaseApi.getDashboardKPI(),
    () => getDashboardKPI()
  ),
  getPreventiveSummary: () => withFallback(
    () => supabaseApi.getPreventiveSummary(),
    () => getPreventiveSummary()
  ),
  getEquipments: () => withFallback(
    () => supabaseApi.getEquipments(),
    () => mockEquipments
  ),
  getEquipment: (id: string) => withFallback(
    () => supabaseApi.getEquipment(id),
    () => mockEquipments.find((e) => e.id === id)!
  ),
  createEquipment: (data: Partial<Equipment>) => withFallback(
    () => supabaseApi.createEquipment(data),
    () => ({ id: String(Date.now()), ...data } as Equipment)
  ),
  updateEquipment: (id: string, data: Partial<Equipment>) => withFallback(
    () => supabaseApi.updateEquipment(id, data),
    () => ({ ...mockEquipments.find((e) => e.id === id), ...data } as Equipment)
  ),
  getWorkOrders: () => withFallback(
    () => supabaseApi.getWorkOrders(),
    () => mockWorkOrders
  ),
  getWorkOrder: (id: string) => withFallback(
    () => supabaseApi.getWorkOrder(id),
    () => mockWorkOrders.find((o) => o.id === id)!
  ),
  createWorkOrder: (data: Partial<WorkOrder>) => withFallback(
    () => supabaseApi.createWorkOrder(data),
    () => ({ id: String(Date.now()), ...data } as WorkOrder)
  ),
  getPreventivePlans: () => withFallback(
    () => supabaseApi.getPreventivePlans(),
    () => mockPreventivePlans
  ),
  getPreventivePlan: (id: string) => withFallback(
    () => supabaseApi.getPreventivePlan(id),
    () => mockPreventivePlans.find((p) => p.id === id)!
  ),
  getInventory: () => withFallback(
    () => supabaseApi.getInventory(),
    () => mockInventory
  ),
  getTeams: () => withFallback(
    () => supabaseApi.getTeams(),
    () => mockTeams
  ),
  getSuppliers: () => withFallback(
    () => supabaseApi.getSuppliers(),
    () => mockSuppliers
  ),
  getContracts: () => withFallback(
    () => supabaseApi.getContracts(),
    () => mockContracts
  ),
}
