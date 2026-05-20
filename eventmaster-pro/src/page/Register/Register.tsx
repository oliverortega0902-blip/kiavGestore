import React, { useState } from 'react';
import { authAPI } from '../../api';
import './Register.css';

export default function Register() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    // Tipamos explícitamente "ruta" como un string para que no se ponga rojo
    const navigate = (ruta: string) => { 
        window.history.pushState({}, '', ruta);
        window.dispatchEvent(new PopStateEvent('popstate'));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError("¡Las contraseñas no coinciden!");
            return;
        }
        
        setLoading(true);

        try {
            await authAPI.register(email, password);
            alert("Usuario registrado con éxito");
            navigate('/login'); // Regresa al Login
        } catch (err) {
            setError(err?.message || 'No se pudo registrar el usuario');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-card">
                <div className="brand-header">
                    <h1 className="logo-text">KIAV<span className="logo-accent">Gestore</span></h1>
                </div>

                <div className="form-title">
                    <h2>CREAR CUENTA</h2>
                    <p>REGISTRA TUS DATOS</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>CORREO ELECTRÓNICO</label>
                        <div className="field">
                            <input 
                                type="email" 
                                placeholder="nombre@correo.com" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>CONTRASEÑA</label>
                        <div className="field">
                            <input 
                                type="password" 
                                placeholder="••••••••" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>CONFIRMAR CONTRASEÑA</label>
                        <div className="field">
                            <input 
                                type="password" 
                                placeholder="••••••••" 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required 
                            />
                        </div>
                    </div>

                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? "REGISTRANDO..." : "REGISTRARSE"}
                    </button>
                    {error && (
                        <div className="text-sm text-red-400 font-medium mt-3">{error}</div>
                    )}
                    <div className="form-footer">
                        <p>¿Ya tienes cuenta? <span className="signup-link" style={{cursor: 'pointer'}} onClick={() => navigate('/login')}>Inicia Sesión</span></p>
                    </div>
                </form>
            </div>
        </div>
    );
}