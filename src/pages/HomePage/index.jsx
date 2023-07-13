import React, { useState, useEffect } from 'react';

import { api, getCars } from '../../services/api';

import { Link, useNavigate } from "react-router-dom";

import NavBar from '../../components/NavBar';

import "./styles.css"

const HomePage = () => {
    const navigate = useNavigate();
    const [cars, setCars] = useState([]);
    const [user, setUser] = useState("");
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState("");

    useEffect(() => {
        find();
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

    const find = async () => {
        try {
            const response = await getCars();
            const data = response.data;
            setCars(data);
            setStatus(response.status);
        } catch (error) {
            setStatus(error.response.status);
            console.log(error);
        }
    };

    const login = () => {
        navigate("/login");
    }
    const login2 = () => {
        navigate("/registerCar");
    }

    return (
        <div>
            <NavBar />
            {(() => {
                switch (status) {
                    case 200:
                        return (
                            <div class="row row-cols-1 row-cols-md-4">
                                {
                                    cars.map((car) => (
                                        <div class="col mb-4">
                                            <div class="card">
                                                <img src={car.image} class="card-img-top" alt="..." />
                                                <div class="card-body">
                                                    <h5 class="card-title">{car.brand}/{car.model}</h5>
                                                    <p class="h5">{car.pricePerDay.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                                    <p class="h6">{car.year}</p>
                                                    <button type="button" class="btn btn-primary" onClick={!user ? (login) : (login2)}>Alugar</button>
                                                    {roles.find((role) => role.role == "ROLE_ADMIN") && (
                                                        <><button type="button" class="btn btn-warning">Atualizar</button>
                                                            <Link to={`/cars/${car.id}`}><button type="button" class="btn btn-danger">Exluir</button></Link></>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    case 404:
                        return (
                            <>
                                <h3 class="alert-empty-cars">Todos os veículos da plataforma estão alugados. Volte mais tarde!</h3>
                            </>
                        )
                }
            })()}
        </div>
    )
}

export default HomePage
