-- ============================================================
-- SGMI - Add company_id to profiles & enable anon access
-- Migration: 00003_profiles_company
-- ============================================================

-- Add company_id to profiles for multi-tenancy
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_profiles_company ON public.profiles(company_id);

-- Allow anon key to read/write for authenticated users
-- (Supabase anon key is used by the client after user login;
--  RLS policies already exist on all tables for SELECT for all authenticated users)

-- Enable anon key access to profiles for authenticated users
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.role() = 'authenticated');

-- Allow profile creation during signup
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Ensure the anon key can read companies
DROP POLICY IF EXISTS "Anyone can view companies" ON public.companies;
CREATE POLICY "Anyone can view companies"
  ON public.companies FOR SELECT
  USING (true);

-- Ensure the anon key can read equipments
DROP POLICY IF EXISTS "Users can view equipments" ON public.equipments;
CREATE POLICY "Users can view equipments"
  ON public.equipments FOR SELECT
  USING (true);

-- Teams, Suppliers: allow read for authenticated
DROP POLICY IF EXISTS "Users can view teams" ON public.teams;
CREATE POLICY "Users can view teams"
  ON public.teams FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Users can view suppliers" ON public.suppliers;
CREATE POLICY "Users can view suppliers"
  ON public.suppliers FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Users can view contracts" ON public.contracts;
CREATE POLICY "Users can view contracts"
  ON public.contracts FOR SELECT
  USING (true);

-- Inventory read access for authenticated
DROP POLICY IF EXISTS "Users can view inventory" ON public.inventory;
CREATE POLICY "Users can view inventory"
  ON public.inventory FOR SELECT
  USING (true);
