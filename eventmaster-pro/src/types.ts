export interface EventService {
  id: number;
  title: string;
  client_id: number;
  client_name: string;
  event_date: string;
  location: string;
  base_price: number;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
}

export interface InventoryItem {
  id: number;
  name: string;
  stock_actual: number;
  stock_alert: number;
  category: string;
}

export interface Employee {
  id: number;
  name: string;
  department: string;
  role: string;
  status: 'Active' | 'On Leave' | 'Inactive';
}

export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  company?: string;
}

export interface Invoice {
  id: string;
  client_id: number;
  client_name: string;
  event_id: number;
  event_title: string;
  amount: number;
  date: string;
  due_date: string;
  status: 'Paid' | 'Pending' | 'Overdue';
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export type Section = 'dashboard' | 'events' | 'inventory' | 'employees' | 'clients' | 'finances';
