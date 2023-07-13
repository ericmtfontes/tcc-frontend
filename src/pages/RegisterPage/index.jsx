import React, { useState} from 'react';

import { registerUser } from '../../services/api';

import NavBar from '../../components/NavBar';

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [n, setN] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await registerUser(username, password, n, birthDate);
            setStatus(response.status);
        } catch (error) {
            setStatus(error.response.status);
        }
    }

    return (
        <div>
            <NavBar />
            <div id="login">
                <div id="form">
                    <p class="h1">Cadastre-se</p>
                    <form onSubmit={handleSubmit}>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" class="form-control" id="email" placeholder="Email" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                            <small id="emailHelp" class="form-text text-muted">Nunca compartilharemos seu e-mail com mais ninguém.</small>
                        </div>
                        <div class="form-group">
                            <label for="password">Senha</label>
                            <input type="password" class="form-control" id="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                        </div>
                        <div class="form-group">
                            <label for="name">Nome</label>
                            <input type="text" class="form-control" id="name" placeholder="Nome" value={n} onChange={(e) => setN(e.target.value)} required/>
                        </div>
                        <div class="form-group">
                            <label for="date">Data de nascimento</label>
                            <input type="date" class="form-control" id="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required/>
                        </div>
                        <br />
                        <button type="submit" class="btn btn-primary">Cadastre-se</button>
                    </form>
                </div><br />
                {(() => {
                    switch (status) {
                        case 201:
                            return (
                                <div class="alert alert-success" role="alert">
                                    Cadastrado com sucesso!
                                </div>
                            )
                        case 400:
                            return (
                                <div class="alert alert-danger" role="alert">
                                    Email já cadastrado!
                                </div>
                            )
                    }
                })()}
            </div>
        </div>
    )
}

export default RegisterPage