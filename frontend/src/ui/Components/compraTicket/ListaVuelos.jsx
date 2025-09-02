const ListaVuelos = ({ vuelos, onSeleccionar, onVolver }) => {
  if (vuelos.length === 0) {
    return (
      <div className="lista-vuelos">
        <div className="header-lista">
          <button onClick={onVolver} className="btn-volver">
            ← Volver a buscar
          </button>
          <h2>Vuelos Disponibles</h2>
        </div>
        
        <div className="sin-resultados">
          <div className="icono-sin-resultados">✈️</div>
          <h3>No se encontraron vuelos</h3>
          <p>No hay vuelos disponibles para los criterios seleccionados.</p>
          <p>Intenta cambiar las fechas o destinos.</p>
        </div>
      </div>
    )
  }

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(precio)
  }

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="lista-vuelos">
      <div className="header-lista">
        <button onClick={onVolver} className="btn-volver">
          ← Volver a buscar
        </button>
        <h2>Vuelos Disponibles ({vuelos.length})</h2>
      </div>

      <div className="vuelos-container">
        {vuelos.map(vuelo => (
          <div key={vuelo.id} className="tarjeta-vuelo">
            <div className="info-vuelo">
              <div className="ruta">
                <div className="ciudad-hora">
                  <span className="ciudad">{vuelo.origen}</span>
                  <span className="hora">{vuelo.horaSalida}</span>
                </div>
                
                <div className="conexion">
                  <div className="linea-vuelo">
                    <div className="punto-origen"></div>
                    <div className="linea"></div>
                    <div className="avion">✈️</div>
                    <div className="linea"></div>
                    <div className="punto-destino"></div>
                  </div>
                  <span className="duracion">{vuelo.duracion}</span>
                </div>
                
                <div className="ciudad-hora">
                  <span className="ciudad">{vuelo.destino}</span>
                  <span className="hora">{vuelo.horaLlegada}</span>
                </div>
              </div>

              <div className="detalles-vuelo">
                <div className="fecha">
                  📅 {formatearFecha(vuelo.fecha)}
                </div>
                <div className="aerolinea">
                  🏢 {vuelo.aerolinea}
                </div>
                <div className="asientos">
                  💺 {vuelo.asientosDisponibles} asientos disponibles
                </div>
              </div>
            </div>

            <div className="precio-seleccion">
              <div className="precio">
                <span className="desde">desde</span>
                <span className="cantidad">{formatearPrecio(vuelo.precio)}</span>
                <span className="por-persona">por persona</span>
              </div>
              
              <button 
                onClick={() => onSeleccionar(vuelo)}
                className="btn-seleccionar"
                disabled={vuelo.asientosDisponibles === 0}
              >
                {vuelo.asientosDisponibles === 0 ? 'Agotado' : 'Seleccionar'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="info-adicional">
        <div className="nota">
          <strong>Nota:</strong> Los precios mostrados son por persona e incluyen tasas e impuestos.
        </div>
      </div>
    </div>
  )
}

export default ListaVuelos