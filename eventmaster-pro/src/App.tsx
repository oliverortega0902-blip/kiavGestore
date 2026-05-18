import { useState, useEffect } from 'react';
import Login from './page/Login/Login.jsx';
import Dashboard from './page/Dashboard.tsx'; // Importamos el nombre corregido
import Register from './page/Register/Register.tsx';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Si la ruta es /dashboard, renderiza tu panel de K-Daily
  if (currentPath === '/dashboard') {
    return <Dashboard />;
  }

  // Por defecto muestra el Login
  return <Login />;
}

export default App;