import React, { useState, useEffect, useContext } from "react"

import { useNavigate } from "react-router-dom";

import { AuthContext } from "../contexts/auth";

import { api } from "../services/api";

import "./styles.css"

const NavBar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const recoveredUser = localStorage.getItem('user');
    const token = localStorage.getItem("token");
    const roles = localStorage.getItem("roles");

    if (recoveredUser && token) {
      setUser(JSON.parse(recoveredUser));
      setRoles(JSON.parse(roles));
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  const home = () => {
    navigate("/");
  }

  const login = () => {
    navigate("/login");
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  }

  const register = () => {
    navigate("/register");
  }

  const registerCar = () => {
    navigate("/registerCar");
  }

  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">SISTEMA PARA ALUGUEL DE CARROS</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" href="#" aria-current="page" onClick={home}>Inicio</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" onClick={login}>Iniciar sessão</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" onClick={register}>Cadastre-se</a>
              </li>
              {roles.find((role) => role.role == "ROLE_ADMIN") && (
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <strong>Adminstrador</strong>
                  </a>
                  <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <a class="dropdown-item" href="#" on onClick={registerCar}>Cadastar veículo</a>
                  </div>
                </li>
              )}
            </ul>
            {user && (
              <>
                <span class="navbar-text" >
                  Seja bem vindo, <strong>{user.name}</strong>
                </span>
                <div className="btnExit">
                  <button type="button" class="btn btn-danger" onClick={handleLogout}>Sair</button>
                </div>
              </>

            )}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavBar