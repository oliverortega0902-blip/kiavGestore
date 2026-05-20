// API Configuration for Backend Connection
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const headers = {
  'Content-Type': 'application/json',
};

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      cache: 'no-store',
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    });

    const text = await response.text();
    let data: any = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch (e) {
      data = text;
    }

    if (!response.ok) {
      const findStringInObject = (obj: any): string | null => {
        if (!obj) return null;
        if (typeof obj === 'string') return obj;
        if (typeof obj !== 'object') return null;
        if (Array.isArray(obj)) {
          for (const v of obj) {
            const r = findStringInObject(v);
            if (r) return r;
          }
          return null;
        }
        // object
        for (const key of Object.keys(obj)) {
          const val = obj[key];
          if (typeof val === 'string' && val.trim()) return val;
          const r = findStringInObject(val);
          if (r) return r;
        }
        return null;
      };

      let serverMessage: any = text || `${response.status} ${response.statusText}`;
      if (data && typeof data === 'object') {
        const candidates = ['message', 'msg', 'error', 'detail', 'description', 'sqlmessage', 'hint'];
        for (const k of candidates) {
          if (data[k]) {
            serverMessage = data[k];
            break;
          }
        }

        if (!serverMessage || typeof serverMessage === 'object') {
          const found = findStringInObject(data);
          if (found) serverMessage = found;
          else serverMessage = JSON.stringify(data);
        }
      }

      // log concise info for debugging (avoid dumping raw ODBC or stacks)
      try {
        console.error('API error', { url, status: response.status, statusText: response.statusText, serverMessage });
      } catch (e) {
        console.error('API error (failed to log details)');
      }

      throw new Error(String(serverMessage));
    }

    return data;
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
}

//---------------------------------------------EVENTOS/---------------------------------------------//
// ============ EVENTS API ============
export const eventsAPI = {
  getAll: () => fetchAPI('/eventServices'),
  getById: (id: number) => fetchAPI(`/eventServices/${id}`),
  create: (data: any) => fetchAPI('/eventServices', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: any) => fetchAPI(`/eventServices/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number) => fetchAPI(`/eventServices/${id}`, { method: 'DELETE' }),
};

// ============ TIPOS DE EVENTOS API ============
export const eventTypesAPI = {
  getAll: () => fetchAPI('/eventTypes'),
  getById: (id: number) => fetchAPI(`/eventTypes/${id}`),
  create: (data: any) => fetchAPI('/eventTypes', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: any) => fetchAPI(`/eventTypes/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number) => fetchAPI(`/eventTypes/${id}`, { method: 'DELETE' }),
};

// ============ STATUS DE EVENTOS ============
export const eventStatusAPI = {
  getAll: () => fetchAPI('/eventStatus'),
  getById: (id: number) => fetchAPI(`/eventStatus/${id}`),
  create: (data: any) => fetchAPI('/eventStatus/create', { method: 'POST', body: JSON.stringify(data) }),
  update: (data: any) => fetchAPI('/eventStatus/edit', { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number) => fetchAPI(`/eventStatus/${id}`, { method: 'DELETE' }),
};


//---------------------------------------------INVENTARIO---------------------------------------------//

// ============ INVENTORY API ============
export const inventoryAPI = {
  getAll: () => fetchAPI('/inventory'),
  getById: (id: number) => fetchAPI(`/inventory/${id}`),
  create: (data: any) => fetchAPI('/inventory/create', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: any) => fetchAPI('/inventory/edit', { method: 'PUT', body: JSON.stringify({ id, ...data }) }),
  delete: (id: number) => fetchAPI(`/inventory/${id}`, { method: 'DELETE' }),
  getAlerts: () => fetchAPI('/inventoryAlerts'),  // ← guión → camelCase
};

// ============ element STATUS API ============
export const elementStatusAPI = {
  getAll: () => fetchAPI('/elementStatus'),
  getById: (id: number) => fetchAPI(`/elementStatus/${id}`),
  create: (data: any) => fetchAPI('/elementStatus', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: any) => fetchAPI(`/elementStatus/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number) => fetchAPI(`/elementStatus/${id}`, { method: 'DELETE' }),
};

export const eventItemsAPI = {

  getAll: () =>
    fetchAPI('/eventItems'),

  getById: (id: number) =>
    fetchAPI(`/eventItems/${id}`),

  getByEvent: (eventId: number) =>
    fetchAPI(`/eventItems/${eventId}`),

  create: (data: any) =>
    fetchAPI('/eventItems/create', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (data: any) =>
    fetchAPI('/eventItems/edit', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: number) =>
    fetchAPI(`/eventItems/${id}`, {
      method: 'DELETE',
    }),
};

//---------------------------------------------EMPLEADOS---------------------------------------------//
// ============ EMPLOYEES API ============
export const employeesAPI = {
  getAll: () => fetchAPI('/employees'),
  getById: (id: number) => fetchAPI(`/employees/${id}`),
  create: (data: any) => fetchAPI('/employees/create', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: any) => fetchAPI('/employees/edit', { method: 'PUT', body: JSON.stringify({ id, ...data }) }),
  delete: (id: number) => fetchAPI(`/employees/${id}`, { method: 'DELETE' }),
};

// ============ WORKSTATIONS API ============
export const workstationsAPI = {
  getAll: () => fetchAPI('/workstations'),
  getById: (id: number) => fetchAPI(`/workstations/${id}`),
  create: (data: any) => fetchAPI('/workstations/create', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: any) => fetchAPI('/workstations/edit', { method: 'PUT', body: JSON.stringify({ id, ...data }) }),
  delete: (id: number) => fetchAPI(`/workstations/${id}`, { method: 'DELETE' }),
};

// ============ USERS API ============
export const usersAPI = {
  getAll: () => fetchAPI('/users'),
  getById: (id: number) => fetchAPI(`/users/${id}`),
  create: (data: any) => fetchAPI('/users/create', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: any) => fetchAPI('/users/edit', { method: 'PUT', body: JSON.stringify({ id, ...data }) }),
  delete: (id: number) => fetchAPI(`/users/${id}`, { method: 'DELETE' }),
};

export const userRolesAPI = {
  getByUserId: (userId: number) => fetchAPI(`/userRoles/${userId}`),
  getAll: () => fetchAPI('/userRoles'),
};

export const rolesAPI = {
  getAll: () => fetchAPI('/roles'),
  getById: (id: number) => fetchAPI(`/roles/${id}`),
};

export const authAPI = {
  login: (username: string, password: string) => fetchAPI('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) }),
  register: (username: string, password: string) => fetchAPI('/auth/register', { method: 'POST', body: JSON.stringify({ username, password }) }),
  changePassword: (username: string, oldPassword: string, newPassword: string) => fetchAPI('/auth/change-password', { method: 'POST', body: JSON.stringify({ username, oldPassword, newPassword }) }),
};

export const eventEmployeesAPI = {

  getAll: () =>
    fetchAPI('/eventEmployees'),

  getById: (id: number) =>
    fetchAPI(`/eventEmployees/${id}`),

  getByEvent: (eventId: number) =>
    fetchAPI(`/eventEmployees/${eventId}`),

  create: (data: any) =>
    fetchAPI('/eventEmployees/add', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (data: any) =>
    fetchAPI('/eventEmployees/edit', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: number) =>
    fetchAPI(`/eventEmployees/${id}`, {
      method: 'DELETE',
    }),
};

//---------------------------------------------Clientes---------------------------------------------//

// ============ CLIENTS API ============
export const clientsAPI = {
  getAll: () => fetchAPI('/clients'),
  getById: (id: number) => fetchAPI(`/clients/${id}`),
  create: (data: any) => fetchAPI('/clients/create', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: any) => fetchAPI('/clients/edit', { method: 'PUT', body: JSON.stringify({ id, ...data }) }),
  delete: (id: number) => fetchAPI(`/clients/${id}`, { method: 'DELETE' }),
};

// ============ CLIENT TYPES API ============
export const clientTypesAPI = {
  getAll: () => fetchAPI('/clientTypes'),
  getById: (id: number) => fetchAPI(`/clientTypes/${id}`),
  create: (data: any) => fetchAPI('/clientTypes/create', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  update: (data: any) => fetchAPI('/clientTypes/edit', {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  delete: (id: number) => fetchAPI(`/clientTypes/${id}`, {
    method: 'DELETE'
  }),
};

//---------------------------------------------Finanzas---------------------------------------------//
//---------------------------------------------ingresos---------------------------------------------//
// ============ INVOICES API ============
export const invoicesAPI = {
  getAll: () =>
    fetchAPI('/bills'),

  getById: (id: number) =>
    fetchAPI(`/bills/${id}`),

  create: (data: any) =>
    fetchAPI('/bills/create', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (data: any) =>
    fetchAPI('/bills/edit', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: number) =>
    fetchAPI(`/bills/${id}`, {
      method: 'DELETE',
    }),
};


export const paymentMethodsAPI = {
  getAll: () =>
    fetchAPI('/paymentMethods'),

  getById: (id: number) =>
    fetchAPI(`/paymentMethods/${id}`),

  create: (data: any) =>
    fetchAPI('/paymentMethods/create', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (data: any) =>
    fetchAPI('/paymentMethods/edit', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: number) =>
    fetchAPI(`/paymentMethods/${id}`, {
      method: 'DELETE',
    }),
};

//---------------------------------------------egresos---------------------------------------------//
export const expensesAPI = {

  getAll: () =>
    fetchAPI('/expenses'),

  getById: (id: number) =>
    fetchAPI(`/expenses/${id}`),

  create: (data: any) =>
    fetchAPI('/expenses/create', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (data: any) =>
    fetchAPI('/expenses/edit', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: number) =>
    fetchAPI(`/expenses/${id}`, {
      method: 'DELETE',
    }),
};

//---------------------------------------------backups---------------------------------------------//
export const backupAPI = {

  createFull: () =>
    fetchAPI('/backup/full', {
      method: 'POST',
    }),

  createLog: () =>
    fetchAPI('/backup/log', {
      method: 'POST',
    }),

};