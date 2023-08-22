import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:8080',
});

export const createSession = async (username, password) => {
    return api.post('/users/login', {username, password});
};

export const registerUser = (username, password, name, birthDate) => {
    return api.post('/users/register', {username, password, name, birthDate});
};

export const getCars = () => {
    return api.get('/cars');
};

export const getCarById = (id) => {
    return api.get(`/cars/${id}`);
}

export const postCar = (plate, brand, model, category, image, year, description, pricePerDay) => {
    return api.post('/cars', {plate, brand, model, category, image, year, description, pricePerDay})
};

export const putCar = (id, plate, brand, model, category, image, year, description, pricePerDay) => {
    return api.put(`/cars/${id}`, {plate, brand, model, category, image, year, description, pricePerDay});
}

export const carDelete = (id) => {
    return api.delete(`/cars/${id}`);
}