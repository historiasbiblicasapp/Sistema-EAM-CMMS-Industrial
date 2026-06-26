import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const companies = [{ id: '00000000-0000-0000-0000-000000000001', name: 'Indústria Metalúrgica S.A.', cnpj: '12.345.678/0001-90', plan: 'enterprise', active: true }]

const profiles = [{ id: '00000000-0000-0000-0000-000000000002', email: 'admin@industria.com', name: 'Admin Sistema', role: 'admin', company_id: companies[0].id }]

const equipments = [
  { tag: 'MC-001', name: 'Compressor de Parafuso 75kW', status: 'operating', criticality: 'critical', location: 'Sala de Compressores', functional_location: 'PROD-COMP', category: 'Compressores', manufacturer: 'Atlas Copco', model: 'GA75', serial_number: 'AC-2024-001', install_date: '2024-01-15', warranty_end: '2027-01-15', company_id: companies[0].id },
  { tag: 'TB-002', name: 'Torna Mecânica CNC', status: 'operating', criticality: 'high', location: 'Usinagem', functional_location: 'PROD-USIN', category: 'Máquinas Operatrizes', manufacturer: 'Romi', model: 'GL-240', serial_number: 'ROMI-2023-042', install_date: '2023-06-01', warranty_end: '2026-06-01', company_id: companies[0].id },
  { tag: 'BT-003', name: 'Bomba Centrífuga 50HP', status: 'maintenance', criticality: 'high', location: 'Estação de Bombeamento', functional_location: 'UTIL-AGUA', category: 'Bombas', manufacturer: 'KSB', model: 'MEGACPK', serial_number: 'KSB-2024-018', install_date: '2024-03-10', warranty_end: '2027-03-10', company_id: companies[0].id },
  { tag: 'TR-004', name: 'Transformador 500kVA', status: 'operating', criticality: 'critical', location: 'Subestação', functional_location: 'UTIL-ELET', category: 'Transformadores', manufacturer: 'Siemens', model: 'GEAFOL', serial_number: 'SIEM-2022-100', install_date: '2022-08-20', warranty_end: '2025-08-20', company_id: companies[0].id },
  { tag: 'EH-005', name: 'Empilhadeira Elétrica 3t', status: 'operating', criticality: 'medium', location: 'Galpão Logístico', functional_location: 'LOG-MOV', category: 'Empilhadeiras', manufacturer: 'Toyota', model: '3HBW30', serial_number: 'TOY-2024-055', install_date: '2024-02-01', warranty_end: '2027-02-01', company_id: companies[0].id },
  { tag: 'CL-006', name: 'Caldeira 10t/h', status: 'stopped', criticality: 'critical', location: 'Casa de Caldeiras', functional_location: 'UTIL-VAP', category: 'Caldeiras', manufacturer: 'Cobrasma', model: 'CBR-10', serial_number: 'COB-2019-088', install_date: '2019-11-15', warranty_end: '2022-11-15', company_id: companies[0].id },
  { tag: 'MC-007', name: 'Moinho de Bolas', status: 'operating', criticality: 'high', location: 'Britagem', functional_location: 'PROD-BRIT', category: 'Moinhos', manufacturer: 'Metso', model: 'MB-3240', serial_number: 'MET-2023-031', install_date: '2023-09-01', warranty_end: '2026-09-01', company_id: companies[0].id },
  { tag: 'TB-008', name: 'Prensa Hidráulica 200t', status: 'operating', criticality: 'medium', location: 'Prensagem', functional_location: 'PROD-PREN', category: 'Prensas', manufacturer: 'Schuler', model: 'PHS-200', serial_number: 'SCH-2024-012', install_date: '2024-01-20', warranty_end: '2027-01-20', company_id: companies[0].id },
  { tag: 'BT-009', name: 'Bomba de Vácuo', status: 'operating', criticality: 'low', location: 'Sala de Utilidades', functional_location: 'UTIL-GER', category: 'Bombas', manufacturer: 'Busch', model: 'COBRA', serial_number: 'BUS-2023-077', install_date: '2023-11-05', warranty_end: '2026-11-05', company_id: companies[0].id },
  { tag: 'TR-010', name: 'Chiller 150TR', status: 'broken', criticality: 'critical', location: 'Casa de Máquinas', functional_location: 'UTIL-CLI', category: 'Chillers', manufacturer: 'Carrier', model: '30XW', serial_number: 'CAR-2022-044', install_date: '2022-05-10', warranty_end: '2025-05-10', company_id: companies[0].id },
]

const workOrders = [
  { title: 'Substituir Rolamentos Compressor MC-001', description: 'Troca de rolamentos do eixo principal', equipment_tag: 'MC-001', priority: 'emergency', status: 'in_progress', type: 'corrective', reported_by: 'João Silva', assigned_team: 'Mecânica', start_date: '2026-06-24', due_date: '2026-06-26', estimated_hours: 8, company_id: companies[0].id },
  { title: 'Rebobinamento Transformador TR-004', description: 'Rebobinar enrolamento primário', equipment_tag: 'TR-004', priority: 'high', status: 'planned', type: 'corrective', reported_by: 'Maria Santos', assigned_team: 'Elétrica', start_date: '2026-06-27', due_date: '2026-07-04', estimated_hours: 40, company_id: companies[0].id },
  { title: 'Lubrificação Geral Empilhadeira EH-005', description: 'Lubrificação mensal conforme manual', equipment_tag: 'EH-005', priority: 'low', status: 'open', type: 'lubrication', reported_by: 'Carlos Lima', assigned_team: 'Mecânica', start_date: '2026-06-26', due_date: '2026-06-26', estimated_hours: 2, company_id: companies[0].id },
  { title: 'Reparo Bomba BT-003', description: 'Vazamento no selo mecânico', equipment_tag: 'BT-003', priority: 'high', status: 'in_progress', type: 'corrective', reported_by: 'Ana Costa', assigned_team: 'Utilidades', start_date: '2026-06-23', due_date: '2026-06-27', estimated_hours: 16, company_id: companies[0].id },
  { title: 'Inspeção Anual Caldeira CL-006', description: 'Inspeção regulamentar NR-13', equipment_tag: 'CL-006', priority: 'high', status: 'open', type: 'inspection', reported_by: 'Pedro Souza', assigned_team: 'Utilidades', start_date: '2026-07-01', due_date: '2026-07-15', estimated_hours: 24, company_id: companies[0].id },
  { title: 'Manutenção Preventiva Moinho MC-007', description: 'Troca de revestimentos e lubrificação', equipment_tag: 'MC-007', priority: 'medium', status: 'planned', type: 'preventive', reported_by: 'João Silva', assigned_team: 'Mecânica', start_date: '2026-07-05', due_date: '2026-07-08', estimated_hours: 24, company_id: companies[0].id },
  { title: 'Alinhamento Prensa TB-008', description: 'Alinhamento dos cilindros hidráulicos', equipment_tag: 'TB-008', priority: 'low', status: 'completed', type: 'corrective', reported_by: 'Carlos Lima', assigned_team: 'Mecânica', start_date: '2026-06-20', due_date: '2026-06-21', estimated_hours: 8, company_id: companies[0].id },
  { title: 'Reparo Emergencial Chiller TR-010', description: 'Vazamento de refrigerante no circuito', equipment_tag: 'TR-010', priority: 'emergency', status: 'completed', type: 'corrective', reported_by: 'Ana Costa', assigned_team: 'Elétrica', start_date: '2026-06-19', due_date: '2026-06-19', estimated_hours: 4, company_id: companies[0].id },
]

const preventivePlans = [
  { title: 'Lubrificação Mensal Compressores', description: 'Troca de óleo e lubrificação geral', periodicity: 'monthly', status: 'active', equipment_tag: 'MC-001', responsible_team: 'Mecânica', last_execution: '2026-05-20', next_due: '2026-06-20', days_remaining: -5, company_id: companies[0].id },
  { title: 'Manutenção Anual Transformadores', description: 'Ensaios elétricos e termografia', periodicity: 'annual', status: 'active', equipment_tag: 'TR-004', responsible_team: 'Elétrica', last_execution: '2025-08-20', next_due: '2026-08-20', days_remaining: 55, company_id: companies[0].id },
  { title: 'Calibração Semanal Sensores', description: 'Calibração dos sensores de processo', periodicity: 'weekly', status: 'active', equipment_tag: 'MC-001', responsible_team: 'Instrumentação', last_execution: '2026-06-22', next_due: '2026-06-29', days_remaining: 3, company_id: companies[0].id },
  { title: 'Inspeção Trimestral Bombas', description: 'Verificação de selos e acoplamentos', periodicity: 'quarterly', status: 'active', equipment_tag: 'BT-003', responsible_team: 'Utilidades', last_execution: '2026-03-10', next_due: '2026-06-30', days_remaining: 4, company_id: companies[0].id },
  { title: 'Troca de Óleo Semestral Empilhadeiras', description: 'Troca de óleo do motor e transmissão', periodicity: 'semiannual', status: 'active', equipment_tag: 'EH-005', responsible_team: 'Mecânica', last_execution: '2025-12-01', next_due: '2026-06-01', days_remaining: -24, company_id: companies[0].id },
  { title: 'Manutenção Preventiva Moinho', description: 'Troca de revestimentos e grelhas', periodicity: 'monthly', status: 'active', equipment_tag: 'MC-007', responsible_team: 'Mecânica', last_execution: '2026-05-25', next_due: '2026-06-25', days_remaining: 0, company_id: companies[0].id },
  { title: 'Verificação Anual Caldeira', description: 'Inspeção de segurança NR-13', periodicity: 'annual', status: 'active', equipment_tag: 'CL-006', responsible_team: 'Utilidades', last_execution: '2025-11-15', next_due: '2026-11-15', days_remaining: 142, company_id: companies[0].id },
]

const inventoryItems = [
  { code: 'RL-001', name: 'Rolamento SKF 6205', category: 'Rolamentos', quantity: 50, min_stock: 10, unit: 'un', location: 'A1-E01', supplier: 'SKF do Brasil', company_id: companies[0].id },
  { code: 'RL-002', name: 'Rolamento SKF 6310', category: 'Rolamentos', quantity: 12, min_stock: 15, unit: 'un', location: 'A1-E02', supplier: 'SKF do Brasil', company_id: companies[0].id },
  { code: 'VL-001', name: 'Correia V A-55', category: 'Correias', quantity: 8, min_stock: 20, unit: 'un', location: 'A2-E01', supplier: 'Gates do Brasil', company_id: companies[0].id },
  { code: 'FL-001', name: 'Filtro de Óleo Hidráulico', category: 'Filtros', quantity: 3, min_stock: 10, unit: 'un', location: 'A2-E02', supplier: 'Parker Hannifin', company_id: companies[0].id },
  { code: 'OL-001', name: 'Óleo Lubrificante ISO VG 46', category: 'Lubrificantes', quantity: 200, min_stock: 50, unit: 'L', location: 'A3-E01', supplier: 'Petrobras', company_id: companies[0].id },
  { code: 'OL-002', name: 'Graxa Lítio NLGI 2', category: 'Lubrificantes', quantity: 5, min_stock: 10, unit: 'kg', location: 'A3-E02', supplier: 'Mobil', company_id: companies[0].id },
  { code: 'PT-001', name: 'Parafuso Sextavado M12x40', category: 'Fixadores', quantity: 500, min_stock: 100, unit: 'un', location: 'A4-E01', supplier: 'Ciser', company_id: companies[0].id },
  { code: 'SL-001', name: 'Selo Mecânico 3/4"', category: 'Selos', quantity: 2, min_stock: 5, unit: 'un', location: 'A4-E02', supplier: 'John Crane', company_id: companies[0].id },
]

const teams = [
  { name: 'Mecânica', leader: 'João Silva', members: 8, specialty: 'Mecânica Geral', company_id: companies[0].id },
  { name: 'Elétrica', leader: 'Maria Santos', members: 6, specialty: 'Elétrica Industrial', company_id: companies[0].id },
  { name: 'Utilidades', leader: 'Pedro Souza', members: 4, specialty: 'Utilidades e Caldeiras', company_id: companies[0].id },
  { name: 'Instrumentação', leader: 'Ana Costa', members: 3, specialty: 'Instrumentação e Automação', company_id: companies[0].id },
]

const suppliers = [
  { name: 'SKF do Brasil', cnpj: '45.987.654/0001-20', contact: 'João Pereira', phone: '(11) 99999-0001', email: 'joao@skf.com', category: 'Rolamentos', company_id: companies[0].id },
  { name: 'Parker Hannifin', cnpj: '56.789.123/0001-00', contact: 'Maria Oliveira', phone: '(11) 99999-0002', email: 'maria@parker.com', category: 'Fluid Power', company_id: companies[0].id },
  { name: 'Atlas Copco', cnpj: '67.890.234/0001-11', contact: 'Carlos Lima', phone: '(11) 99999-0003', email: 'carlos@atlascopco.com', category: 'Compressores', company_id: companies[0].id },
  { name: 'Siemens Brasil', cnpj: '78.901.345/0001-22', contact: 'Ana Costa', phone: '(11) 99999-0004', email: 'ana@siemens.com', category: 'Automação', company_id: companies[0].id },
]

const contracts = [
  { number: 'CT-2026-001', supplier_name: 'SKF do Brasil', service_description: 'Fornecimento de Rolamentos', value: 150000, start_date: '2026-01-01', end_date: '2026-12-31', status: 'active', company_id: companies[0].id },
  { number: 'CT-2026-002', supplier_name: 'Atlas Copco', service_description: 'Manutenção de Compressores', value: 250000, start_date: '2026-03-01', end_date: '2027-02-28', status: 'active', company_id: companies[0].id },
  { number: 'CT-2025-003', supplier_name: 'Petrobras', service_description: 'Fornecimento de Lubrificantes', value: 80000, start_date: '2025-06-01', end_date: '2026-05-31', status: 'expired', company_id: companies[0].id },
  { number: 'CT-2026-004', supplier_name: 'Schuler Brasil', service_description: 'Manutenção de Prensas', value: 180000, start_date: '2026-04-01', end_date: '2026-09-30', status: 'expiring', company_id: companies[0].id },
]

async function seed() {
  console.log('🚀 Seeding Supabase...\n')

  const { error: cErr } = await supabase.from('companies').upsert(companies, { onConflict: 'id' })
  if (cErr) { console.error('Companies:', cErr.message); return }
  console.log('✅ Companies inserted')

  const { error: pErr } = await supabase.from('profiles').upsert(profiles, { onConflict: 'id' })
  if (pErr) { console.error('Profiles:', pErr.message); return }
  console.log('✅ Profiles inserted')

  const { error: eErr } = await supabase.from('equipments').upsert(equipments, { onConflict: 'id', ignoreDuplicates: false })
  if (eErr) { console.error('Equipments:', eErr.message); return }
  console.log('✅ Equipments inserted')

  const { error: wErr } = await supabase.from('work_orders').upsert(workOrders, { onConflict: 'id', ignoreDuplicates: false })
  if (wErr) { console.error('Work Orders:', wErr.message); return }
  console.log('✅ Work Orders inserted')

  const { error: ppErr } = await supabase.from('preventive_plans').upsert(preventivePlans, { onConflict: 'id', ignoreDuplicates: false })
  if (ppErr) { console.error('Preventive Plans:', ppErr.message); return }
  console.log('✅ Preventive Plans inserted')

  const { error: iErr } = await supabase.from('inventory').upsert(inventoryItems, { onConflict: 'id', ignoreDuplicates: false })
  if (iErr) { console.error('Inventory:', iErr.message); return }
  console.log('✅ Inventory inserted')

  const { error: tErr } = await supabase.from('teams').upsert(teams, { onConflict: 'id', ignoreDuplicates: false })
  if (tErr) { console.error('Teams:', tErr.message); return }
  console.log('✅ Teams inserted')

  const { error: sErr } = await supabase.from('suppliers').upsert(suppliers, { onConflict: 'id', ignoreDuplicates: false })
  if (sErr) { console.error('Suppliers:', sErr.message); return }
  console.log('✅ Suppliers inserted')

  const { error: ctErr } = await supabase.from('contracts').upsert(contracts, { onConflict: 'id', ignoreDuplicates: false })
  if (ctErr) { console.error('Contracts:', ctErr.message); return }
  console.log('✅ Contracts inserted')

  console.log('\n🎉 Seed complete!')
}

seed().catch(console.error)
