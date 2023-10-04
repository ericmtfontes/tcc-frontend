import React, { useEffect, useState } from "react";

import NavBar from "../../components/NavBar";

import {  getCarById, rentCar } from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";

const RentCar = () => {
    const {idCar} = useParams();
    const [plate, setPlate] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [year, setYear] = useState("");
    const [description, setDescription] = useState("");
    const [pricePerDay, setPricePerDay] = useState("");
    const [user, setUser] = useState("");
    const [day, setDay] = useState();
    const [status, setStatus] = useState("");

    useEffect(() =>{
        loadCar();
        const recoveredUser = localStorage.getItem('user');
        setUser(JSON.parse(recoveredUser));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await rentCar(idCar, user.id, day);
            setStatus(response.status);
        } catch (error) {
            setStatus(error.response.status);
        }
    }

    const loadCar = async () =>{
        const response = await getCarById(idCar);
        console.log(response.data);
        setPlate(response.data.plate);
        setBrand(response.data.brand);
        setModel(response.data.model);
        setCategory(response.data.category);
        setImage(response.data.image);
        setYear(response.data.year);
        setDescription(response.data.description);
        setPricePerDay(response.data.pricePerDay);
    }

    return (
        <div>
            <NavBar />
            <br />
            <div id="login">
            {(() => {
                    switch (status) {
                        case 201:
                            return (
                                <div class="alert alert-success" role="alert">
                                    Aluguel Realizado com sucesso!
                                </div>
                            )
                            case 400:
                            return (
                                <div class="alert alert-danger" role="alert">
                                    Não foi possível realizar o aluguel!
                                </div>
                            )
                    }
                })()}
                <div id="form">
                    <p class="h1">Alugar</p>
                    <form onSubmit={handleSubmit}>
                        <br />
                        <h3>Dados do veículo</h3>
                        <div class="form-group">
                            <label for="idCar">Id</label>
                            <input type="number" class="form-control" id="idCar" value={idCar} disabled/>
                        </div>
                        <div class="form-group">
                            <label for="plate">Placa</label>
                            <input type="text" class="form-control" id="plate" value={plate} disabled/>
                        </div>
                        <div class="form-group">
                            <label for="brand">Marca</label>
                            <input type="text" class="form-control" id="brand" value={brand} disabled/>
                        </div>
                        <div class="form-group">
                            <label for="model">Modelo</label>
                            <input type="text" class="form-control" id="model" value={model} disabled/>
                        </div>
                        <div class="form-group">
                            <label for="model">Categoria</label>
                            <div class="input-group mb-3">
                                <select class="form-select" id="inputGroupSelect01" value={category} disabled> 
                                    <option selected>Escolha...</option>
                                    <option value="HATCH">HATCH</option>
                                    <option value="SEDAN">SEDAN</option>
                                    <option value="PICAPE">PICAPE</option>
                                    <option value="SUV">SUV</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="image">Imagem</label>
                            <input type="text" class="form-control" id="image" value={image} disabled/>
                        </div>
                        <div class="form-group">
                            <label for="year">Ano</label>
                            <input type="number" class="form-control" id="year" value={year} disabled/>
                        </div>
                        <div class="form-group">
                            <label for="description">Descrição</label>
                            <input type="text" class="form-control" id="description" value={description} disabled/>
                        </div>
                        <div class="form-group">
                            <label for="pricePerDay">Preço do aluguel diário</label>
                            <input type="number" class="form-control" id="pricePerDay" value={pricePerDay} disabled/>
                        </div>
                        <br />
                        <h3>Dados do locatário</h3>
                        <div class="form-group">
                            <label for="idUser">Id</label>
                            <input type="number" class="form-control" id="idUser" value={user.id} disabled/>
                        </div>
                        <div class="form-group">
                            <label for="nameUser">Nome</label>
                            <input type="text" class="form-control" id="nameUser" value={user.name} disabled/>
                        </div>
                        <div class="form-group">
                            <label for="day">Deseja alugar por quantos dias?</label>
                            <input type="number" class="form-control" id="day" placeholder="Exemplo: 2" value={day} onChange={(e) => setDay(e.target.value)} required/>
                        </div>
                        <br />
                        <button type="submit" class="btn btn-primary">Confirmar aluguel</button>
                    </form>
                </div>
            </div>
            <br />
        </div>
    )
}

export default RentCar;