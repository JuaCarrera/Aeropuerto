import { useState } from 'react'
import BuscadorVuelos from './BuscadorVuelos'
import ListaVuelos from './ListaVuelos'
import FormularioReserva from './FormularioReserva'
import ConfirmacionReserva from './ConfirmacionReserva'
import './CompraTicket.css'

const CompraTicket = () => {
  const [paso, setPaso] = useState(1)
  const [criteriosBusqueda, setCriteriosBusqueda] = useState(null)
  const [vueloSeleccionado, setVueloSeleccionado] = useState(null)
  const [datosReserva, setDatosReserva] = useState(null)
  const [reservaConfirmada, setReservaConfirmada] = useState(null)

  // Datos de ejemplo de vuelos
  const vuelos = [
    {
      id: 1,
      origen: 'Madrid',
      destino: 'Barcelona',
      fecha: '2025-02-15',
      horaSalida: '08:00',
      horaLlegada: '09:30',
      precio: 120,
      aerolinea: 'Iberia',
      duracion: '1h 30m',
      asientosDisponibles: 45
    },
    {
      id: 2,
      origen: 'Madrid',
      destino: 'Valencia',
      fecha: '2025-02-15',
      horaSalida: '10:30',
      horaLlegada: '11:45',
      precio: 95,
      aerolinea: 'Vueling',
      duracion: '1h 15m',
      asientosDisponibles: 32
    },
    {
      id: 3,
      origen: 'Barcelona',
      destino: 'Madrid',
      fecha: '2025-02-16',
      horaSalida: '14:15',
      horaLlegada: '15:45',
      precio: 115,
      aerolinea: 'Iberia',
      duracion: '1h 30m',
      asientosDisponibles: 28
    },
    {
      id: 4,
      origen: 'Madrid',
      destino: 'Sevilla',
      fecha: '2025-02-15',
      horaSalida: '16:20',
      horaLlegada: '17:35',
      precio: 85,
      aerolinea: 'Ryanair',
      duracion: '1h 15m',
      asientosDisponibles: 50
    }
  ]

  const buscarVuelos = (criterios) => {
    setCriteriosBusqueda(criterios)
    setPaso(2)
  }

  const seleccionarVuelo = (vuelo) => {
    setVueloSeleccionado(vuelo)
    setPaso(3)
  }

  const confirmarReserva = (datos) => {
    const reserva = {
      id: Date.now(),
      vuelo: vueloSeleccionado,
      pasajero: datos,
      fechaReserva: new Date().toISOString(),
      total: vueloSeleccionado.precio * datos.asientos,
      estado: 'confirmada'
    }
    setReservaConfirmada(reserva)
    setPaso(4)
  }

  const reiniciarBusqueda = () => {
    setPaso(1)
    setCriteriosBusqueda(null)
    setVueloSeleccionado(null)
    setDatosReserva(null)
    setReservaConfirmada(null)
  }

  const vuelosFiltrados = criteriosBusqueda ? 
    vuelos.filter(vuelo => {
      const coincideOrigen = !criteriosBusqueda.origen || 
        vuelo.origen.toLowerCase().includes(criteriosBusqueda.origen.toLowerCase())
      const coincideDestino = !criteriosBusqueda.destino || 
        vuelo.destino.toLowerCase().includes(criteriosBusqueda.destino.toLowerCase())
      const coincideFecha = !criteriosBusqueda.fecha || vuelo.fecha === criteriosBusqueda.fecha
      
      return coincideOrigen && coincideDestino && coincideFecha
    }) : []

  return (
    <div className="compra-ticket">
      <div className="pasos-indicador">
        <div className={`paso ${paso >= 1 ? 'activo' : ''}`}>
          <span>1</span> Buscar
        </div>
        <div className={`paso ${paso >= 2 ? 'activo' : ''}`}>
          <span>2</span> Seleccionar
        </div>
        <div className={`paso ${paso >= 3 ? 'activo' : ''}`}>
          <span>3</span> Reservar
        </div>
        <div className={`paso ${paso >= 4 ? 'activo' : ''}`}>
          <span>4</span> Confirmar
        </div>
      </div>

      <div className="contenido-paso">
        {paso === 1 && (
          <BuscadorVuelos onBuscar={buscarVuelos} />
        )}
        
        {paso === 2 && (
          <ListaVuelos 
            vuelos={vuelosFiltrados}
            onSeleccionar={seleccionarVuelo}
            onVolver={() => setPaso(1)}
          />
        )}
        
        {paso === 3 && (
          <FormularioReserva 
            vuelo={vueloSeleccionado}
            onConfirmar={confirmarReserva}
            onVolver={() => setPaso(2)}
          />
        )}
        
        {paso === 4 && (
          <ConfirmacionReserva 
            reserva={reservaConfirmada}
            onNuevaBusqueda={reiniciarBusqueda}
          />
        )}
      </div>
    </div>
  )
}

export default CompraTicket