import React, { useState } from 'react';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // Redirección nativa de JavaScript para saltar la librería rota
    const navigate = (ruta) => { 
        window.history.pushState({}, '', ruta);
        window.dispatchEvent(new PopStateEvent('popstate'));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        
        // Simulación de carga y validación
        setTimeout(() => {
            console.log(`Acceso concedido para: ${email}`);
            setLoading(false);
            
            // Redirigir al dashboard de K-Daily
            navigate('/dashboard');
        }, 1500);
    };

    return (
        <div className="login-wrapper">
            <div className="login-card">
                <i className="fa-solid fa-star sparkle st-top"></i>
                
                <div className="brand-header">
                    <div className="logo-box">
                        <i className="fa-regular fa-calendar-days"></i>
                    </div>
                    <h1 className="logo-text">K-<span className="logo-accent">DAILY</span></h1>
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