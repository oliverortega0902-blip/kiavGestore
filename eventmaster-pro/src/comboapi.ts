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

// ============ CLIENT TYPES API ============
export const clientTypesAPI = {

  getAll: () =>
    fetchAPI('/clientTypes'),

  getById: (id: number) =>
    fetchAPI(`/clientTypes/${id}`),

  create: (data: any) =>
    fetchAPI('/clientTypes/create', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (data: any) =>
    fetchAPI('/clientTypes/edit', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: number) =>
    fetchAPI(`/clientTypes/${id}`, {
      method: 'DELETE',
    }),

};

// ============ DEPARTMENTS API ============
export const departmentsAPI = {

  getAll: () =>
    fetchAPI('/departments'),

  getById: (id: number) =>
    fetchAPI(`/departments/${id}`),

  create: (data: any) =>
    fetchAPI('/departments/create', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (data: any) =>
    fetchAPI('/departments/edit', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: number) =>
    fetchAPI(`/departments/${id}`, {
      method: 'DELETE',
    }),

};

// ============ ELEMENT STATUS API ============
export const elementStatusAPI = {

  getAll: () =>
    fetchAPI('/elementStatus'),

  getById: (id: number) =>
    fetchAPI(`/elementStatus/${id}`),

  create: (data: any) =>
    fetchAPI('/elementStatus/create', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (data: any) =>
    fetchAPI('/elementStatus/edit', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: number) =>
    fetchAPI(`/elementStatus/${id}`, {
      method: 'DELETE',
    }),

};

// ============ EVENT STATUS API ============
export const eventStatusAPI = {

  getAll: () =>
    fetchAPI('/eventStatus'),

  getById: (id: number) =>
    fetchAPI(`/eventStatus/${id}`),

  create: (data: any) =>
    fetchAPI('/eventStatus/create', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (data: any) =>
    fetchAPI('/eventStatus/edit', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: number) =>
    fetchAPI(`/eventStatus/${id}`, {
      method: 'DELETE',
    }),

};

// ============ EVENT TYPES API ============
export const eventTypesAPI = {

  getAll: () =>
    fetchAPI('/eventTypes'),

  getById: (id: number) =>
    fetchAPI(`/eventTypes/${id}`),

  create: (data: any) =>
    fetchAPI('/eventTypes/create', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (data: any) =>
    fetchAPI('/eventTypes/edit', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: number) =>
    fetchAPI(`/eventTypes/${id}`, {
      method: 'DELETE',
    }),

};

// ============ PAYMENT METHODS API ============
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

// ============ WORKSTATIONS API ============
export const workstationsAPI = {

  getAll: () =>
    fetchAPI('/workstations'),

  getById: (id: number) =>
    fetchAPI(`/workstations/${id}`),

  create: (data: any) =>
    fetchAPI('/workstations/create', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (data: any) =>
    fetchAPI('/workstations/edit', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: number) =>
    fetchAPI(`/workstations/${id}`, {
      method: 'DELETE',
    }),

};

// ============ WORKSTATIONS API ============
export const suppliersAPI = {

  getAll: () =>
    fetchAPI('/suppliers'),

  getById: (id: number) =>
    fetchAPI(`/suppliers/${id}`),

  create: (data: any) =>
    fetchAPI('/suppliers/create', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (data: any) =>
    fetchAPI('/suppliers/edit', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: number) =>
    fetchAPI(`/suppliers/${id}`, {
      method: 'DELETE',
    }),

};