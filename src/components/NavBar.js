function NavBar(){
    return(
      <nav className="navbar">
        <form class="container-fluid justify-content-start">
          <button class="btn btn-outline-success me-2" type="button">Fazer Login</button>
          <button class="btn btn-outline-success me-2" type="button">Cadastre-se</button>
        </form>
      </nav>
    )
}

export default NavBar;