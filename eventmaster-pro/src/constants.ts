import { EventService, InventoryItem, Employee, Client, Invoice, InventoryAlert, Bill } from './types';

export const MOCK_EVENTS: EventService[] = [
  { id: 1, title: 'Gala K-Pro 2024', descript: 'Evento corporativo de alto perfil', client: 1, event_type: 1, event_date: '2024-12-15T19:00:00', e_location: 'Hotel Palace', e_status: 1, duration_hours: 6, contract_asingned: true, base_price: 5500.00 },
  { id: 2, title: 'Sunset Party', descript: 'Evento social privado', client: 2, event_type: 2, event_date: '2024-11-20T17:00:00', e_location: 'Beach Club', e_status: 2, duration_hours: 8, contract_asingned: true, base_price: 3200.00 },
  { id: 3, title: 'Conferencia Tech', descript: 'Lanzamiento de producto', client: 1, event_type: 1, event_date: '2024-05-25T09:00:00', e_location: 'Centro de Convenciones', e_status: 1, duration_hours: 4, contract_asingned: false, base_price: 12000.00 }
];

export const MOCK_INVENTORY: InventoryItem[] = [
  { id: 1, element: 'Luces LED RGBW', unit_price: 100.00, actual_price: 150.00, stock_actual: 45, stock_alert: 50, state: 1, element_type: true, act_date: '2024-01-10' },
  { id: 2, element: 'Pantallas LED P3', unit_price: 800.00, actual_price: 1200.00, stock_actual: 12, stock_alert: 15, state: 1, element_type: true, act_date: '2024-01-15' },
  { id: 3, element: 'Globos de Helio', unit_price: 2.00, actual_price: 5.00, stock_actual: 200, stock_alert: 50, state: 1, element_type: false, act_date: '2024-02-01' }
];

export const MOCK_INVENTORY_ALERTS: InventoryAlert[] = [
  { id: 1, inventory_id: 1, alert_message: 'Stock de Luces LED bajo el mínimo (45/50)', alert_date: '2024-05-10T10:00:00', is_resolved: false },
  { id: 2, inventory_id: 2, alert_message: 'Stock de Pantallas LED crítico (12/15)', alert_date: '2024-05-11T08:30:00', is_resolved: false }
];

export const MOCK_EMPLOYEES: Employee[] = [
  { id: 1, national_id: '402-1234567-1', fullname: 'Esteban Lopez', email: 'esteban@kiav.com', phone: '809-555-1212', workstation: 1, employment_date: '2023-01-01', assigned_user: 1 },
  { id: 2, national_id: '402-1234567-2', fullname: 'Maria Garcia', email: 'maria@kiav.com', phone: '809-555-1313', workstation: 2, employment_date: '2023-02-15', assigned_user: 2 }
];

export const MOCK_CLIENTS: Client[] = [
  { id: 1, fullname: 'TechCorp S.A.', national_id: 'RNC-123456789', email: 'v.perez@techcorp.com', phone: '+1 809-555-0123', kind: 1 },
  { id: 2, fullname: 'Juan Perez', national_id: '402-1234567-8', email: 'juan@perez.com', phone: '+1 829-555-0987', kind: 2 }
];

export const MOCK_BILLS: Bill[] = [
  { id: 1, event_id: 1, amount: 5500.00, payment_date: '2024-12-16T10:00:00', payment_method: 1 },
  { id: 2, event_id: 2, amount: 1600.00, payment_date: '2024-11-21T11:00:00', payment_method: 2 }
];

export const MOCK_INVOICES: Invoice[] = [
  { id: 'INV-001', amount: 1500, status: 'Paid' }
];
