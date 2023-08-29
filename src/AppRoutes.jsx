import React, {useContext} from  'react';

import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from "react-router-dom";

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import RegisterCar from './pages/RegisterCar';

import { AuthProvider,  AuthContext} from "./contexts/auth";
import UpdateCar from './pages/UpdateCar';
import RentCar from './pages/RentCar';

const AppRoutes = () => {
    const Private = ({children}) => {
        const{authenticated, loading} = useContext(AuthContext);
        if(loading){
            return <div className="loading">Carregando...</div>
        }
        if(!authenticated){
            return <Navigate to="/" />
        }
        return children;
    }

    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route exact path="/login" element={<LoginPage/>}/>
                    <Route exact path="/register-car" element={<Private><RegisterCar/></Private>}/>
                    <Route exact path="/update-car/:id" element={<Private><UpdateCar/></Private>}/>
                    <Route exact path="/rent-car/:idCar" element={<Private><RentCar/></Private>}/>
                    <Route exact path="/" element={<HomePage/>}/>
                    <Route exact path="/register" element={<RegisterPage/>}/>
                </Routes>
            </AuthProvider>
        </Router>
    )
}

export default AppRoutes;