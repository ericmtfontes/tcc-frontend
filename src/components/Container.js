function Container({listCars}){
    return (
        <div className="container">
            {
                listCars.map((car, i) =>
                    <div className="card">
                        <img src={car.image} class="card-img-top"/>
                            <div class="card-body">
                                <h5 class="card-title">{car.brand} {car.model}</h5>
                                <p class="card-text">{car.description}</p>
                                <p class="card-text">{car.pricePerDay.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})}</p>
                                <button class="btn btn-outline-success me-2" type="button">Alugar</button>
                            </div>
                    </div>
                )
            }
        </div>
    )
}

export default Container;