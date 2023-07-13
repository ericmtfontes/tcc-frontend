import React, { useState, useContext } from 'react';

import { useNavigate } from "react-router-dom";

import { AuthContext } from '../../contexts/auth';

import NavBar from '../../components/NavBar';

import "./styles.css"

const LoginPage = () => {
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(username, password);
            setStatus(response.status);
        } catch (error) {
            setStatus(error.response.status);
        }
    }

    const toRegister = () => {
        navigate("/register");
    }

    const toHome = () => {
        navigate("/");
    }

    return (
        <div>
            <NavBar />
            <div id="login">
                <div id="form">
                    <p class="h1">Iniciar sessão</p>
                    <form onSubmit={handleSubmit}>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" class="form-control" id="email" placeholder="Email"  value={username} onChange={(e) => setUsername(e.target.value)} required/>
                            <small id="emailHelp" class="form-text text-muted">Nunca compartilharemos seu e-mail com mais ninguém.</small>
                        </div>
                        <div class="form-group">
                            <label for="password">Senha</label>
                            <input type="password" class="form-control" id="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                        </div>
                        <br />
                        <button type="submit" class="btn btn-primary">Entrar</button>
                    </form>
                    <div className="actions">
                        <p class="h5"><a onClick={toRegister}><strong>Cadastre-se</strong></a></p>
                    </div>
                </div>
                <br />
                {(() => {
                    switch (status) {
                        case 200:
                            return (
                                {
                                    toHome
                                }
                            )
                        case 403:
                            return (
                                <div class="alert alert-danger" role="alert">
                                    Credenciais inválidas!
                                </div>
                            )
                    }
                })()}
            </div>
        </div>
    )
}

export default LoginPage