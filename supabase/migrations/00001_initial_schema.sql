-- ============================================================
-- SGMI - Sistema de Gestao de Manutencao Industrial
-- Migration: 00001_initial_schema
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- ENUMS
-- ============================================================
CREATE TYPE equipment_status AS ENUM ('operating', 'available', 'stopped', 'broken', 'maintenance');
CREATE TYPE order_status AS ENUM ('open', 'planned', 'in_progress', 'completed', 'cancelled', 'blocked');
CREATE TYPE order_priority AS ENUM ('low', 'medium', 'high', 'emergency');
CREATE TYPE order_type AS ENUM ('corrective', 'preventive', 'predictive', 'lubrication', 'inspection');
CREATE TYPE criticality_level AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE periodicity_type AS ENUM ('weekly', 'monthly', 'quarterly', 'semiannual', 'annual');
CREATE TYPE user_role AS ENUM ('admin', 'manager', 'supervisor', 'technician', 'viewer');
CREATE TYPE contract_status AS ENUM ('active', 'expiring', 'expired', 'cancelled');

-- ============================================================
-- PROFILES (extends Supabase auth.users)
-- ============================================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'technician',
  avatar TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- ============================================================
-- COMPANIES (multi-tenant)
-- ============================================================
CREATE TABLE public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- EQUIPMENTS
-- ============================================================
CREATE TABLE public.equipments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  tag TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  status equipment_status NOT NULL DEFAULT 'available',
  criticality criticality_level NOT NULL DEFAULT 'medium',
  location TEXT,
  functional_location TEXT,
  category TEXT,
  manufacturer TEXT,
  model TEXT,
  serial_number TEXT,
  install_date DATE,
  warranty_end DATE,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(company_id, tag)
);

CREATE INDEX idx_equipments_company ON public.equipments(company_id);
CREATE INDEX idx_equipments_status ON public.equipments(status);
CREATE INDEX idx_equipments_tag ON public.equipments(tag);

ALTER TABLE public.equipments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view equipments from their company"
  ON public.equipments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_active = true
    )
  );

-- ============================================================
-- WORK ORDERS
-- ============================================================
CREATE TABLE public.work_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  number TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status order_status NOT NULL DEFAULT 'open',
  priority order_priority NOT NULL DEFAULT 'medium',
  type order_type NOT NULL DEFAULT 'corrective',
  equipment_id UUID REFERENCES public.equipments(id) ON DELETE SET NULL,
  assigned_team TEXT,
  assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  requester TEXT,
  planned_start TIMESTAMPTZ,
  planned_end TIMESTAMPTZ,
  actual_start TIMESTAMPTZ,
  actual_end TIMESTAMPTZ,
  estimated_hours NUMERIC(10,2),
  actual_hours NUMERIC(10,2),
  cost_estimated NUMERIC(12,2),
  cost_actual NUMERIC(12,2),
  notes TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(company_id, number)
);

CREATE INDEX idx_work_orders_company ON public.work_orders(company_id);
CREATE INDEX idx_work_orders_status ON public.work_orders(status);
CREATE INDEX idx_work_orders_equipment ON public.work_orders(equipment_id);
CREATE INDEX idx_work_orders_type ON public.work_orders(type);

ALTER TABLE public.work_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view work orders"
  ON public.work_orders FOR SELECT
  USING (true);

-- ============================================================
-- PREVENTIVE PLANS
-- ============================================================
CREATE TABLE public.preventive_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  equipment_id UUID NOT NULL REFERENCES public.equipments(id) ON DELETE CASCADE,
  periodicity periodicity_type NOT NULL DEFAULT 'monthly',
  interval_days INTEGER NOT NULL DEFAULT 30,
  estimated_hours NUMERIC(10,2) NOT NULL DEFAULT 1,
  priority order_priority NOT NULL DEFAULT 'medium',
  criticality criticality_level NOT NULL DEFAULT 'medium',
  last_execution DATE,
  next_due DATE NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(company_id, code)
);

CREATE INDEX idx_preventive_plans_company ON public.preventive_plans(company_id);
CREATE INDEX idx_preventive_plans_equipment ON public.preventive_plans(equipment_id);
CREATE INDEX idx_preventive_plans_next_due ON public.preventive_plans(next_due);

ALTER TABLE public.preventive_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view preventive plans"
  ON public.preventive_plans FOR SELECT
  USING (true);

-- ============================================================
-- INVENTORY
-- ============================================================
CREATE TABLE public.inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  unit TEXT NOT NULL DEFAULT 'UN',
  quantity NUMERIC(12,2) NOT NULL DEFAULT 0,
  min_quantity NUMERIC(12,2) NOT NULL DEFAULT 0,
  max_quantity NUMERIC(12,2),
  location TEXT,
  supplier TEXT,
  unit_cost NUMERIC(12,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(company_id, code)
);

CREATE INDEX idx_inventory_company ON public.inventory(company_id);
CREATE INDEX idx_inventory_category ON public.inventory(category);

ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view inventory"
  ON public.inventory FOR SELECT
  USING (true);

-- ============================================================
-- TEAMS
-- ============================================================
CREATE TABLE public.teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  leader TEXT,
  members INTEGER NOT NULL DEFAULT 0,
  specialty TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(company_id, name)
);

ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- SUPPLIERS
-- ============================================================
CREATE TABLE public.suppliers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  cnpj TEXT,
  contact TEXT,
  phone TEXT,
  email TEXT,
  category TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(company_id, name)
);

ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- CONTRACTS
-- ============================================================
CREATE TABLE public.contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  number TEXT NOT NULL,
  supplier_id UUID REFERENCES public.suppliers(id) ON DELETE SET NULL,
  description TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  value NUMERIC(14,2) NOT NULL DEFAULT 0,
  status contract_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(company_id, number)
);

ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- AUDIT LOG
-- ============================================================
CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_name TEXT,
  action TEXT NOT NULL,
  entity TEXT NOT NULL,
  entity_id TEXT,
  details TEXT,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_audit_logs_company ON public.audit_logs(company_id);
CREATE INDEX idx_audit_logs_created_at ON public.audit_logs(created_at);

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- NOTIFICATIONS
-- ============================================================
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info',
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_notifications_user ON public.notifications(user_id);
CREATE INDEX idx_notifications_read ON public.notifications(read);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications"
  ON public.notifications FOR ALL
  USING (auth.uid() = user_id);

-- ============================================================
-- FUNCTIONS
-- ============================================================

-- Auto-generate work order number
CREATE OR REPLACE FUNCTION public.generate_work_order_number()
RETURNS TEXT
LANGUAGE SQL
AS $$
  SELECT 'OS-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(
    (SELECT COALESCE(MAX(SPLIT_PART(number, '-', 3))::INTEGER, 0) + 1
     FROM public.work_orders
     WHERE number LIKE 'OS-' || TO_CHAR(NOW(), 'YYYY') || '-%')::TEXT, 3, '0'
  );
$$;

-- Auto-generate preventive plan code
CREATE OR REPLACE FUNCTION public.generate_preventive_code()
RETURNS TEXT
LANGUAGE SQL
AS $$
  SELECT 'PP-' || LPAD(
    (SELECT COALESCE(MAX(SPLIT_PART(code, '-', 2))::INTEGER, 0) + 1
     FROM public.preventive_plans)::TEXT, 3, '0'
  );
$$;

-- Update updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- ============================================================
-- TRIGGERS
-- ============================================================
CREATE TRIGGER update_equipments_updated_at
  BEFORE UPDATE ON public.equipments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_work_orders_updated_at
  BEFORE UPDATE ON public.work_orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_preventive_plans_updated_at
  BEFORE UPDATE ON public.preventive_plans
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_inventory_updated_at
  BEFORE UPDATE ON public.inventory
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ============================================================
-- SEED DATA (default company + admin user trigger)
-- ============================================================
INSERT INTO public.companies (id, name, slug) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Empresa Padrão', 'empresa-padrao');

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'technician')::user_role
  );
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
