export default function Home() {
    return (
        <div className="bg-light py-5 px-3">
      <div className="container">
        <h2 className="text-center mb-4">Sobre Nosotros</h2>
        <p className="lead text-center mb-5">
          En <strong>SaborExpress</strong> combinamos sabor, rapidez y tecnología para ofrecerte una experiencia gastronómica inigualable. 
        </p>

        <div className="row">
          <div className="col-md-4 mb-4">
            <h5>📜 Nuestra Historia</h5>
            <p>
              Nacimos en 2020 con una idea simple: llevar comida de calidad a cada hogar de forma rápida y accesible.
              Empezamos como una pequeña cocina y hoy servimos a miles de personas cada mes.
            </p>
          </div>

          <div className="col-md-4 mb-4">
            <h5>🎯 Nuestra Misión</h5>
            <p>
              Brindar platos deliciosos con ingredientes frescos, preparados con dedicación y entregados con eficiencia. 
              Queremos que disfrutes cada bocado como si estuvieras en casa.
            </p>
          </div>

          <div className="col-md-4 mb-4">
            <h5>🤝 Compromiso con el Cliente</h5>
            <p>
              Tu satisfacción es nuestra prioridad. Escuchamos tus comentarios y mejoramos constantemente para superar tus expectativas.
            </p>
          </div>
        </div>
      </div>
    </div>
    )
}