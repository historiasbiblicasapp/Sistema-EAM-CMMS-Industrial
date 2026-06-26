import type { Equipment, WorkOrder, PreventivePlan, PreventiveSummary, InventoryItem, DashboardKPI, Team, Supplier, Contract } from '@/types'

export const mockEquipments: Equipment[] = [
  { id: '1', tag: 'MC-001', name: 'Compressor de Parafuso 75kW', status: 'operating', criticality: 'critical', location: 'Sala de Compressores', functional_location: 'PROD-COMP', category: 'Compressores', manufacturer: 'Atlas Copco', model: 'GA75', serial_number: 'AC-2024-001', install_date: '2024-01-15', warranty_end: '2027-01-15', created_at: '2024-01-15', updated_at: '2026-06-25' },
  { id: '2', tag: 'TB-002', name: 'Torna Mecânica CNC', status: 'operating', criticality: 'high', location: 'Usinagem', functional_location: 'PROD-USIN', category: 'Máquinas Operatrizes', manufacturer: 'Romi', model: 'GL-240', serial_number: 'ROMI-2023-042', install_date: '2023-06-01', warranty_end: '2026-06-01', created_at: '2023-06-01', updated_at: '2026-06-20' },
  { id: '3', tag: 'BT-003', name: 'Bomba Centrífuga 50HP', status: 'maintenance', criticality: 'high', location: 'Estação de Bombeamento', functional_location: 'UTIL-AGUA', category: 'Bombas', manufacturer: 'KSB', model: 'MEGACPK', serial_number: 'KSB-2024-018', install_date: '2024-03-10', warranty_end: '2027-03-10', created_at: '2024-03-10', updated_at: '2026-06-24' },
  { id: '4', tag: 'TR-004', name: 'Transformador 500kVA', status: 'operating', criticality: 'critical', location: 'Subestação', functional_location: 'UTIL-ELET', category: 'Transformadores', manufacturer: 'Siemens', model: 'GEAFOL', serial_number: 'SIEM-2022-100', install_date: '2022-08-20', warranty_end: '2025-08-20', created_at: '2022-08-20', updated_at: '2026-06-10' },
  { id: '5', tag: 'EH-005', name: 'Empilhadeira Elétrica 3t', status: 'operating', criticality: 'medium', location: 'Galpão Logístico', functional_location: 'LOG-MOV', category: 'Empilhadeiras', manufacturer: 'Toyota', model: '3HBW30', serial_number: 'TOY-2024-055', install_date: '2024-02-01', warranty_end: '2027-02-01', created_at: '2024-02-01', updated_at: '2026-06-22' },
  { id: '6', tag: 'CL-006', name: 'Caldeira 10t/h', status: 'stopped', criticality: 'critical', location: 'Casa de Caldeiras', functional_location: 'UTIL-VAP', category: 'Caldeiras', manufacturer: 'Cobrasma', model: 'CBR-10', serial_number: 'COB-2019-088', install_date: '2019-11-15', warranty_end: '2022-11-15', created_at: '2019-11-15', updated_at: '2026-06-23' },
  { id: '7', tag: 'MC-007', name: 'Moinho de Bolas', status: 'operating', criticality: 'high', location: 'Britagem', functional_location: 'PROD-BRIT', category: 'Moinhos', manufacturer: 'Metso', model: 'MB-3240', serial_number: 'MET-2023-031', install_date: '2023-09-01', warranty_end: '2026-09-01', created_at: '2023-09-01', updated_at: '2026-06-25' },
  { id: '8', tag: 'VN-008', name: 'Ventilador Axial 100k m³/h', status: 'operating', criticality: 'medium', location: 'Torre de Resfriamento', functional_location: 'UTIL-TORR', category: 'Ventiladores', manufacturer: 'Trane', model: 'TA-100', serial_number: 'TRA-2024-012', install_date: '2024-05-01', warranty_end: '2027-05-01', created_at: '2024-05-01', updated_at: '2026-06-24' },
  { id: '9', tag: 'TC-009', name: 'Transportador de Correia 200m', status: 'broken', criticality: 'high', location: 'Transferência', functional_location: 'PROD-TRANS', category: 'Transportadores', manufacturer: 'Fives', model: 'FC-200', serial_number: 'FIV-2020-044', install_date: '2020-04-10', warranty_end: '2023-04-10', created_at: '2020-04-10', updated_at: '2026-06-25' },
  { id: '10', tag: 'GE-010', name: 'Gerador Diesel 500kVA', status: 'available', criticality: 'critical', location: 'Casa de Geradores', functional_location: 'UTIL-GER', category: 'Geradores', manufacturer: 'Cummins', model: 'C500D5', serial_number: 'CUM-2023-076', install_date: '2023-12-01', warranty_end: '2026-12-01', created_at: '2023-12-01', updated_at: '2026-06-18' },
]

export const mockWorkOrders: WorkOrder[] = [
  { id: '1', number: 'OS-2026-001', title: 'Troca de Rolamentos Compressor', status: 'in_progress', priority: 'high', type: 'corrective', equipment_id: '1', equipment_tag: 'MC-001', equipment_name: 'Compressor de Parafuso 75kW', assigned_team: 'Mecânica', requester: 'João Silva', planned_start: '2026-06-24', planned_end: '2026-06-27', estimated_hours: 16, cost_estimated: 8500, created_at: '2026-06-24', updated_at: '2026-06-25' },
  { id: '2', number: 'OS-2026-002', title: 'Lubrificação Geral Linha 1', status: 'completed', priority: 'low', type: 'lubrication', equipment_id: '7', equipment_tag: 'MC-007', equipment_name: 'Moinho de Bolas', assigned_team: 'Lubrificação', requester: 'Carlos Santos', planned_start: '2026-06-20', planned_end: '2026-06-20', estimated_hours: 4, actual_hours: 3.5, cost_estimated: 1200, cost_actual: 980, created_at: '2026-06-19', updated_at: '2026-06-20' },
  { id: '3', number: 'OS-2026-003', title: 'Reparo Bomba Centrífuga', status: 'open', priority: 'emergency', type: 'corrective', equipment_id: '3', equipment_tag: 'BT-003', equipment_name: 'Bomba Centrífuga 50HP', assigned_team: 'Mecânica', requester: 'Maria Oliveira', planned_start: '2026-06-25', planned_end: '2026-06-26', estimated_hours: 8, cost_estimated: 3200, created_at: '2026-06-25', updated_at: '2026-06-25' },
  { id: '4', number: 'OS-2026-004', title: 'Inspeção Anual Caldeira', status: 'planned', priority: 'high', type: 'inspection', equipment_id: '6', equipment_tag: 'CL-006', equipment_name: 'Caldeira 10t/h', assigned_team: 'Inspeção', requester: 'Pedro Alves', planned_start: '2026-07-01', planned_end: '2026-07-05', estimated_hours: 40, cost_estimated: 15000, created_at: '2026-06-15', updated_at: '2026-06-15' },
  { id: '5', number: 'OS-2026-005', title: 'Substituição Correia Transportadora', status: 'blocked', priority: 'emergency', type: 'corrective', equipment_id: '9', equipment_tag: 'TC-009', equipment_name: 'Transportador de Correia 200m', assigned_team: 'Manutenção Geral', requester: 'Ana Costa', planned_start: '2026-06-26', planned_end: '2026-06-28', estimated_hours: 24, cost_estimated: 12000, created_at: '2026-06-25', updated_at: '2026-06-25' },
  { id: '6', number: 'OS-2026-006', title: 'Análise de Vibração Gerador', status: 'completed', priority: 'medium', type: 'predictive', equipment_id: '10', equipment_tag: 'GE-010', equipment_name: 'Gerador Diesel 500kVA', assigned_team: 'Preditiva', requester: 'Roberto Lima', planned_start: '2026-06-10', planned_end: '2026-06-10', estimated_hours: 3, actual_hours: 2.5, cost_estimated: 2500, cost_actual: 2100, created_at: '2026-06-08', updated_at: '2026-06-10' },
  { id: '7', number: 'OS-2026-007', title: 'Preventiva Mensal Transformador', status: 'open', priority: 'medium', type: 'preventive', equipment_id: '4', equipment_tag: 'TR-004', equipment_name: 'Transformador 500kVA', assigned_team: 'Elétrica', requester: 'Sistema', planned_start: '2026-06-28', planned_end: '2026-06-28', estimated_hours: 6, cost_estimated: 1800, created_at: '2026-06-01', updated_at: '2026-06-01' },
  { id: '8', number: 'OS-2026-008', title: 'Manutenção Preventiva Torno CNC', status: 'open', priority: 'medium', type: 'preventive', equipment_id: '2', equipment_tag: 'TB-002', equipment_name: 'Torna Mecânica CNC', assigned_team: 'Elétrica', requester: 'Sistema', planned_start: '2026-06-29', planned_end: '2026-06-29', estimated_hours: 8, cost_estimated: 2400, created_at: '2026-06-01', updated_at: '2026-06-01' },
  { id: '9', number: 'OS-2026-009', title: 'Troca de Óleo Empilhadeira', status: 'completed', priority: 'low', type: 'lubrication', equipment_id: '5', equipment_tag: 'EH-005', equipment_name: 'Empilhadeira Elétrica 3t', assigned_team: 'Lubrificação', requester: 'Sistema', planned_start: '2026-06-15', planned_end: '2026-06-15', estimated_hours: 2, actual_hours: 2, cost_estimated: 600, cost_actual: 540, created_at: '2026-06-01', updated_at: '2026-06-15' },
  { id: '10', number: 'OS-2026-010', title: 'Inspeção Termográfica Painéis', status: 'open', priority: 'low', type: 'inspection', assigned_team: 'Elétrica', requester: 'Lucas Martins', planned_start: '2026-07-02', planned_end: '2026-07-03', estimated_hours: 12, cost_estimated: 3600, created_at: '2026-06-20', updated_at: '2026-06-20' },
]

export const mockPreventivePlans: PreventivePlan[] = [
  { id: '1', code: 'PP-001', title: 'Preventiva Semanal Compressor', equipment_id: '1', equipment_tag: 'MC-001', equipment_name: 'Compressor de Parafuso 75kW', periodicity: 'weekly', interval_days: 7, estimated_hours: 2, priority: 'high', criticality: 'critical', next_due: '2026-06-28', is_active: true, created_at: '2024-01-15', updated_at: '2026-06-21' },
  { id: '2', code: 'PP-002', title: 'Preventiva Mensal Torno CNC', equipment_id: '2', equipment_tag: 'TB-002', equipment_name: 'Torna Mecânica CNC', periodicity: 'monthly', interval_days: 30, estimated_hours: 8, priority: 'medium', criticality: 'high', last_execution: '2026-05-28', next_due: '2026-06-28', is_active: true, created_at: '2023-06-01', updated_at: '2026-05-28' },
  { id: '3', code: 'PP-003', title: 'Preventiva Trimestral Bomba', equipment_id: '3', equipment_tag: 'BT-003', equipment_name: 'Bomba Centrífuga 50HP', periodicity: 'quarterly', interval_days: 90, estimated_hours: 6, priority: 'medium', criticality: 'high', last_execution: '2026-03-15', next_due: '2026-06-15', is_active: true, created_at: '2024-03-10', updated_at: '2026-03-15' },
  { id: '4', code: 'PP-004', title: 'Preventiva Semestral Transformador', equipment_id: '4', equipment_tag: 'TR-004', equipment_name: 'Transformador 500kVA', periodicity: 'semiannual', interval_days: 180, estimated_hours: 12, priority: 'high', criticality: 'critical', last_execution: '2025-12-20', next_due: '2026-06-20', is_active: true, created_at: '2022-08-20', updated_at: '2025-12-20' },
  { id: '5', code: 'PP-005', title: 'Preventiva Anual Caldeira', equipment_id: '6', equipment_tag: 'CL-006', equipment_name: 'Caldeira 10t/h', periodicity: 'annual', interval_days: 365, estimated_hours: 40, priority: 'high', criticality: 'critical', last_execution: '2025-06-01', next_due: '2026-06-01', is_active: true, created_at: '2019-11-15', updated_at: '2025-06-01' },
  { id: '6', code: 'PP-006', title: 'Lubrificação Mensal Moinho', equipment_id: '7', equipment_tag: 'MC-007', equipment_name: 'Moinho de Bolas', periodicity: 'monthly', interval_days: 30, estimated_hours: 3, priority: 'low', criticality: 'high', last_execution: '2026-06-01', next_due: '2026-07-01', is_active: true, created_at: '2023-09-01', updated_at: '2026-06-01' },
  { id: '7', code: 'PP-007', title: 'Preventiva Mensal Ventilador', equipment_id: '8', equipment_tag: 'VN-008', equipment_name: 'Ventilador Axial 100k m³/h', periodicity: 'monthly', interval_days: 30, estimated_hours: 2, priority: 'low', criticality: 'medium', last_execution: '2026-06-01', next_due: '2026-07-01', is_active: true, created_at: '2024-05-01', updated_at: '2026-06-01' },
  { id: '8', code: 'PP-008', title: 'Preventiva Semanal Gerador', equipment_id: '10', equipment_tag: 'GE-010', equipment_name: 'Gerador Diesel 500kVA', periodicity: 'weekly', interval_days: 7, estimated_hours: 1, priority: 'high', criticality: 'critical', last_execution: '2026-06-21', next_due: '2026-06-28', is_active: true, created_at: '2023-12-01', updated_at: '2026-06-21' },
  { id: '9', code: 'PP-009', title: 'Preventiva Mensal Empilhadeira', equipment_id: '5', equipment_tag: 'EH-005', equipment_name: 'Empilhadeira Elétrica 3t', periodicity: 'monthly', interval_days: 30, estimated_hours: 2, priority: 'low', criticality: 'medium', last_execution: '2026-06-01', next_due: '2026-07-01', is_active: true, created_at: '2024-02-01', updated_at: '2026-06-01' },
]

export const mockInventory: InventoryItem[] = [
  { id: '1', code: 'ROL-001', name: 'Rolamento SKF 6205-2Z', category: 'Rolamentos', unit: 'UN', quantity: 25, min_quantity: 10, max_quantity: 50, location: 'A-01-05', supplier: 'SKF', unit_cost: 45.90, created_at: '2024-01-01', updated_at: '2026-06-20' },
  { id: '2', code: 'COR-001', name: 'Correia V Perfil B-68', category: 'Correias', unit: 'UN', quantity: 8, min_quantity: 15, max_quantity: 30, location: 'A-02-03', supplier: 'Gates', unit_cost: 82.50, created_at: '2024-01-01', updated_at: '2026-06-18' },
  { id: '3', code: 'FIL-001', name: 'Filtro de Óleo FP-25', category: 'Filtros', unit: 'UN', quantity: 12, min_quantity: 20, max_quantity: 60, location: 'A-03-01', supplier: 'Mann-Filter', unit_cost: 35.00, created_at: '2024-01-01', updated_at: '2026-06-22' },
  { id: '4', code: 'OLE-001', name: 'Óleo Lubrificante ISO VG 68 (20L)', category: 'Lubrificantes', unit: 'LT', quantity: 80, min_quantity: 40, max_quantity: 200, location: 'B-01-10', supplier: 'Petrobras', unit_cost: 180.00, created_at: '2024-01-01', updated_at: '2026-06-25' },
  { id: '5', code: 'PAR-001', name: 'Parafuso Sextavado M12x50', category: 'Fixadores', unit: 'UN', quantity: 500, min_quantity: 100, max_quantity: 1000, location: 'C-01-01', unit_cost: 1.20, created_at: '2024-01-01', updated_at: '2026-06-20' },
  { id: '6', code: 'VEN-001', name: 'Vedante Mecânico 40mm', category: 'Vedantes', unit: 'UN', quantity: 3, min_quantity: 5, max_quantity: 15, location: 'A-01-08', supplier: 'John Crane', unit_cost: 320.00, created_at: '2024-01-01', updated_at: '2026-06-22' },
  { id: '7', code: 'MOT-001', name: 'Motor Elétrico 15CV 4P', category: 'Motores', unit: 'UN', quantity: 2, min_quantity: 1, max_quantity: 4, location: 'D-01-01', supplier: 'WEG', unit_cost: 4500.00, created_at: '2024-01-01', updated_at: '2026-06-15' },
  { id: '8', code: 'CAB-001', name: 'Cabo PP 4mm² (100m)', category: 'Cabos', unit: 'M', quantity: 300, min_quantity: 50, max_quantity: 500, location: 'C-02-05', supplier: 'Prysmian', unit_cost: 3.50, created_at: '2024-01-01', updated_at: '2026-06-20' },
]

export const mockTeams: Team[] = [
  { id: '1', name: 'Mecânica', leader: 'João Silva', members: 8, specialty: 'Manutenção Mecânica', is_active: true },
  { id: '2', name: 'Elétrica', leader: 'Maria Oliveira', members: 6, specialty: 'Manutenção Elétrica', is_active: true },
  { id: '3', name: 'Instrumentação', leader: 'Carlos Santos', members: 4, specialty: 'Instrumentação e Controle', is_active: true },
  { id: '4', name: 'Lubrificação', leader: 'Ana Costa', members: 3, specialty: 'Lubrificação Industrial', is_active: true },
  { id: '5', name: 'Inspeção', leader: 'Pedro Alves', members: 3, specialty: 'Inspeção de Equipamentos', is_active: true },
  { id: '6', name: 'Preditiva', leader: 'Roberto Lima', members: 2, specialty: 'Manutenção Preditiva', is_active: true },
]

export const mockSuppliers: Supplier[] = [
  { id: '1', name: 'SKF do Brasil', cnpj: '10.123.456/0001-00', contact: 'José Costa', phone: '(11) 3000-1234', email: 'vendas@skf.com.br', category: 'Rolamentos', is_active: true },
  { id: '2', name: 'WEG Equipamentos', cnpj: '20.234.567/0001-01', contact: 'Paulo Souza', phone: '(47) 3276-4000', email: 'comercial@weg.net', category: 'Motores', is_active: true },
  { id: '3', name: 'Petrobras Lubrificantes', cnpj: '30.345.678/0001-02', contact: 'Luciana Santos', phone: '(21) 3214-5000', email: 'lubrificantes@petrobras.com.br', category: 'Lubrificantes', is_active: true },
  { id: '4', name: 'Gates do Brasil', cnpj: '40.456.789/0001-03', contact: 'Ricardo Lima', phone: '(19) 3722-8000', email: 'vendas@gates.com.br', category: 'Correias', is_active: true },
  { id: '5', name: 'Atlas Copco', cnpj: '50.567.890/0001-04', contact: 'Fernando Alves', phone: '(15) 2101-3000', email: 'comercial@atlascopco.com', category: 'Compressores', is_active: true },
]

export const mockContracts: Contract[] = [
  { id: '1', number: 'CT-2026-001', supplier_id: '5', supplier_name: 'Atlas Copco', description: 'Contrato de Manutenção Compressores', start_date: '2026-01-01', end_date: '2026-12-31', value: 120000, status: 'active' },
  { id: '2', number: 'CT-2026-002', supplier_id: '2', supplier_name: 'WEG Equipamentos', description: 'Suporte Técnico Motores Elétricos', start_date: '2026-03-01', end_date: '2026-09-01', value: 45000, status: 'active' },
  { id: '3', number: 'CT-2025-003', supplier_id: '1', supplier_name: 'SKF do Brasil', description: 'Fornecimento de Rolamentos', start_date: '2025-06-01', end_date: '2026-06-01', value: 80000, status: 'expired' },
  { id: '4', number: 'CT-2026-004', supplier_id: '4', supplier_name: 'Gates do Brasil', description: 'Fornecimento de Correias', start_date: '2026-05-01', end_date: '2026-11-01', value: 35000, status: 'active' },
]

export function getDashboardKPI(): DashboardKPI {
  return {
    availability: 92.5,
    mtbf: 876,
    mttr: 4.2,
    oee: 85.3,
    sla: 94.1,
    backlog: 12,
    total_cost: 458900,
    efficiency: 87.8,
    hours_worked: 1840,
    equipments_operating: 6,
    equipments_stopped: 1,
    preventive_pending: 8,
    orders_open: 5,
    orders_completed: 3,
  }
}

export function getPreventiveSummary(): PreventiveSummary {
  return {
    weekly: { total: 4, overdue: 0, late: 0, completed: 2, scheduled: 2 },
    monthly: { total: 8, overdue: 1, late: 0, completed: 4, scheduled: 3 },
    quarterly: { total: 3, overdue: 1, late: 0, completed: 1, scheduled: 1 },
    semiannual: { total: 2, overdue: 1, late: 0, completed: 0, scheduled: 1 },
    annual: { total: 1, overdue: 1, late: 0, completed: 0, scheduled: 0 },
  }
}
