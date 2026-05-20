import React, { useState } from 'react';
import { authAPI } from '../../api';
import './Login.css';

const Login = ({ onSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Redirección nativa de JavaScript para saltar la librería rota
    const navigate = (ruta) => { 
        window.history.pushState({}, '', ruta);
        window.dispatchEvent(new PopStateEvent('popstate'));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await authAPI.login(email, password);
            if (typeof onSuccess === 'function') {
                onSuccess(response.user || response);
            }
        } catch (err) {
            const message = err?.message || 'Credenciales inválidas';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-card">
                <i className="fa-solid fa-star sparkle st-top"></i>
                
                <div className="brand-header">
                    <div className="logo-box">
                        <i className="fa-regular fa-calendar-days"></i>
                    </div>
                    <h1 className="logo-text">KIAV<span className="logo-accent">Gestore</span></h1>
                </div>

                <div className="form-title">
                    <h2>BIENVENIDO</h2>
                    <p>INGRESAR CREDENCIALES</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>CORREO ELECTRÓNICO</label>
                        <div className="field">
                            <i className="fa-regular fa-envelope field-icon"></i>
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
                            <i className="fa-solid fa-key field-icon"></i>
                            <input 
                                type={showPassword ? "text" : "password"} 
                                placeholder="••••••••" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                            />
                            <button 
                                type="button" 
                                className="eye-btn"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                        </div>
                    </div>

                        <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? "VERIFICANDO..." : "INICIAR SESIÓN"}
                    </button>
                    {error && (
                        <div className="text-sm text-red-400 font-medium mt-3">{error}</div>
                    )}
                    <div className="form-footer">
                        <p>¿No tienes cuenta? <span className="signup-link" style={{cursor: 'pointer'}} onClick={() => navigate('/register')}>Regístrate</span></p>
                    </div>
                </form>

                <i className="fa-solid fa-star sparkle st-bottom"></i>
            </div>
        </div>
    );
};

export default Login;