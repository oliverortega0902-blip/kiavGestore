import React, { useState } from 'react';
import { authAPI } from '../../api';
import './Register.css';

export default function Register() {

    // ───────────────── STATES ─────────────────

    const [username, setUsername] =
        useState('');

    const [password, setPassword] =
        useState('');

    const [confirmPassword, setConfirmPassword] =
        useState('');

    const [adminUsername, setAdminUsername] =
        useState('');

    const [adminPassword, setAdminPassword] =
        useState('');

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState('');

    // ───────────────── NAVIGATION ─────────────────

    const navigate = (ruta: string) => {

        window.history.pushState({}, '', ruta);

        window.dispatchEvent(
            new PopStateEvent('popstate')
        );
    };

    // ───────────────── SUBMIT ─────────────────

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        setError('');

        // LIMPIAR STRINGS
        const cleanUsername =
            username.trim();

        const cleanAdminUsername =
            adminUsername.trim();

        const cleanPassword =
            password.trim();

        const cleanConfirmPassword =
            confirmPassword.trim();

        const cleanAdminPassword =
            adminPassword.trim();

        // VALIDACIÓN
        if (
            !cleanUsername ||
            !cleanPassword ||
            !cleanConfirmPassword ||
            !cleanAdminUsername ||
            !cleanAdminPassword
        ) {

            setError(
                'Completa todos los campos'
            );

            return;
        }

        // PASSWORDS
        if (
            cleanPassword !==
            cleanConfirmPassword
        ) {

            setError(
                'Las contraseñas no coinciden'
            );

            return;
        }

        // LONGITUD
        if (
            cleanPassword.length < 6
        ) {

            setError(
                'La contraseña debe tener mínimo 6 caracteres'
            );

            return;
        }

        setLoading(true);

        try {

            await authAPI.register(
                cleanUsername,
                cleanPassword,
                cleanAdminUsername,
                cleanAdminPassword
            );

            alert(
                'Usuario registrado con éxito'
            );

            navigate('/login');

        } catch (err: any) {

            console.error(err);

            setError(
                err?.message ||
                'No se pudo registrar el usuario'
            );

        } finally {

            setLoading(false);
        }
    };

    // ───────────────── UI ─────────────────

    return (

        <div className="login-wrapper">

            <div className="login-card register-card">

                <div className="brand-header">

                    <h1 className="logo-text">
                        KIAV
                        <span className="logo-accent">
                            Gestore
                        </span>
                    </h1>

                </div>

                <div className="form-title">

                    <h2>
                        CREAR CUENTA
                    </h2>

                    <p>
                        REGISTRO CORPORATIVO
                    </p>

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="register-grid">

                        {/* USERNAME */}
                        <div className="input-group">

                            <label>
                                USUARIO
                            </label>

                            <div className="field">

                                <input
                                    type="text"
                                    placeholder="usuario"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                        </div>

                        {/* PASSWORD */}
                        <div className="input-group">

                            <label>
                                CONTRASEÑA
                            </label>

                            <div className="field">

                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                        </div>

                        {/* CONFIRM */}
                        <div className="input-group">

                            <label>
                                CONFIRMAR
                            </label>

                            <div className="field">

                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                        </div>

                        {/* ADMIN USER */}
                        <div className="input-group">

                            <label>
                                ADMINISTRADOR
                            </label>

                            <div className="field">

                                <input
                                    type="text"
                                    placeholder="admin"
                                    value={adminUsername}
                                    onChange={(e) =>
                                        setAdminUsername(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                        </div>

                        {/* ADMIN PASSWORD */}
                        <div className="input-group full-width">

                            <label>
                                CONTRASEÑA ADMIN
                            </label>

                            <div className="field">

                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={adminPassword}
                                    onChange={(e) =>
                                        setAdminPassword(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                        </div>

                    </div>

                    <button
                        type="submit"
                        className="register-btn"
                        disabled={loading}
                    >

                        {
                            loading
                                ? 'REGISTRANDO...'
                                : 'REGISTRAR'
                        }

                    </button>

                    {error && (

                        <div className="error-message">

                            {error}

                        </div>
                    )}

                    <div className="form-footer">

                        <p>

                            ¿Ya tienes cuenta?

                            <span
                                className="signup-link"
                                onClick={() =>
                                    navigate('/login')
                                }
                            >
                                {' '}
                                Inicia sesión
                            </span>

                        </p>

                    </div>

                </form>

            </div>

        </div>
    );
}