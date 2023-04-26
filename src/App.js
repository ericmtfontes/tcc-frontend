import './App.css';
import Container from './components/Container';
import NavBar from './components/NavBar';
import { useEffect, useState } from 'react';

function App() {

  const[cars, setCars] = useState([]);

  useEffect(() =>{
    fetch("http://localhost:8080/cars")
    .then(response => response.json())
    .then(data => setCars(data))
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Container listCars={cars}/>
    </div>
  );
}

export default App;
