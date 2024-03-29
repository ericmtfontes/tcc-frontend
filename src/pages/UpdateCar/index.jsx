import React, { useEffect, useState } from "react";

import NavBar from "../../components/NavBar";

import {  getCarById, putCar } from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCar = () => {
    const navigate = useNavigate();
    const [plate, setPlate] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [year, setYear] = useState("");
    const [description, setDescription] = useState("");
    const [pricePerDay, setPricePerDay] = useState("");
    const [status, setStatus] = useState("");
    const {id} = useParams();

    useEffect(() =>{
        loadCar();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await putCar(id, plate, brand, model, category, image, year, description, pricePerDay);
            setStatus(response.status);
        } catch (error) {
            setStatus(error.response.status);
        }
    }

    const loadCar = async () =>{
        const response = await getCarById(id);
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
                        case 200:
                            return (
                                <div class="alert alert-success" role="alert">
                                    Veículo atualizado com sucesso!
                                </div>
                            )
                            case 400:
                            return (
                                <div class="alert alert-danger" role="alert">
                                    veículo já cadastrado anteriormente!
                                </div>
                            )
                    }
                })()}
                <div id="form">
                    <p class="h1">Atualizar</p>
                    <form onSubmit={handleSubmit}>
                        <br />
                        <h3>Dados do veículo</h3>
                        <div class="form-group">
                            <label for="plate">Placa</label>
                            <input type="text" class="form-control" id="plate" placeholder="Exemplo: AAA0000" value={plate} onChange={(e) => setPlate(e.target.value)} required disabled/>
                        </div>
                        <div class="form-group">
                            <label for="brand">Marca</label>
                            <input type="text" class="form-control" id="brand" placeholder="Exemplo: Chevrolet" value={brand} onChange={(e) => setBrand(e.target.value)} required />
                        </div>
                        <div class="form-group">
                            <label for="model">Modelo</label>
                            <input type="text" class="form-control" id="model" placeholder="Exemplo: Onix" value={model} onChange={(e) => setModel(e.target.value)} required />
                        </div>
                        <div class="form-group">
                            <label for="model">Categoria</label>
                            <div class="input-group mb-3">
                                <select class="form-select" id="inputGroupSelect01" value={category} onChange={(e) => setCategory(e.target.value)} required>
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
                            <input type="text" class="form-control" id="image" placeholder="Cole o link da imagem" value={image} onChange={(e) => setImage(e.target.value)} required />
                        </div>
                        <div class="form-group">
                            <label for="year">Ano</label>
                            <input type="number" class="form-control" id="year" placeholder="Exemplo: yyyy" value={year} onChange={(e) => setYear(e.target.value)} required />
                        </div>
                        <div class="form-group">
                            <label for="description">Descrição</label>
                            <input type="text" class="form-control" id="description" placeholder="Exemplo: veículo bem conservado" value={description} onChange={(e) => setDescription(e.target.value)} required />
                        </div>
                        <div class="form-group">
                            <label for="pricePerDay">Preço do aluguel diário</label>
                            <input type="number" class="form-control" id="pricePerDay" placeholder="Exemplo: 000,00" value={pricePerDay} onChange={(e) => setPricePerDay(e.target.value)} required />
                        </div>
                        <br />
                        <button type="submit" class="btn btn-primary">Atualizar</button>
                    </form>
                </div>
            </div>
            <br />
        </div>
    )
}

export default UpdateCar;