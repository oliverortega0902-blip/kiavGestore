// API Configuration for Backend Connection
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const headers = {
  'Content-Type': 'application/json',
};

/**
 * Fetch wrapper with error handling
 */
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
}


// ============ EVENTS API ============
// ⚠️ No hay una ruta /events genérica — usando eventServices como base
export const eventsAPI = {
  getAll:    ()              => fetchAPI('/eventServices/'),
  getById:   (id: number)   => fetchAPI(`/eventServices/${id}`),
  create:    (data: any)    => fetchAPI('/eventServices', { method: 'POST', body: JSON.stringify(data) }),
  update:    (id: number, data: any) => fetchAPI(`/eventServices/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete:    (id: number)   => fetchAPI(`/eventServices/${id}`, { method: 'DELETE' }),
};

// ============ INVENTORY API ============
export const inventoryAPI = {
  getAll:    ()              => fetchAPI('/inventory'),
  getById:   (id: number)   => fetchAPI(`/inventory/${id}`),
  create:    (data: any)    => fetchAPI(' /inventory', { method: 'POST', body: JSON.stringify(data) }),
  update:    (id: number, data: any) => fetchAPI(`/inventory/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete:    (id: number)   => fetchAPI(`/inventory/${id}`, { method: 'DELETE' }),
  getAlerts: ()              => fetchAPI('/inventoryAlerts'),  // ← guión → camelCase
};

// ============ EMPLOYEES API ============
export const employeesAPI = {
  getAll:    ()              => fetchAPI('/employees'),
  getById:   (id: number)   => fetchAPI(`/employees/${id}`),
  create:    (data: any)    => fetchAPI('/employees', { method: 'POST', body: JSON.stringify(data) }),
  update:    (id: number, data: any) => fetchAPI(`/employees/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete:    (id: number)   => fetchAPI(`/employees/${id}`, { method: 'DELETE' }),
};

// ============ CLIENTS API ============
export const clientsAPI = {
  getAll:    ()              => fetchAPI('/clients'),
  getById:   (id: number)   => fetchAPI(`/clients/${id}`),
  create:    (data: any)    => fetchAPI('/clients', { method: 'POST', body: JSON.stringify(data) }),
  update:    (id: number, data: any) => fetchAPI(`/clients/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete:    (id: number)   => fetchAPI(`/clients/${id}`, { method: 'DELETE' }),
};

// ============ INVOICES API ============
export const invoicesAPI = {
  getAll:    ()              => fetchAPI('/bills'),
  getById:   (id: string)   => fetchAPI(`/bills/${id}`),
  create:    (data: any)    => fetchAPI('/bills', { method: 'POST', body: JSON.stringify(data) }),
  update:    (id: string, data: any) => fetchAPI(`/bills/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete:    (id: string)   => fetchAPI(`/bills/${id}`, { method: 'DELETE' }),
};