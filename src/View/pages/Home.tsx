import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


export default  function Home() {
  return (
    <div className="text-center">
      {/* Banner */}
      <div 
        className="bg-dark text-white d-flex flex-column justify-content-center align-items-center"
        style={{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '60vh',
          width: '100%',
        }}
      >
        {/* Welcome Message */}
        <h1 className="display-4 fw-bold">Bienvenido a SaborExpress 🍽️</h1>
        <p className="lead">Comida deliciosa, rápida y al mejor precio.</p>
        <Link to="/store">
          <Button variant="warning" size="lg">
            Ver Menú
          </Button>
        </Link>
      </div>

      <div className="py-5 px-3">
        <h2 className="mb-4">¿Por qué elegirnos?</h2>
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5>🌮 Variedad de platillos</h5>
            <p>Desde tacos hasta ramen, nuestro menú lo tiene todo.</p>
          </div>
          <div className="col-md-4 mb-4">
            <h5>🚚 Entrega rápida</h5>
            <p>Recibe tu comida caliente en menos de 30 minutos.</p>
          </div>
          <div className="col-md-4 mb-4">
            <h5>⭐ Calidad garantizada</h5>
            <p>Ingredientes frescos y preparación con amor.</p>
          </div>
        </div>
      </div>
    </div>
  )
}