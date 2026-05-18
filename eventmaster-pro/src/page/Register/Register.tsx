import React, { useState } from 'react';
import './Register.css';

export default function Register() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    // Tipamos explícitamente "ruta" como un string para que no se ponga rojo
    const navigate = (ruta: string) => { 
        window.history.pushState({}, '', ruta);
        window.dispatchEvent(new PopStateEvent('popstate'));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("¡Las contraseñas no coinciden!");
            return;
        }
        
        setLoading(true);
        setTimeout(() => {
            alert("Usuario registrado con éxito");
            setLoading(false);
            navigate('/'); // Regresa al Login
        }, 1500);
    };

    return (
        <div className="login-wrapper">
            <div className="login-card">
                <div className="brand-header">
                    <h1 className="logo-text">K-<span className="logo-accent">DAILY</span></h1>
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
                    
                    <div className="form-footer">
                        <p>¿Ya tienes cuenta? <span className="signup-link" style={{cursor: 'pointer'}} onClick={() => navigate('/')}>Inicia Sesión</span></p>
                    </div>
                </form>
            </div>
        </div>
    );
}