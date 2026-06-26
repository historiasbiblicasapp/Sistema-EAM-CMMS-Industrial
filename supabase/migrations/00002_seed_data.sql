-- ============================================================
-- SGMI - Seed Data
-- Migration: 00002_seed_data
-- ============================================================

-- Company
INSERT INTO public.companies (id, name, slug, is_active) VALUES
  ('00000000-0000-0000-0000-000000000001'::uuid, 'Indústria Metalúrgica S.A.', 'industria-metalurgica', true)
ON CONFLICT (id) DO NOTHING;

-- Equipments
INSERT INTO public.equipments (tag, name, status, criticality, location, functional_location, category, manufacturer, model, serial_number, install_date, warranty_end, company_id) VALUES
  ('MC-001', 'Compressor de Parafuso 75kW', 'operating', 'critical', 'Sala de Compressores', 'PROD-COMP', 'Compressores', 'Atlas Copco', 'GA75', 'AC-2024-001', '2024-01-15', '2027-01-15', '00000000-0000-0000-0000-000000000001'::uuid),
  ('TB-002', 'Torna Mecânica CNC', 'operating', 'high', 'Usinagem', 'PROD-USIN', 'Máquinas Operatrizes', 'Romi', 'GL-240', 'ROMI-2023-042', '2023-06-01', '2026-06-01', '00000000-0000-0000-0000-000000000001'::uuid),
  ('BT-003', 'Bomba Centrífuga 50HP', 'maintenance', 'high', 'Estação de Bombeamento', 'UTIL-AGUA', 'Bombas', 'KSB', 'MEGACPK', 'KSB-2024-018', '2024-03-10', '2027-03-10', '00000000-0000-0000-0000-000000000001'::uuid),
  ('TR-004', 'Transformador 500kVA', 'operating', 'critical', 'Subestação', 'UTIL-ELET', 'Transformadores', 'Siemens', 'GEAFOL', 'SIEM-2022-100', '2022-08-20', '2025-08-20', '00000000-0000-0000-0000-000000000001'::uuid),
  ('EH-005', 'Empilhadeira Elétrica 3t', 'operating', 'medium', 'Galpão Logístico', 'LOG-MOV', 'Empilhadeiras', 'Toyota', '3HBW30', 'TOY-2024-055', '2024-02-01', '2027-02-01', '00000000-0000-0000-0000-000000000001'::uuid),
  ('CL-006', 'Caldeira 10t/h', 'stopped', 'critical', 'Casa de Caldeiras', 'UTIL-VAP', 'Caldeiras', 'Cobrasma', 'CBR-10', 'COB-2019-088', '2019-11-15', '2022-11-15', '00000000-0000-0000-0000-000000000001'::uuid),
  ('MC-007', 'Moinho de Bolas', 'operating', 'high', 'Britagem', 'PROD-BRIT', 'Moinhos', 'Metso', 'MB-3240', 'MET-2023-031', '2023-09-01', '2026-09-01', '00000000-0000-0000-0000-000000000001'::uuid),
  ('TB-008', 'Prensa Hidráulica 200t', 'operating', 'medium', 'Prensagem', 'PROD-PREN', 'Prensas', 'Schuler', 'PHS-200', 'SCH-2024-012', '2024-01-20', '2027-01-20', '00000000-0000-0000-0000-000000000001'::uuid),
  ('BT-009', 'Bomba de Vácuo', 'operating', 'low', 'Sala de Utilidades', 'UTIL-GER', 'Bombas', 'Busch', 'COBRA', 'BUS-2023-077', '2023-11-05', '2026-11-05', '00000000-0000-0000-0000-000000000001'::uuid),
  ('TR-010', 'Chiller 150TR', 'broken', 'critical', 'Casa de Máquinas', 'UTIL-CLI', 'Chillers', 'Carrier', '30XW', 'CAR-2022-044', '2022-05-10', '2025-05-10', '00000000-0000-0000-0000-000000000001'::uuid);

-- Work Orders
INSERT INTO public.work_orders (company_id, number, title, description, equipment_id, priority, status, type, requester, assigned_team, planned_start, planned_end, estimated_hours)
SELECT '00000000-0000-0000-0000-000000000001'::uuid, 'OS-2026-001', 'Substituir Rolamentos Compressor MC-001', 'Troca de rolamentos do eixo principal', id, 'emergency'::order_priority, 'in_progress'::order_status, 'corrective'::order_type, 'João Silva', 'Mecânica', '2026-06-24', '2026-06-26', 8 FROM public.equipments WHERE tag = 'MC-001' AND company_id = '00000000-0000-0000-0000-000000000001'::uuid;

INSERT INTO public.work_orders (company_id, number, title, description, equipment_id, priority, status, type, requester, assigned_team, planned_start, planned_end, estimated_hours)
SELECT '00000000-0000-0000-0000-000000000001'::uuid, 'OS-2026-002', 'Rebobinamento Transformador TR-004', 'Rebobinar enrolamento primário', id, 'high'::order_priority, 'planned'::order_status, 'corrective'::order_type, 'Maria Santos', 'Elétrica', '2026-06-27', '2026-07-04', 40 FROM public.equipments WHERE tag = 'TR-004' AND company_id = '00000000-0000-0000-0000-000000000001'::uuid;

INSERT INTO public.work_orders (company_id, number, title, description, equipment_id, priority, status, type, requester, assigned_team, planned_start, planned_end, estimated_hours)
SELECT '00000000-0000-0000-0000-000000000001'::uuid, 'OS-2026-003', 'Lubrificação Geral Empilhadeira EH-005', 'Lubrificação mensal conforme manual', id, 'low'::order_priority, 'open'::order_status, 'lubrication'::order_type, 'Carlos Lima', 'Mecânica', '2026-06-26', '2026-06-26', 2 FROM public.equipments WHERE tag = 'EH-005' AND company_id = '00000000-0000-0000-0000-000000000001'::uuid;

INSERT INTO public.work_orders (company_id, number, title, description, equipment_id, priority, status, type, requester, assigned_team, planned_start, planned_end, estimated_hours)
SELECT '00000000-0000-0000-0000-000000000001'::uuid, 'OS-2026-004', 'Reparo Bomba BT-003', 'Vazamento no selo mecânico', id, 'high'::order_priority, 'in_progress'::order_status, 'corrective'::order_type, 'Ana Costa', 'Utilidades', '2026-06-23', '2026-06-27', 16 FROM public.equipments WHERE tag = 'BT-003' AND company_id = '00000000-0000-0000-0000-000000000001'::uuid;

INSERT INTO public.work_orders (company_id, number, title, description, equipment_id, priority, status, type, requester, assigned_team, planned_start, planned_end, estimated_hours)
SELECT '00000000-0000-0000-0000-000000000001'::uuid, 'OS-2026-005', 'Inspeção Anual Caldeira CL-006', 'Inspeção regulamentar NR-13', id, 'high'::order_priority, 'open'::order_status, 'inspection'::order_type, 'Pedro Souza', 'Utilidades', '2026-07-01', '2026-07-15', 24 FROM public.equipments WHERE tag = 'CL-006' AND company_id = '00000000-0000-0000-0000-000000000001'::uuid;

INSERT INTO public.work_orders (company_id, number, title, description, equipment_id, priority, status, type, requester, assigned_team, planned_start, planned_end, estimated_hours)
SELECT '00000000-0000-0000-0000-000000000001'::uuid, 'OS-2026-006', 'Manutenção Preventiva Moinho MC-007', 'Troca de revestimentos e lubrificação', id, 'medium'::order_priority, 'planned'::order_status, 'preventive'::order_type, 'João Silva', 'Mecânica', '2026-07-05', '2026-07-08', 24 FROM public.equipments WHERE tag = 'MC-007' AND company_id = '00000000-0000-0000-0000-000000000001'::uuid;

INSERT INTO public.work_orders (company_id, number, title, description, equipment_id, priority, status, type, requester, assigned_team, planned_start, planned_end, estimated_hours)
SELECT '00000000-0000-0000-0000-000000000001'::uuid, 'OS-2026-007', 'Alinhamento Prensa TB-008', 'Alinhamento dos cilindros hidráulicos', id, 'low'::order_priority, 'completed'::order_status, 'corrective'::order_type, 'Carlos Lima', 'Mecânica', '2026-06-20', '2026-06-21', 8 FROM public.equipments WHERE tag = 'TB-008' AND company_id = '00000000-0000-0000-0000-000000000001'::uuid;

INSERT INTO public.work_orders (company_id, number, title, description, equipment_id, priority, status, type, requester, assigned_team, planned_start, planned_end, estimated_hours)
SELECT '00000000-0000-0000-0000-000000000001'::uuid, 'OS-2026-008', 'Reparo Emergencial Chiller TR-010', 'Vazamento de refrigerante no circuito', id, 'emergency'::order_priority, 'completed'::order_status, 'corrective'::order_type, 'Ana Costa', 'Elétrica', '2026-06-19', '2026-06-19', 4 FROM public.equipments WHERE tag = 'TR-010' AND company_id = '00000000-0000-0000-0000-000000000001'::uuid;

-- Preventive Plans
INSERT INTO public.preventive_plans (company_id, code, title, description, equipment_id, periodicity, interval_days, estimated_hours, priority, criticality, last_execution, next_due, is_active)
SELECT '00000000-0000-0000-0000-000000000001'::uuid, 'PP-001', 'Lubrificação Mensal Compressores', 'Troca de óleo e lubrificação geral', id, 'monthly'::periodicity_type, 30, 4, 'medium'::order_priority, 'high'::criticality_level, '2026-05-20', '2026-06-20', true FROM public.equipments WHERE tag = 'MC-001' AND company_id = '00000000-0000-0000-0000-000000000001'::uuid;

INSERT INTO public.preventive_plans (company_id, code, title, description, equipment_id, periodicity, interval_days, estimated_hours, priority, criticality, last_execution, next_due, is_active)
SELECT '00000000-0000-0000-0000-000000000001'::uuid, 'PP-002', 'Manutenção Anual Transformadores', 'Ensaios elétricos e termografia', id, 'annual'::periodicity_type, 365, 8, 'medium'::order_priority, 'critical'::criticality_level, '2025-08-20', '2026-08-20', true FROM public.equipments WHERE tag = 'TR-004' AND company_id = '00000000-0000-0000-0000-000000000001'::uuid;

INSERT INTO public.preventive_plans (company_id, code, title, description, equipment_id, periodicity, interval_days, estimated_hours, priority, criticality, last_execution, next_due, is_active)
SELECT '00000000-0000-0000-0000-000000000001'::uuid, 'PP-003', 'Calibração Semanal Sensores', 'Calibração dos sensores de processo', id, 'weekly'::periodicity_type, 7, 1, 'low'::order_priority, 'medium'::criticality_level, '2026-06-22', '2026-06-29', true FROM public.equipments WHERE tag = 'MC-001' AND company_id = '00000000-0000-0000-0000-000000000001'::uuid;

INSERT INTO public.preventive_plans (company_id, code, title, description, equipment_id, periodicity, interval_days, estimated_hours, priority, criticality, last_execution, next_due, is_active)
SELECT '00000000-0000-0000-0000-000000000001'::uuid, 'PP-004', 'Inspeção Trimestral Bombas', 'Verificação de selos e acoplamentos', id, 'quarterly'::periodicity_type, 90, 4, 'medium'::order_priority, 'high'::criticality_level, '2026-03-10', '2026-06-30', true FROM public.equipments WHERE tag = 'BT-003' AND company_id = '00000000-0000-0000-0000-000000000001'::uuid;

INSERT INTO public.preventive_plans (company_id, code, title, description, equipment_id, periodicity, interval_days, estimated_hours, priority, criticality, last_execution, next_due, is_active)
SELECT '00000000-0000-0000-0000-000000000001'::uuid, 'PP-005', 'Troca de Óleo Semestral Empilhadeiras', 'Troca de óleo do motor e transmissão', id, 'semiannual'::periodicity_type, 180, 2, 'low'::order_priority, 'medium'::criticality_level, '2025-12-01', '2026-06-01', true FROM public.equipments WHERE tag = 'EH-005' AND company_id = '00000000-0000-0000-0000-000000000001'::uuid;

INSERT INTO public.preventive_plans (company_id, code, title, description, equipment_id, periodicity, interval_days, estimated_hours, priority, criticality, last_execution, next_due, is_active)
SELECT '00000000-0000-0000-0000-000000000001'::uuid, 'PP-006', 'Manutenção Preventiva Moinho', 'Troca de revestimentos e grelhas', id, 'monthly'::periodicity_type, 30, 16, 'medium'::order_priority, 'high'::criticality_level, '2026-05-25', '2026-06-25', true FROM public.equipments WHERE tag = 'MC-007' AND company_id = '00000000-0000-0000-0000-000000000001'::uuid;

INSERT INTO public.preventive_plans (company_id, code, title, description, equipment_id, periodicity, interval_days, estimated_hours, priority, criticality, last_execution, next_due, is_active)
SELECT '00000000-0000-0000-0000-000000000001'::uuid, 'PP-007', 'Verificação Anual Caldeira', 'Inspeção de segurança NR-13', id, 'annual'::periodicity_type, 365, 8, 'high'::order_priority, 'critical'::criticality_level, '2025-11-15', '2026-11-15', true FROM public.equipments WHERE tag = 'CL-006' AND company_id = '00000000-0000-0000-0000-000000000001'::uuid;

-- Inventory
INSERT INTO public.inventory (code, name, category, quantity, min_quantity, unit, location, supplier, company_id) VALUES
  ('RL-001', 'Rolamento SKF 6205', 'Rolamentos', 50, 10, 'un', 'A1-E01', 'SKF do Brasil', '00000000-0000-0000-0000-000000000001'::uuid),
  ('RL-002', 'Rolamento SKF 6310', 'Rolamentos', 12, 15, 'un', 'A1-E02', 'SKF do Brasil', '00000000-0000-0000-0000-000000000001'::uuid),
  ('VL-001', 'Correia V A-55', 'Correias', 8, 20, 'un', 'A2-E01', 'Gates do Brasil', '00000000-0000-0000-0000-000000000001'::uuid),
  ('FL-001', 'Filtro de Óleo Hidráulico', 'Filtros', 3, 10, 'un', 'A2-E02', 'Parker Hannifin', '00000000-0000-0000-0000-000000000001'::uuid),
  ('OL-001', 'Óleo Lubrificante ISO VG 46', 'Lubrificantes', 200, 50, 'L', 'A3-E01', 'Petrobras', '00000000-0000-0000-0000-000000000001'::uuid),
  ('OL-002', 'Graxa Lítio NLGI 2', 'Lubrificantes', 5, 10, 'kg', 'A3-E02', 'Mobil', '00000000-0000-0000-0000-000000000001'::uuid),
  ('PT-001', 'Parafuso Sextavado M12x40', 'Fixadores', 500, 100, 'un', 'A4-E01', 'Ciser', '00000000-0000-0000-0000-000000000001'::uuid),
  ('SL-001', 'Selo Mecânico 3/4"', 'Selos', 2, 5, 'un', 'A4-E02', 'John Crane', '00000000-0000-0000-0000-000000000001'::uuid);

-- Teams
INSERT INTO public.teams (name, leader, members, specialty, company_id) VALUES
  ('Mecânica', 'João Silva', 8, 'Mecânica Geral', '00000000-0000-0000-0000-000000000001'::uuid),
  ('Elétrica', 'Maria Santos', 6, 'Elétrica Industrial', '00000000-0000-0000-0000-000000000001'::uuid),
  ('Utilidades', 'Pedro Souza', 4, 'Utilidades e Caldeiras', '00000000-0000-0000-0000-000000000001'::uuid),
  ('Instrumentação', 'Ana Costa', 3, 'Instrumentação e Automação', '00000000-0000-0000-0000-000000000001'::uuid);

-- Suppliers
INSERT INTO public.suppliers (name, cnpj, contact, phone, email, category, company_id) VALUES
  ('SKF do Brasil', '45.987.654/0001-20', 'João Pereira', '(11) 99999-0001', 'joao@skf.com', 'Rolamentos', '00000000-0000-0000-0000-000000000001'::uuid),
  ('Parker Hannifin', '56.789.123/0001-00', 'Maria Oliveira', '(11) 99999-0002', 'maria@parker.com', 'Fluid Power', '00000000-0000-0000-0000-000000000001'::uuid),
  ('Atlas Copco', '67.890.234/0001-11', 'Carlos Lima', '(11) 99999-0003', 'carlos@atlascopco.com', 'Compressores', '00000000-0000-0000-0000-000000000001'::uuid),
  ('Siemens Brasil', '78.901.345/0001-22', 'Ana Costa', '(11) 99999-0004', 'ana@siemens.com', 'Automação', '00000000-0000-0000-0000-000000000001'::uuid);

-- Contracts
INSERT INTO public.contracts (number, supplier_id, description, value, start_date, end_date, status, company_id)
SELECT 'CT-2026-001', id, 'Fornecimento de Rolamentos', 150000, '2026-01-01'::date, '2026-12-31'::date, 'active'::contract_status, '00000000-0000-0000-0000-000000000001'::uuid
  FROM public.suppliers WHERE name = 'SKF do Brasil'
UNION ALL
SELECT 'CT-2026-002', id, 'Manutenção de Compressores', 250000, '2026-03-01'::date, '2027-02-28'::date, 'active'::contract_status, '00000000-0000-0000-0000-000000000001'::uuid
  FROM public.suppliers WHERE name = 'Atlas Copco'
UNION ALL
SELECT 'CT-2025-003', NULL, 'Fornecimento de Lubrificantes', 80000, '2025-06-01'::date, '2026-05-31'::date, 'expired'::contract_status, '00000000-0000-0000-0000-000000000001'::uuid
UNION ALL
SELECT 'CT-2026-004', NULL, 'Manutenção de Prensas', 180000, '2026-04-01'::date, '2026-09-30'::date, 'expiring'::contract_status, '00000000-0000-0000-0000-000000000001'::uuid;
