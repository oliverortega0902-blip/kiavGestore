# Configuración de API - EventMaster Pro

## Variables de Entorno

El proyecto utiliza las siguientes variables de entorno para conectarse al backend:

### `.env` (Desarrollo)
```
VITE_API_URL=http://localhost:3001/api
```

### `.env.production` (Producción)
```
VITE_API_URL=https://tu-dominio.com/api
```

## Endpoints del Backend

El cliente espera que el backend tenga los siguientes endpoints:

### Eventos
- `GET /api/events` - Obtener todos los eventos
- `GET /api/events/:id` - Obtener evento por ID
- `POST /api/events` - Crear nuevo evento
- `PUT /api/events/:id` - Actualizar evento
- `DELETE /api/events/:id` - Eliminar evento

### Inventario
- `GET /api/inventory` - Obtener todo el inventario
- `GET /api/inventory/:id` - Obtener item por ID
- `POST /api/inventory` - Crear nuevo item
- `PUT /api/inventory/:id` - Actualizar item
- `DELETE /api/inventory/:id` - Eliminar item
- `GET /api/inventory-alerts` - Obtener alertas de stock

### Empleados
- `GET /api/employees` - Obtener todos los empleados
- `GET /api/employees/:id` - Obtener empleado por ID
- `POST /api/employees` - Crear nuevo empleado
- `PUT /api/employees/:id` - Actualizar empleado
- `DELETE /api/employees/:id` - Eliminar empleado

### Clientes
- `GET /api/clients` - Obtener todos los clientes
- `GET /api/clients/:id` - Obtener cliente por ID
- `POST /api/clients` - Crear nuevo cliente
- `PUT /api/clients/:id` - Actualizar cliente
- `DELETE /api/clients/:id` - Eliminar cliente

### Facturas/Bills
- `GET /api/bills` - Obtener todas las facturas
- `GET /api/bills/:id` - Obtener factura por ID
- `POST /api/bills` - Crear nueva factura
- `PUT /api/bills/:id` - Actualizar factura
- `DELETE /api/bills/:id` - Eliminar factura

## Uso de la API en el código

Importar y usar los módulos de API:

```typescript
import { eventsAPI, inventoryAPI, employeesAPI, clientsAPI, invoicesAPI } from './api';

// Ejemplo: Obtener todos los eventos
const events = await eventsAPI.getAll();

// Ejemplo: Crear un nuevo cliente
const newClient = await clientsAPI.create({
  name: 'Juan Perez',
  email: 'juan@example.com',
  phone: '555-0101',
  company: 'Mi Empresa'
});
```

## CORS Configuration

El backend debe permitir CORS desde `http://localhost:3000` para desarrollo:

```javascript
// En el backend (Express)
const cors = require('cors');

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));
```

## Manejo de Errores

Todos los endpoints deben retornar JSON en el siguiente formato:

### Respuesta Exitosa
```json
{
  "success": true,
  "data": { /* datos */ }
}
```

### Respuesta con Error
```json
{
  "success": false,
  "error": "Mensaje de error descriptivo"
}
```

## Autenticación (Futuro)

Para implementar autenticación, actualizar el archivo `api.ts` para incluir tokens JWT en los headers.
