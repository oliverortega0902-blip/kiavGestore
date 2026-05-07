import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Calendar, Boxes, Users, UserCircle, FileText, Search, 
  Plus, Bell, TrendingUp, AlertTriangle, CheckCircle2, Mail, Briefcase, 
  Phone, ShieldCheck, MapPin, Clock, Activity, Filter, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section, EventService, InventoryItem, Employee, Client, Invoice } from './types';
import { eventsAPI, inventoryAPI, employeesAPI, clientsAPI, invoicesAPI } from './api';

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('events');
  const [searchQuery, setSearchQuery] = useState('');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard': return <DashboardOverview />;
      case 'events': return <EventsList />;
      case 'inventory': return <InventoryList />;
      case 'employees': return <EmployeeList />;
      case 'clients': return <ClientList />;
      case 'finances': return <FinancesSection />;
      default: return <div className="p-8 text-center text-text-muted italic">Sección en desarrollo...</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-bg-deep text-text-main font-sans selection:bg-primary/30">
      {/* Sidebar */}
      <aside className="w-[260px] bg-bg-sidebar text-text-main flex flex-col fixed h-full z-20 border-r border-border">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-black tracking-tighter text-white">
              K-<span className="text-primary">DAILY</span>
            </h2>
          </div>
          <nav className="space-y-1.5">
            <NavItem icon={<LayoutDashboard className="w-5 h-5" />} label="Dashboard" active={activeSection === 'dashboard'} onClick={() => setActiveSection('dashboard')} />
            <NavItem icon={<Calendar className="w-5 h-5" />} label="Eventos" active={activeSection === 'events'} onClick={() => setActiveSection('events')} />
            <NavItem icon={<Boxes className="w-5 h-5" />} label="Inventario" active={activeSection === 'inventory'} onClick={() => setActiveSection('inventory')} />
            <NavItem icon={<Users className="w-5 h-5" />} label="Empleados" active={activeSection === 'employees'} onClick={() => setActiveSection('employees')} />
            <NavItem icon={<UserCircle className="w-5 h-5" />} label="Clientes" active={activeSection === 'clients'} onClick={() => setActiveSection('clients')} />
            <NavItem icon={<FileText className="w-5 h-5" />} label="Finanzas" active={activeSection === 'finances'} onClick={() => setActiveSection('finances')} />
          </nav>
        </div>
        <div className="mt-auto p-6 border-t border-border bg-black/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-black text-xs">EL</div>
            <div>
              <p className="text-sm font-bold text-white leading-none">Esteban Lopez</p>
              <p className="text-[10px] text-primary font-black uppercase tracking-widest mt-1">Admin #20</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 ml-[260px] min-h-screen flex flex-col">
        <header className="h-[80px] bg-bg-deep/80 backdrop-blur-xl border-b border-border flex items-center justify-between px-10 sticky top-0 z-10">
          <div className="text-[11px] font-black uppercase tracking-[0.2em] text-text-muted">
            K-DAILY <span className="mx-2 text-border">/</span> <span className="text-white uppercase">{activeSection}</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative group">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" />
              <input type="text" placeholder="Buscar..." className="pl-11 pr-4 py-2.5 bg-bg-surface border border-border rounded-2xl text-xs font-medium text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 w-72 transition-all" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <button className="p-2.5 text-text-muted hover:bg-bg-surface border border-transparent hover:border-border rounded-xl relative transition-all">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-bg-deep animate-pulse"></span>
            </button>
          </div>
        </header>

        <div className="p-10">
          <AnimatePresence mode="wait">
            <motion.div key={activeSection} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}>
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

// ─── Componente de carga y error reutilizable ───────────────────────────────

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-8 h-8 border-4 border-border border-t-primary rounded-full animate-spin" />
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-3 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm font-medium">
      <AlertTriangle className="w-5 h-5 shrink-0" />
      {message}
    </div>
  );
}

// ─── NavItem ────────────────────────────────────────────────────────────────

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${active ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-text-muted hover:text-white hover:bg-white/5'}`}>
      <span className={active ? 'text-white' : 'text-primary/60'}>{icon}</span>
      {label}
    </button>
  );
}

// ─── EVENTOS ────────────────────────────────────────────────────────────────

function EventsList() {
  const [events, setEvents] = useState<EventService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    eventsAPI.getAll()
      .then(setEvents)
      .catch(() => setError('No se pudieron cargar los eventos.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Cronograma Maestro</h2>
          <p className="text-sm text-text-muted mt-1 font-medium italic">Logística y montajes en tiempo real.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-95 transition-all">
          <Plus className="w-4 h-4" /> Nuevo Evento
        </button>
      </div>

      <div className="relative before:absolute before:left-[35px] before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-primary/50 before:via-border before:to-transparent">
        <div className="space-y-8">
          {events.map((event) => (
            <motion.div key={event.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex gap-8 group">
              <div className="w-[70px] shrink-0 flex flex-col items-center pt-1">
                <div className="w-4 h-4 rounded-full bg-primary border-4 border-bg-deep z-10 group-hover:scale-150 transition-transform" />
              </div>
              <div className="flex-1 bg-bg-surface rounded-[28px] border border-border hover:border-primary/40 p-7 transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-white">{event.title}</h3>
                    <p className="text-xs text-text-muted mt-1">{event.descript}</p>
                    <div className="flex items-center gap-4 mt-2 text-[10px] font-black text-text-muted uppercase tracking-widest">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-primary/60" />
                        {new Date(event.event_date).toLocaleDateString('es-DO', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-primary/60" />
                        {event.e_location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Activity className="w-3 h-3 text-primary/60" />
                        {event.duration_hours}h
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-[9px] font-black uppercase bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full tracking-widest">
                      Estado #{event.e_status}
                    </span>
                    <span className="text-sm font-black text-white">${event.base_price.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── INVENTARIO ─────────────────────────────────────────────────────────────

function InventoryList() {
  const [inventory, setInventory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    inventoryAPI.getAll()
      .then(setInventory)
      .catch(() => setError('No se pudo cargar el inventario.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tighter">
            Gestión de Stock
          </h2>
          <p className="text-sm text-text-muted font-medium">
            Inventario de K-DAILY.
          </p>
        </div>

        <button className="bg-primary text-white px-6 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-primary/20 flex items-center gap-2">
          Añadir Recurso
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {inventory.map((item) => (
          <motion.div
            key={item.id}
            className="bg-bg-surface rounded-[28px] border border-border hover:border-primary/50 transition-all p-7"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-3.5 rounded-2xl bg-bg-deep border border-border text-primary">
                <Boxes className="w-6 h-6" />
              </div>

              <span className="text-[10px] font-black text-success bg-success/10 px-3 py-1 rounded-full border border-success/20">
                STOCK: {item.stock_actual}
              </span>
            </div>

            <h3 className="text-lg font-bold text-white mb-2">
              {item.element}
            </h3>

            <p className="text-xs text-text-muted mb-5">
              Precio actual: ${item.actual_price}
            </p>

            <div className="h-1.5 w-full bg-bg-deep rounded-full overflow-hidden border border-border/50 mb-6">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.min(
                    (item.stock_actual / (item.stock_alert * 2)) * 100,
                    100
                  )}%`,
                }}
                className="h-full bg-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-5 border-t border-border/40">
              <div className="bg-bg-deep/60 p-3 rounded-xl border border-border/50 text-center">
                <p className="text-[9px] font-black text-text-muted uppercase tracking-tighter">
                  Mínimo
                </p>

                <p className="text-sm font-bold text-white">
                  {item.stock_alert}
                </p>
              </div>

              <div className="bg-bg-deep/60 p-3 rounded-xl border border-border/50 text-center">
                <p className="text-[9px] font-black text-text-muted uppercase tracking-tighter">
                  Actual
                </p>

                <p className="text-sm font-bold text-white">
                  {item.stock_actual}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── EMPLEADOS ──────────────────────────────────────────────────────────────

function EmployeeList() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    employeesAPI.getAll()
      .then(setEmployees)
      .catch(() => setError('No se pudieron cargar los empleados.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tighter">
            Gestión de Personal
          </h2>

          <p className="text-sm text-text-muted font-medium italic">
            Talento humano de K-DAILY.
          </p>
        </div>

        <button className="bg-primary text-white px-6 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-primary/20 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nuevo Empleado
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {employees.map((emp) => (
          <motion.div
            key={emp.id}
            whileHover={{ y: -10 }}
            className="group bg-bg-surface rounded-[35px] border border-border hover:border-primary/40 transition-all overflow-hidden shadow-lg"
          >
            <div className="p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 rounded-full bg-bg-deep border-[6px] border-bg-surface flex items-center justify-center text-3xl font-black text-primary group-hover:scale-105 transition-transform">
                  {emp.fullname
                    .split(' ')
                    .map((n: string) => n[0])
                    .join('')}
                </div>
              </div>

              <h3 className="text-lg font-bold text-white mb-1">
                {emp.fullname}
              </h3>

              <div className="text-[9px] font-black text-primary uppercase tracking-[0.15em] mb-6 flex justify-center items-center gap-1.5">
                <ShieldCheck className="w-3 h-3" />
                ID: {emp.id}
              </div>

              <div className="grid grid-cols-2 gap-2 mb-6 text-[10px] font-bold text-white uppercase tracking-tighter">
                <div className="bg-bg-deep/50 py-2 rounded-xl border border-border/50">
                  WS: {emp.workstation}
                </div>

                <div className="bg-bg-deep/50 py-2 rounded-xl border border-border/50">
                  USER: {emp.assigned_user || "N/A"}
                </div>
              </div>

              <button className="w-full py-3 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                Ver Perfil
              </button>
            </div>

            <div className="bg-black/20 py-3 flex justify-center gap-6 border-t border-border">
              <Mail className="w-4 h-4 text-text-muted" />
              <Phone className="w-4 h-4 text-text-muted" />
              <MapPin className="w-4 h-4 text-text-muted" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── CLIENTES ───────────────────────────────────────────────────────────────

function ClientList() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    clientsAPI.getAll()
      .then(setClients)
      .catch(() => setError('No se pudieron cargar los clientes.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tighter">
            Directorio de Clientes
          </h2>

          <p className="text-sm text-text-muted font-medium italic">
            Relaciones comerciales de K-DAILY.
          </p>
        </div>

        <button className="bg-primary text-white px-6 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-primary/20 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Registrar Cliente
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {clients.map((client) => (
          <motion.div
            key={client.id}
            whileHover={{ y: -8 }}
            className="group bg-bg-surface rounded-[32px] border border-border hover:border-primary/40 transition-all overflow-hidden"
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-8">
                <div className="w-16 h-16 rounded-2xl bg-bg-deep border border-border flex items-center justify-center text-2xl font-black text-primary">
                  {client.fullname.charAt(0)}
                </div>

                <span className="text-[9px] font-black uppercase bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full tracking-widest">
                  {client.kind === 1 ? "EMPRESA" : "PERSONAL"}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-1">
                {client.fullname}
              </h3>

              <div className="flex items-center gap-2 text-[10px] font-black text-text-muted uppercase tracking-widest mb-6">
                <Briefcase className="w-3 h-3 text-primary/60" />
                {client.national_id}
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-4 p-4 bg-bg-deep/40 rounded-2xl border border-border/40">
                  <Mail className="w-4 h-4 text-primary/40" />

                  <p className="text-xs text-white truncate font-medium">
                    {client.email}
                  </p>
                </div>

                <div className="flex items-center gap-4 p-4 bg-bg-deep/40 rounded-2xl border border-border/40">
                  <Phone className="w-4 h-4 text-primary/40" />

                  <p className="text-xs text-white truncate font-medium">
                    {client.phone}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 border-t border-border bg-black/20">
              <button className="py-4 text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-white border-r border-border">
                Perfil
              </button>

              <button className="py-4 text-[10px] font-black uppercase tracking-widest text-primary">
                Contactar
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── DASHBOARD ──────────────────────────────────────────────────────────────

function DashboardOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatCard title="Eventos" value="12" trend="+8%" icon={<Calendar className="w-5 h-5 text-primary" />} />
      <StatCard title="Ingresos" value="$24.5k" trend="+12%" icon={<TrendingUp className="w-5 h-5 text-success" />} />
      <StatCard title="Alertas" value="03" trend="Stock" icon={<AlertTriangle className="w-5 h-5 text-warning" />} />
      <StatCard title="Feedback" value="4.9" trend="+0.2" icon={<CheckCircle2 className="w-5 h-5 text-primary" />} />
    </div>
  );
}

function StatCard({ title, value, trend, icon }: { title: string, value: string, trend: string, icon: React.ReactNode }) {
  return (
    <div className="bg-bg-surface p-7 rounded-[28px] border border-border group hover:border-primary/30 transition-all shadow-sm">
      <div className="flex justify-between items-start mb-6"><div className="p-3 bg-bg-deep rounded-2xl border border-border group-hover:scale-110 transition-transform">{icon}</div><span className="text-[9px] font-black text-success bg-success/10 px-2 py-1 rounded-md">{trend}</span></div>
      <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-1 opacity-60">{title}</p>
      <p className="text-3xl font-black text-white tracking-tighter">{value}</p>
    </div>
  );
}

// ─── FINANZAS ───────────────────────────────────────────────────────────────

function FinancesSection() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    invoicesAPI.getAll()
      .then(setInvoices)
      .catch(() => setError('No se pudieron cargar las facturas.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return <PlaceholderSection label="Módulo Contable" />;
}

function PlaceholderSection({ label }: { label: string }) {
  return <div className="p-20 text-center border-2 border-dashed border-border rounded-[40px] text-[10px] font-black text-text-muted uppercase tracking-[0.4em]">{label}</div>;
}
