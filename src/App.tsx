import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Layout } from '@/components/layout/Layout'
import { Dashboard } from '@/pages/Dashboard'
import { Equipments } from '@/pages/Equipments'
import { WorkOrders } from '@/pages/WorkOrders'
import { PreventivePlans } from '@/pages/PreventivePlans'
import { Warehouse } from '@/pages/Warehouse'
import { Indicators } from '@/pages/Indicators'
import { Reports } from '@/pages/Reports'
import { Admin } from '@/pages/Admin'
import { Audit } from '@/pages/Audit'
import { Settings } from '@/pages/Settings'
import { Login } from '@/pages/Login'
import { useAuthStore } from '@/stores/auth-store'
import { useEffect } from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 30000, retry: 1 },
  },
})

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <>{children}</>
}

export default function App() {
  const { isAuthenticated } = useAuthStore()

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/equipamentos" element={<Equipments />} />
            <Route path="/ordens" element={<WorkOrders />} />
            <Route path="/preventivas" element={<PreventivePlans />} />
            <Route path="/almoxarifado" element={<Warehouse />} />
            <Route path="/compras" element={<div className="p-8 text-center text-muted-foreground">Módulo de Compras em desenvolvimento</div>} />
            <Route path="/contratos" element={<div className="p-8 text-center text-muted-foreground">Módulo de Contratos em desenvolvimento</div>} />
            <Route path="/fornecedores" element={<div className="p-8 text-center text-muted-foreground">Módulo de Fornecedores em desenvolvimento</div>} />
            <Route path="/equipes" element={<div className="p-8 text-center text-muted-foreground">Módulo de Equipes em desenvolvimento</div>} />
            <Route path="/indicadores" element={<Indicators />} />
            <Route path="/relatorios" element={<Reports />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/auditoria" element={<Audit />} />
            <Route path="/configuracoes" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
