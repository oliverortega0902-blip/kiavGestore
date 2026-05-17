export interface EventService {
  id: number;
  title: string;
  descript: string;
  event_date: string;
  e_location: string;
  location?: string;
  base_price: number;
  duration_hours: number;
  event_type?: number;
  event_type_id?: number;
  event_type_name?: string;
  event_type_label?: string;
  customer_id: number;
  client?: number;
  client_id?: number;
  client_name?: string;
  e_status: number | string;
  status?: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
}

export interface EventType {
  id: number;
  name: string;
  description?: string;
}

export interface EventStatus {
  id: number;
  name: string;
  description?: string;
}

export interface InventoryItem {
  id: number;
  name?: string;
  element: string;
  is_reusable: boolean;
  actual_price: number;
  suggested_price: number;
  stock_actual: number;
  stock_alert: number;
  category: string;
  e_condition: string;
  element_type?: number | string;
}

export interface Employee {
  id: number;
  name?: string;
  fullname: string;
  department?: string;
  role?: string;
  workstation: string | number;
  assigned_user: string;
  hiring_date: string;
  status?: 'Active' | 'On Leave' | 'Inactive';
}

export interface Client {
  id: number;
  name?: string;
  fullname: string;
  national_id: string;
  email: string;
  phone: string;
  company?: string;
  kind?: number | string;
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
  payment_method: string;
  payment_date: string;
  status?: 'Paid' | 'Pending' | 'Overdue';
}

export interface InventoryAlert {
  id: number;
  alert_message: string;
  alert_date: string;
  threshold?: number;
  current_stock?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export type Section = 'dashboard' | 'events' | 'inventory' | 'employees' | 'clients' | 'finances' | 'expenses' | 'configuration';
