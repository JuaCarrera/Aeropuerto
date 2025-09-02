import { useState } from 'react'

const BuscadorVuelos = ({ onBuscar }) => {
  const [origen, setOrigen] = useState('')
  const [destino, setDestino] = useState('')
  const [fecha, setFecha] = useState('')
  const [pasajeros, setPasajeros] = useState(1)

  const ciudades = [
    'Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Bilbao', 
    'Málaga', 'Las Palmas', 'Palma', 'Alicante', 'Córdoba'
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!origen || !destino || !fecha) {
      alert('Por favor completa todos los campos obligatorios')
      return
    }
    if (origen === destino) {
      alert('El origen y destino no pueden ser iguales')
      return
    }
    onBuscar({ origen, destino, fecha, pasajeros })
  }

  const intercambiarCiudades = () => {
    const temp = origen
    setOrigen(destino)
    setDestino(temp)
  }

  return (
    <div className="buscador-vuelos">
      <h2>🔍 Buscar Vuelos</h2>
      <form onSubmit={handleSubmit} className="formulario-busqueda">
        <div className="campos-principales">
          <div className="campo-grupo">
            <label htmlFor="origen">Origen *</label>
            <select 
              id="origen"
              value={origen} 
              onChange={(e) => setOrigen(e.target.value)}
              required
            >
              <option value="">Selecciona origen</option>
              {ciudades.map(ciudad => (
                <option key={ciudad} value={ciudad}>{ciudad}</option>
              ))}
            </select>
          </div>

          <button 
            type="button" 
            className="btn-intercambiar"
            onClick={intercambiarCiudades}
            title="Intercambiar origen y destino"
          >
            ⇄
          </button>

          <div className="campo-grupo">
            <label htmlFor="destino">Destino *</label>
            <select 
              id="destino"
              value={destino} 
              onChange={(e) => setDestino(e.target.value)}
              required
            >
              <option value="">Selecciona destino</option>
              {ciudades.map(ciudad => (
                <option key={ciudad} value={ciudad}>{ciudad}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="campos-secundarios">
          <div className="campo-grupo">
            <label htmlFor="fecha">Fecha de salida *</label>
            <input 
              type="date" 
              id="fecha"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <div className="campo-grupo">
            <label htmlFor="pasajeros">Pasajeros</label>
            <select 
              id="pasajeros"
              value={pasajeros} 
              onChange={(e) => setPasajeros(parseInt(e.target.value))}
            >
              {[1,2,3,4,5,6,7,8,9].map(num => (
                <option key={num} value={num}>{num} pasajero{num > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className="btn-buscar">
          🔍 Buscar Vuelos
        </button>
      </form>

      <div className="consejos-busqueda">
        <h3>💡 Consejos para tu búsqueda</h3>
        <ul>
          <li>Los precios pueden variar según la fecha y disponibilidad</li>
          <li>Reserva con anticipación para mejores precios</li>
          <li>Considera vuelos en días de semana para ahorrar</li>
        </ul>
      </div>
    </div>
  )
}

export default BuscadorVuelos