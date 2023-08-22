import React, { useState, useEffect } from 'react';

import { api, getCars, carDelete } from '../../services/api';

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
        }
    };

    const deleteCar = (id) => {
        alert(`Voce está exluindo o veículo de id: ${id}`);
        carDelete(id);
        window.location.reload();
    }

    const login = () => {
        navigate("/login");
    }
    const login2 = () => {
        navigate("/register-car");
    }

    return (
        <div>
            <NavBar />
            {(() => {
                switch (status) {
                    case 200:
                        return (
                            <div class="row row-cols-1 row-cols-md-3">
                                {
                                    cars.map((car) => (
                                        <div class="col mb-3">
                                            <div class="card">
                                                <img src={car.image} class="card-img-top"/>
                                                <div class="card-body">
                                                    <h5 class="card-title">{car.brand}/{car.model} - {car.year}</h5>
                                                    <p class="h5">{car.pricePerDay.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                                    <button type="button" class="btn btn-primary" onClick={!user ? (login) : (login2)}>Alugar</button>
                                                    {roles.find((role) => role.role == "ROLE_ADMIN") && (
                                                        <><Link type="button" class="btn btn-warning"
                                                        to={`/update-car/${car.id}`}
                                                        >Atualizar</Link>
                                                            <><button type="button" class="btn btn-danger" onClick={() => deleteCar(car.id)}>Exluir</button></></>
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
