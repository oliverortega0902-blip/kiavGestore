import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Calendar, Boxes, Users, UserCircle, FileText, Search, 
  Plus, Bell, TrendingUp, AlertTriangle, CheckCircle2, Mail, Briefcase, 
  Phone, ShieldCheck, MapPin, Clock, Activity, Filter, ChevronRight,
  Trash2, Edit, Receipt, List, ArrowRight, ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section, EventService, InventoryItem, Employee, Client, Invoice } from './types';
import { eventsAPI, inventoryAPI, employeesAPI, clientsAPI, invoicesAPI } from './api';
import { MOCK_CLIENTS } from './constants';

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

// ─── COMBOBOX CUSTOM ─────────────────────────────────────────────────────────

interface ComboboxOption {
  id: string | number;
  label: string;
  sublabel?: string;
}

function Combobox({ options, value, onChange, placeholder = "Buscar..." }: { 
  options: ComboboxOption[], 
  value: string | number | undefined, 
  onChange: (val: string | number) => void,
  placeholder?: string
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  
  const selectedOption = options.find(o => o.id === value);
  const filteredOptions = query === "" 
    ? options 
    : options.filter(o => o.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="relative">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-bg-deep border border-border rounded-2xl px-4 py-3 text-sm text-white focus-within:border-primary transition-all flex items-center justify-between cursor-pointer group"
      >
        <span className={selectedOption ? "text-white font-medium" : "text-text-muted"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-text-muted transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} group-hover:text-primary`} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute left-0 right-0 top-full mt-2 bg-bg-surface border border-border rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-3 border-b border-border bg-black/10">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input 
                    type="text" 
                    autoFocus
                    placeholder="Escribe para filtrar..."
                    className="w-full bg-bg-deep/50 border border-border rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-primary/50 transition-all font-medium"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="max-h-60 overflow-y-auto p-1.5 custom-scrollbar">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        onChange(opt.id);
                        setIsOpen(false);
                        setQuery("");
                      }}
                      className={`w-full text-left p-3 rounded-xl transition-all flex flex-col gap-0.5 group ${value === opt.id ? 'bg-primary text-white' : 'hover:bg-white/5'}`}
                    >
                      <span className={`text-xs font-bold ${value === opt.id ? 'text-white' : 'text-white/90'}`}>{opt.label}</span>
                      {opt.sublabel && (
                        <span className={`text-[9px] uppercase tracking-widest font-black ${value === opt.id ? 'text-white/60' : 'text-text-muted group-hover:text-primary/60'}`}>
                          {opt.sublabel}
                        </span>
                      )}
                    </button>
                  ))
                ) : (
                  <div className="p-4 text-center text-[10px] font-black uppercase text-text-muted tracking-widest italic">
                    Sin resultados
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
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
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventService | null>(null);


  useEffect(() => {
    eventsAPI.getAll()
      .then(setEvents)
      .catch(() => setError('No se pudieron cargar los eventos.'))
      .finally(() => setLoading(false));
  }, []);

    const handleEdit = (event: EventService) => {
    setEditingEvent(event);
    setShowModal(true);
  };

  const handleCreate = () => {
    setEditingEvent(null);
    setShowModal(true);
  };

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

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-bg-surface border border-border w-full max-w-2xl rounded-[32px] shadow-2xl p-8 overflow-y-auto max-h-[90vh]">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter">
                  {editingEvent ? `Editar Evento #${editingEvent.id}` : 'Registrar Nuevo Evento'}
                </h3>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-white/5 rounded-full text-text-muted transition-colors"><Plus className="w-6 h-6 rotate-45" /></button>
              </div>
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setShowModal(false); }}>
                {editingEvent && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1 underline decoration-primary decoration-2 underline-offset-4">ID del Registro (Referencia Back-end)</label>
                    <input type="text" readOnly value={editingEvent.id} className="w-full bg-bg-deep/50 border border-border/50 rounded-2xl px-4 py-3 text-sm text-primary font-mono focus:outline-none cursor-not-allowed" />
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Título del Evento</label>
                    <input type="text" defaultValue={editingEvent?.title} className="w-full bg-bg-deep border border-border rounded-2xl px-4 py-3 text-sm text-white focus:border-primary transition-all" placeholder="Ej: Boda Real" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Cliente</label>
                    <Combobox 
                      options={MOCK_CLIENTS.map(c => ({ id: c.id, label: c.fullname, sublabel: `ID: ${c.id}` }))}
                      value={editingEvent?.customer_id}
                      onChange={(val) => {
                        // Aquí el backend sabrá que cambió
                      }}
                      placeholder="Seleccionar Cliente"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Descripción</label>
                    <textarea defaultValue={editingEvent?.descript} className="w-full bg-bg-deep border border-border rounded-2xl px-4 py-3 text-sm text-white focus:border-primary transition-all h-24" placeholder="Detalles del montaje..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Fecha y Hora</label>
                    <input type="datetime-local" defaultValue={editingEvent?.event_date ? new Date(editingEvent.event_date).toISOString().slice(0, 16) : ''} className="w-full bg-bg-deep border border-border rounded-2xl px-4 py-3 text-sm text-white focus:border-primary transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Ubicación</label>
                    <input type="text" defaultValue={editingEvent?.e_location} className="w-full bg-bg-deep border border-border rounded-2xl px-4 py-3 text-sm text-white focus:border-primary transition-all" placeholder="Salón de eventos..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Presupuesto Base ($)</label>
                    <input type="number" step="0.01" defaultValue={editingEvent?.base_price} className="w-full bg-bg-deep border border-border rounded-2xl px-4 py-3 text-sm text-white focus:border-primary transition-all" placeholder="0.00" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Duración (Horas)</label>
                    <input type="number" defaultValue={editingEvent?.duration_hours} className="w-full bg-bg-deep border border-border rounded-2xl px-4 py-3 text-sm text-white focus:border-primary transition-all" placeholder="1" />
                  </div>
                </div>
                <div className="pt-6">
                  <button type="submit" className="w-full bg-primary text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-[0.98] transition-all">
                    {editingEvent ? 'Guardar Cambios' : 'Confirmar Montaje'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="relative before:absolute before:left-[35px] before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-primary/50 before:via-border before:to-transparent">
        <div className="space-y-6">
          {events.map((event) => (
            <motion.div key={event.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex gap-8 group">
              <div className="w-[70px] shrink-0 flex flex-col items-center pt-1">
                <div className="w-4 h-4 rounded-full bg-primary border-4 border-bg-deep z-10 group-hover:scale-150 transition-transform" />
              </div>
              <div className="flex-1 bg-bg-surface rounded-3xl border border-border hover:border-primary/40 p-6 transition-all group-hover:bg-bg-deep/40">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-primary transition-colors">{event.title}</h3>
                    <p className="text-[11px] text-text-muted mt-1 leading-relaxed line-clamp-2 max-w-xl">{event.descript}</p>
                    <div className="flex items-center gap-4 mt-4 text-[9px] font-black text-text-muted uppercase tracking-widest">
                      <span className="flex items-center gap-1.5 bg-black/20 px-2.5 py-1 rounded-lg">
                        <Clock className="w-3 h-3 text-primary/60" />
                        {new Date(event.event_date).toLocaleDateString('es-DO', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1.5 bg-black/20 px-2.5 py-1 rounded-lg">
                        <MapPin className="w-3 h-3 text-primary/60" />
                        {event.e_location}
                      </span>
                      <span className="flex items-center gap-1.5 bg-black/20 px-2.5 py-1 rounded-lg">
                        <Activity className="w-3 h-3 text-primary/60" />
                        {event.duration_hours}h
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <span className="text-[8px] font-black uppercase bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full tracking-widest">
                      E-#{event.e_status}
                    </span>
                    <div className="text-right">
                      <p className="text-[9px] font-black text-text-muted uppercase tracking-widest mb-0.5">Monto Base</p>
                      <span className="text-base font-black text-white">${event.base_price.toLocaleString()}</span>
                    </div>
                    
                    {/* Botones debajo del precio */}
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                      <button onClick={() => handleEdit(event)} className="p-2 bg-bg-deep border border-border rounded-xl text-text-muted hover:text-white transition-all">
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-2 bg-red-500/5 border border-red-500/20 rounded-xl text-red-400 hover:bg-red-500 hover:text-white transition-all">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
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
 const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  useEffect(() => {
    inventoryAPI.getAll()
      .then(setInventory)
      .catch(() => setError('No se pudo cargar el inventario.'))
      .finally(() => setLoading(false));
  }, []);

  const handleEdit = (item: InventoryItem) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleCreate = () => {
    setEditingItem(null);
    setShowModal(true);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase">Gestión de Stock</h2>
          <p className="text-sm text-text-muted font-medium">Control físico y reposición de recursos de K-DAILY.</p>
        </div>
        <button 
          onClick={handleCreate}
          className="bg-primary text-white px-6 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-primary/20 flex items-center gap-2 hover:scale-95 transition-all text-nowrap"
        >
          <Plus className="w-4 h-4" /> Añadir Recurso
        </button>
      </div>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-bg-surface border border-border w-full max-w-2xl rounded-[32px] shadow-2xl p-8 overflow-y-auto max-h-[90vh]">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter">
                  {editingItem ? `Editar Recurso #${editingItem.id}` : 'Registrar Item de Inventario'}
                </h3>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-white/5 rounded-full text-text-muted transition-colors"><Plus className="w-6 h-6 rotate-45" /></button>
              </div>
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setShowModal(false); }}>
                {editingItem && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1 underline decoration-primary decoration-2 underline-offset-4">ID del Registro (Referencia Back-end)</label>
                    <input type="text" readOnly value={editingItem.id} className="w-full bg-bg-deep/50 border border-border/50 rounded-2xl px-4 py-3 text-sm text-primary font-mono focus:outline-none cursor-not-allowed" />
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Nombre del Elemento</label>
                    <input type="text" defaultValue={editingItem?.element} className="w-full bg-bg-deep border border-border rounded-2xl px-4 py-3 text-sm text-white focus:border-primary transition-all" placeholder="Ej: Cable XLR 5m" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Tipo de Elemento</label>
                    <Combobox 
                      options={[
                        { id: '1', label: 'Reutilizable', sublabel: 'EQUIPOS' },
                        { id: '0', label: 'Orgánico', sublabel: 'CONSUMIBLE' }
                      ]}
                      value={editingItem?.is_reusable?.toString()}
                      onChange={(val) => {}}
                      placeholder="Tipo de Item"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Precio Unitario ($)</label>
                    <input type="number" step="0.01" defaultValue={editingItem?.actual_price} className="w-full bg-bg-deep border border-border rounded-2xl px-4 py-3 text-sm text-white focus:border-primary transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Precio sugerido ($)</label>
                    <input type="number" step="0.01" defaultValue={editingItem?.suggested_price} className="w-full bg-bg-deep border border-border rounded-2xl px-4 py-3 text-sm text-white focus:border-primary transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Stock Actual</label>
                    <input type="number" defaultValue={editingItem?.stock_actual} className="w-full bg-bg-deep border border-border rounded-2xl px-4 py-3 text-sm text-white focus:border-primary transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Stock de Alerta</label>
                    <input type="number" defaultValue={editingItem?.stock_alert} className="w-full bg-bg-deep border border-border rounded-2xl px-4 py-3 text-sm text-white focus:border-primary transition-all" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Estado Inicial</label>
                    <Combobox 
                      options={[
                        { id: '1', label: 'Nuevo', sublabel: 'EXCELENTE' },
                        { id: '2', label: 'Usado', sublabel: 'FUNCIONAL' },
                        { id: '3', label: 'Reparación', sublabel: 'PENDIENTE' }
                      ]}
                      value={editingItem?.e_condition?.toString()}
                      onChange={(val) => {}}
                      placeholder="Estado del Item"
                    />
                  </div>
                </div>
                <div className="pt-6">
                  <button type="submit" className="w-full bg-primary text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-[0.98] transition-all">
                    {editingItem ? 'Guardar Cambios' : 'Registrar en Base de Datos'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {inventory.map((item) => (
          <motion.div
            key={item.id}
            className="group relative bg-bg-surface rounded-[28px] border border-border hover:border-primary/50 transition-all p-7 overflow-hidden"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-3.5 rounded-2xl bg-bg-deep border border-border text-primary">
                <Boxes className="w-6 h-6" />
              </div>

              <span className={`text-[10px] font-black px-3 py-1 rounded-full border ${item.stock_actual <= item.stock_alert ? 'text-warning bg-warning/10 border-warning/20' : 'text-success bg-success/10 border-success/20'}`}>
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
                whileInView={{
                  width: `${Math.min((item.stock_actual / (item.stock_alert || 1)) * 50, 100)}%`,
                }}
                className={`h-full ${item.stock_actual <= item.stock_alert ? 'bg-warning' : 'bg-primary'}`}
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-5 border-t border-border/40">
              <div className="bg-bg-deep/60 p-3 rounded-xl border border-border/50 text-center">
                <p className="text-[9px] font-black text-text-muted uppercase tracking-tighter">Mínimo</p>
                <p className="text-sm font-bold text-white">{item.stock_alert}</p>
              </div>

              <div className="bg-bg-deep/60 p-3 rounded-xl border border-border/50 text-center">
                <p className="text-[9px] font-black text-text-muted uppercase tracking-tighter">Actual</p>
                <p className="text-sm font-bold text-white">{item.stock_actual}</p>
              </div>
            </div>

            {/* Acciones flotantes para que siempre sean visibles al hover */}
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all z-10 translate-x-4 group-hover:translate-x-0">
               <button onClick={() => handleEdit(item)} className="p-2 bg-bg-surface border border-border rounded-xl text-text-muted hover:text-primary hover:border-primary/50 transition-all shadow-xl">
                 <Edit className="w-4 h-4" />
               </button>
               <button className="p-2 bg-bg-surface border border-border rounded-xl text-red-400 hover:bg-red-500 hover:text-white transition-all shadow-xl">
                 <Trash2 className="w-4 h-4" />
               </button>
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
const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<Employee | null>(null);

  useEffect(() => {
    employeesAPI.getAll()
      .then(setEmployees)
      .catch(() => setError('No se pudieron cargar los empleados.'))
      .finally(() => setLoading(false));
  }, []);

  const handleEdit = (emp: Employee) => {
    setEditingEmployee(emp);
    setShowModal(true);
  };

  const handleCreate = () => {
    setEditingEmployee(null);
    setShowModal(true);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase">Gestión de Personal</h2>
          <p className="text-sm text-text-muted font-medium italic">Talento humano y asignaciones de K-DAILY.</p>
        </div>
        <button 
          onClick={handleCreate}
          className="bg-primary text-white px-6 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-primary/20 flex items-center gap-2 hover:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" /> Nuevo Empleado
        </button>
      </div>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-bg-surface border border-border w-full max-w-2xl rounded-[32px] shadow-2xl p-8 overflow-y-auto max-h-[90vh]">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter">
                  {editingEmployee ? `Editar Empleado #${editingEmployee.id}` : 'Registrar Nuevo Empleado'}
                </h3>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-white/5 rounded-full text-text-muted transition-colors"><Plus className="w-6 h-6 rotate-45" /></button>
              </div>
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setShowModal(false); }}>
                {editingEmployee && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1 underline decoration-primary decoration-2 underline-offset-4">ID del Registro (Referencia Back-end)</label>
                    <input type="text" readOnly value={editingEmployee.id} className="w-full bg-bg-deep/50 border border-border/50 rounded-2xl px-4 py-3 text-sm text-primary font-mono focus:outline-none cursor-not-allowed" />
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Nombre Completo</label>
                    <input type="text" defaultValue={editingEmployee?.fullname} className="w-full bg-bg-deep border border-border rounded-2xl px-4 py-3 text-sm text-white focus:border-primary transition-all" placeholder="Juan Perez" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Cédula / ID Nacional</label>
                    <input type="text" className="w-full bg-bg-deep border border-border rounded-2xl px-4 py-3 text-sm text-white focus:border-primary transition-all" placeholder="000-0000000-0" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Correo Electrónico</label>
                    <input type="email" className="w-full bg-bg-deep border border-border rounded-2xl px-4 py-3 text-sm text-white focus:border-primary transition-all" placeholder="email@ejemplo.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Teléfono</label>
                    <input type="tel" className="w-full bg-bg-deep border border-border rounded-2xl px-4 py-3 text-sm text-white focus:border-primary transition-all" placeholder="809-000-0000" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Puesto (Workstation)</label>
                    <Combobox 
                      options={[
                        { id: '1', label: 'Logística', sublabel: 'OPERATIVO' },
                        { id: '2', label: 'Ventas', sublabel: 'COMERCIAL' },
                        { id: '3', label: 'Administración', sublabel: 'OFICINA' }
                      ]}
                      value={editingEmployee?.workstation?.toString()}
                      onChange={(val) => {}}
                      placeholder="Seleccionar Puesto"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Fecha de Contratación</label>
                    <input type="date" defaultValue={editingEmployee?.hiring_date ? new Date(editingEmployee.hiring_date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]} className="w-full bg-bg-deep border border-border rounded-2xl px-4 py-3 text-sm text-white focus:border-primary transition-all" />
                  </div>
                </div>
                <div className="pt-6">
                  <button type="submit" className="w-full bg-primary text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-[0.98] transition-all">
                    {editingEmployee ? 'Actualizar Datos' : 'Vincular al Equipo'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {selectedProfile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProfile(null)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="relative bg-bg-surface border border-border w-full max-w-xl rounded-[40px] shadow-2xl p-10 overflow-hidden">
               <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 rounded-full bg-bg-deep border-[8px] border-bg-surface shadow-2xl mb-6 flex items-center justify-center text-4xl font-black text-primary">
                    {selectedProfile.fullname.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-1">{selectedProfile.fullname}</h3>
                  <div className="text-[10px] font-black text-primary uppercase tracking-widest mb-8 px-4 py-1.5 bg-primary/10 rounded-full border border-primary/20">
                    ID Empleado #{selectedProfile.id}
                  </div>
                  
                  <div className="w-full grid grid-cols-2 gap-4 text-left">
                    <ProfileField label="Workstation" value={selectedProfile.workstation} />
                    <ProfileField label="Usuario Asignado" value={selectedProfile.assigned_user || "Sin asignar"} />
                    <ProfileField label="Contratación" value={new Date(selectedProfile.hiring_date).toLocaleDateString()} />
                    <ProfileField label="Estado" value="Activo" />
                  </div>

                  <div className="w-full mt-10 pt-10 border-t border-border flex justify-center gap-6">
                    <button className="flex flex-col items-center gap-2 group">
                      <div className="p-4 rounded-2xl bg-bg-deep border border-border group-hover:bg-primary group-hover:border-primary transition-all group-hover:text-white text-text-muted">
                        <Mail className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-text-muted group-hover:text-white transition-colors">Email</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 group">
                      <div className="p-4 rounded-2xl bg-bg-deep border border-border group-hover:bg-primary group-hover:border-primary transition-all group-hover:text-white text-text-muted">
                        <Phone className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-text-muted group-hover:text-white transition-colors">Llamar</span>
                    </button>
                  </div>

                  <button onClick={() => setSelectedProfile(null)} className="mt-12 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted hover:text-white hover:underline transition-all">Cerrar Perfil</button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {employees.map((emp) => (
          <motion.div
            key={emp.id}
            whileHover={{ y: -10 }}
            className="group bg-bg-surface rounded-[35px] border border-border hover:border-primary/40 transition-all overflow-hidden shadow-lg"
          >
            <div className="p-8 text-center flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-bg-deep border-[4px] border-bg-surface flex items-center justify-center text-2xl font-black text-primary transition-transform group-hover:scale-110 mb-5 shadow-inner">
                {emp.fullname.split(' ').map((n: string) => n[0]).join('')}
              </div>

              <h3 className="text-lg font-bold text-white mb-1 truncate w-full">{emp.fullname}</h3>
              <p className="text-[9px] font-black text-primary uppercase tracking-[0.15em] mb-6">Puesto ID: {emp.workstation}</p>

              <button 
                onClick={() => setSelectedProfile(emp)}
                className="w-full py-4 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[0.98] transition-all"
              >
                Ver Perfil
              </button>
            </div>

            <div className="bg-black/20 py-3 flex justify-center gap-4 border-t border-border opacity-0 group-hover:opacity-100 transition-all">
              <button onClick={() => handleEdit(emp)} className="p-2 text-text-muted hover:text-primary transition-colors">
                <Edit className="w-4 h-4" />
              </button>
              <button className="p-2 text-text-muted hover:text-red-400 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ProfileField({ label, value }: { label: string, value: string | number }) {
  return (
    <div className="bg-bg-deep/40 p-4 rounded-2xl border border-border/50">
      <p className="text-[9px] font-black text-text-muted uppercase tracking-widest mb-1">{label}</p>
      <p className="text-sm font-bold text-white">{value}</p>
    </div>
  );
}

// ─── CLIENTES ───────────────────────────────────────────────────────────────

function ClientList() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
 const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  useEffect(() => {
    clientsAPI.getAll()
      .then(setClients)
      .catch(() => setError('No se pudieron cargar los clientes.'))
      .finally(() => setLoading(false));
  }, []);

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setShowModal(true);
  };

  const handleCreate = () => {
    setEditingClient(null);
    setShowModal(true);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase">Directorio de Clientes</h2>
          <p className="text-sm text-text-muted font-medium italic">Relaciones comerciales y corporativas de K-DAILY.</p>
        </div>
        <button 
          onClick={handleCreate}
          className="bg-primary text-white px-6 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-primary/20 flex items-center gap-2 hover:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" /> Registrar Cliente
        </button>
      </div>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-bg-surface border border-border w-full max-w-2xl rounded-[32px] shadow-2xl p-8 overflow-y-auto max-h-[90vh]">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter">
                  {editingClient ? `Editar Cliente #${editingClient.id}` : 'Registrar Nuevo Cliente'}
                </h3>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-white/5 rounded-full text-text-muted transition-colors"><Plus className="w-6 h-6 rotate-45" /></button>
              </div>
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setShowModal(false); }}>
                {editingClient && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1 underline decoration-primary decoration-2 underline-offset-4">ID del Registro (Referencia Back-end)</label>
                    <input type="text" readOnly value={editingClient.id} className="w-full bg-bg-deep/50 border border-border/50 rounded-2xl px-4 py-3 text-sm text-primary font-mono focus:outline-none cursor-not-allowed" />
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Nombre Completo / Razón Social</label>
                    <input type="text" defaultValue={editingClient?.fullname} className="w-full bg-bg-deep border border-border rounded-2xl px-4 py-3 text-sm text-white focus:border-primary transition-all" placeholder="TechCorp S.A." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Identificación Nacional (RNC/Cédula)</label>
                    <input type="text" defaultValue={editingClient?.national_id} className="w-full bg-bg-deep border border-border rounded-2xl px-4 py-3 text-sm text-white focus:border-primary transition-all" placeholder="1-01-12345-6" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Tipo de Cliente</label>
                    <Combobox 
                      options={[
                        { id: '1', label: 'Empresa', sublabel: 'CORPORATIVO' },
                        { id: '2', label: 'Persona Física', sublabel: 'CLIENTE FINAL' }
                      ]}
                      value={editingClient?.kind?.toString()}
                      onChange={(val) => {}}
                      placeholder="Tipo de Cliente"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px) font-black uppercase tracking-widest text-text-muted ml-1">Correo Electrónico</label>
                    <input type="email" defaultValue={editingClient?.email} className="w-full bg-bg-deep border border-border rounded-2xl px-4 py-3 text-sm text-white focus:border-primary transition-all" placeholder="contacto@empresa.com" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Teléfono</label>
                    <input type="tel" defaultValue={editingClient?.phone} className="w-full bg-bg-deep border border-border rounded-2xl px-4 py-3 text-sm text-white focus:border-primary transition-all" placeholder="809-555-0000" />
                  </div>
                </div>
                <div className="pt-6">
                  <button type="submit" className="w-full bg-primary text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-[0.98] transition-all">
                    {editingClient ? 'Actualizar Cliente' : 'Guardar en CRM'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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

            <div className="grid grid-cols-2 border-t border-border bg-black/20 opacity-0 group-hover:opacity-100 transition-all">
              <button onClick={() => handleEdit(client)} className="py-4 text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/5 border-r border-border transition-colors">
                Editar
              </button>
              <button className="py-4 text-[10px] font-black uppercase tracking-widest text-red-400 hover:bg-red-400/5 transition-colors text-center flex items-center justify-center">
                <Trash2 className="w-3" />
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
 const [events, setEvents] = useState<EventService[]>([]);
  const [alerts, setAlerts] = useState<InventoryAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([eventsAPI.getAll(), inventoryAPI.getAlerts()])
      .then(([evs, alts]) => {
        setEvents(evs.slice(0, 3));
        setAlerts(alts);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Eventos Activos" value="12" trend="+8%" icon={<Calendar className="w-5 h-5 text-primary" />} />
        <StatCard title="Ingresos" value="$24.5k" trend="+12%" icon={<TrendingUp className="w-5 h-5 text-success" />} />
        <StatCard title="Stock Crítico" value={alerts.length.toString()} trend="Alertas" icon={<AlertTriangle className="w-5 h-5 text-warning" />} />
        <StatCard title="Satisfacción" value="4.9" trend="+0.2" icon={<CheckCircle2 className="w-5 h-5 text-primary" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Próximos Eventos */}
        <div className="bg-bg-surface rounded-[32px] border border-border p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary" />
              Eventos Próximos
            </h3>
            <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Ver todo</button>
          </div>
          <div className="space-y-4">
            {events.map(event => (
              <div key={event.id} className="flex items-center justify-between p-4 bg-bg-deep/50 rounded-2xl border border-border/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {new Date(event.event_date).getDate()}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{event.title}</p>
                    <p className="text-[10px] text-text-muted uppercase tracking-wider">{event.e_location}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-text-muted" />
              </div>
            ))}
          </div>
        </div>

        {/* Alertas de Inventario */}
        <div className="bg-bg-surface rounded-[32px] border border-border p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Alertas de Stock
            </h3>
          </div>
          <div className="space-y-4">
            {alerts.map(alert => (
              <div key={alert.id} className="p-4 bg-yellow-500/5 rounded-2xl border border-yellow-500/20 flex gap-4">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                  <Boxes className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">{alert.alert_message}</p>
                  <p className="text-[10px] text-text-muted mt-1">{new Date(alert.alert_date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
            {alerts.length === 0 && (
              <div className="py-12 text-center">
                <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-4 opacity-20" />
                <p className="text-sm text-text-muted italic">Todo el stock está en niveles óptimos.</p>
              </div>
            )}
          </div>
        </div>
      </div>
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

function FinancesSection({ mode, setMode }: { mode: 'insert' | 'list', setMode: (m: 'insert' | 'list') => void }) {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    billsAPI.getAll()
      .then(setBills)
      .catch(() => setError('No se pudieron cargar los registros financieros.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  if (mode === 'insert') {
    return (
      <div className="space-y-8 max-w-full">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Emisión de Factura</h2>
          <p className="text-sm text-text-muted mt-1 font-medium italic">Registra un nuevo comprobante en el sistema.</p>
        </div>

        <div className="bg-bg-surface rounded-3xl border border-border p-10 w-full shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Receipt className="w-64 h-64 text-white" />
          </div>
          <form className="space-y-8 relative z-10" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted ml-1">Evento Relacionado</label>
                <Combobox 
                  options={[
                    { id: '1', label: 'Gala K-Pro 2024', sublabel: 'LOGÍSTICA' },
                    { id: '2', label: 'Sunset Party', sublabel: 'CORPORATIVO' }
                  ]}
                  value={""} // Aquí iría el estado
                  onChange={(val) => {}}
                  placeholder="Vincular con Evento"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted ml-1">Monto Total ($)</label>
                <input type="number" step="0.01" className="w-full bg-bg-deep border border-border rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-bold" placeholder="0.00" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted ml-1">Método de Pago</label>
                <Combobox 
                  options={[
                    { id: '1', label: 'Transferencia Bancaria', sublabel: 'BANCO' },
                    { id: '2', label: 'Efectivo / Cash', sublabel: 'CAJA' },
                    { id: '3', label: 'Tarjeta de Crédito', sublabel: 'POS' }
                  ]}
                  value={""}
                  onChange={(val) => {}}
                  placeholder="Forma de Pago"
                />
              </div>
              <div className="space-y-3 md:col-span-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted ml-1">Notas del comprobante</label>
                <input type="text" className="w-full bg-bg-deep border border-border rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all" placeholder="Detalles adicionales del pago..." />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted ml-1">Fecha de Emisión</label>
                <input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-full bg-bg-deep border border-border rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all" />
              </div>
            </div>
            <div className="pt-6">
              <button type="submit" className="w-full bg-primary text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-primary/30 hover:scale-[0.99] transition-all flex items-center justify-center gap-3">
                <Receipt className="w-5 h-5" /> Generar Comprobante Oficial
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Registros de Facturación</h2>
          <p className="text-sm text-text-muted mt-1 font-medium italic">Historial completo de movimientos emitidos.</p>
        </div>
      </div>

      <div className="bg-bg-surface rounded-3xl border border-border overflow-hidden shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black/40 border-b border-border">
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">ID Transacción</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Evento / Concepto</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Monto Neto</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Fecha Emisión</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted text-right">Control</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {bills.map(bill => (
              <tr key={bill.id} className="hover:bg-primary/5 transition-all group">
                <td className="px-8 py-6 font-mono text-xs text-primary group-hover:font-black transition-all font-medium">#{bill.id}</td>
                <td className="px-8 py-6 text-sm font-bold text-white">Evento Ref: {bill.event_id}</td>
                <td className="px-8 py-6 text-sm font-black text-white">${bill.amount.toLocaleString()}</td>
                <td className="px-8 py-6">
                  <span className="px-3 py-1 bg-bg-deep border border-border rounded-lg text-[10px] font-black text-text-muted uppercase">
                    {new Date(bill.payment_date).toLocaleDateString('es-DO')}
                  </span>
                </td>
                <td className="px-8 py-6 text-right space-x-3">
                  <button className="p-2.5 text-text-muted hover:text-primary bg-bg-deep border border-border rounded-xl transition-all"><Edit className="w-4 h-4" /></button>
                  <button className="p-2.5 text-text-muted hover:text-red-400 bg-bg-deep border border-border rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PlaceholderSection({ label }: { label: string }) {
  return <div className="p-20 text-center border-2 border-dashed border-border rounded-[40px] text-[10px] font-black text-text-muted uppercase tracking-[0.4em]">{label}</div>;
}
