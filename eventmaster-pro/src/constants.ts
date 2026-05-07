import { EventService, InventoryItem, Employee, Client } from './types';

export const MOCK_EVENTS: EventService[] = [
  {
    id: 1,
    title: 'Boda Civil Juan & Mafer',
    client_id: 101,
    client_name: 'Juan Perez',
    event_date: '2024-05-15',
    location: 'Quinta Las Rosas',
    base_price: 1500.00,
    status: 'In Progress'
  },
  {
    id: 2,
    title: 'Conferencia Tech 2024',
    client_id: 102,
    client_name: 'Innovate Corp',
    event_date: '2024-06-20',
    location: 'Centro de Convenciones',
    base_price: 3200.50,
    status: 'Pending'
  },
  {
    id: 3,
    title: 'Fiesta de Graduación - Promo 24',
    client_id: 103,
    client_name: 'Colegio Americano',
    event_date: '2024-07-10',
    location: 'Salón Imperial',
    base_price: 2800.00,
    status: 'Pending'
  }
];

export const MOCK_INVENTORY: InventoryItem[] = [
  { id: 1, name: 'Sillas Tiffany Blancas', stock_actual: 150, stock_alert: 20, category: 'Mobiliario' },
  { id: 2, name: 'Manteles de Lino', stock_actual: 45, stock_alert: 10, category: 'Textiles' },
  { id: 3, name: 'Proyector 4K', stock_actual: 2, stock_alert: 1, category: 'Audiovisual' },
  { id: 4, name: 'Copas de Cristal', stock_actual: 12, stock_alert: 24, category: 'Cristalería' }
];

export const MOCK_EMPLOYEES: Employee[] = [
  { id: 1, name: 'Carlos Ruiz', department: 'Logística', role: 'Coordinador', status: 'Active' },
  { id: 2, name: 'Ana Belén', department: 'Ventas', role: 'Ejecutiva Senior', status: 'Active' },
  { id: 3, name: 'Roberto Gómez', department: 'Operaciones', role: 'Técnico Sonido', status: 'On Leave' }
];

export const MOCK_CLIENTS: Client[] = [
  { id: 101, name: 'Juan Perez', email: 'juan@example.com', phone: '555-0101' },
  { id: 102, name: 'Innovate Corp', email: 'contact@innovate.com', phone: '555-0202', company: 'Innovate Corp' },
  { id: 103, name: 'Colegio Americano', email: 'admin@colegio.edu', phone: '555-0303' }
];

export const MOCK_INVOICES: Invoice[] = [
  {
    id: 'INV-2024-001',
    client_id: 101,
    client_name: 'Juan Perez',
    event_id: 1,
    event_title: 'Boda Civil Juan & Mafer',
    amount: 1500.00,
    date: '2024-04-10',
    due_date: '2024-04-25',
    status: 'Paid'
  },
  {
    id: 'INV-2024-002',
    client_id: 102,
    client_name: 'Innovate Corp',
    event_id: 2,
    event_title: 'Conferencia Tech 2024',
    amount: 3200.00,
    date: '2024-04-15',
    due_date: '2024-05-15',
    status: 'Pending'
  }
];
