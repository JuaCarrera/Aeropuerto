const ConfirmacionReserva = ({ reserva, onNuevaBusqueda }) => {
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

  const formatearFechaHora = (fechaISO) => {
    return new Date(fechaISO).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const descargarPDF = () => {
    // Simulación de descarga de PDF
    alert('Funcionalidad de descarga de PDF en desarrollo')
  }

  const enviarPorEmail = () => {
    // Simulación de envío por email
    alert(`Confirmación enviada a ${reserva.pasajero.email}`)
  }

  return (
    <div className="confirmacion-reserva">
      <div className="header-confirmacion">
        <div className="icono-exito">✅</div>
        <h2>¡Reserva Confirmada!</h2>
        <p>Tu vuelo ha sido reservado exitosamente</p>
      </div>

      <div className="tarjeta-confirmacion">
        <div className="numero-reserva">
          <h3>Número de Reserva</h3>
          <div className="codigo-reserva">#{reserva.id}</div>
          <p className="fecha-reserva">
            Reservado el {formatearFechaHora(reserva.fechaReserva)}
          </p>
        </div>

        <div className="detalles-vuelo-confirmado">
          <h3>✈️ Detalles del Vuelo</h3>
          <div className="info-vuelo-grid">
            <div className="info-item">
              <span className="label">Ruta:</span>
              <span className="valor">{reserva.vuelo.origen} → {reserva.vuelo.destino}</span>
            </div>
            <div className="info-item">
              <span className="label">Fecha:</span>
              <span className="valor">{formatearFecha(reserva.vuelo.fecha)}</span>
            </div>
            <div className="info-item">
              <span className="label">Hora de salida:</span>
              <span className="valor">{reserva.vuelo.horaSalida}</span>
            </div>
            <div className="info-item">
              <span className="label">Hora de llegada:</span>
              <span className="valor">{reserva.vuelo.horaLlegada}</span>
            </div>
            <div className="info-item">
              <span className="label">Aerolínea:</span>
              <span className="valor">{reserva.vuelo.aerolinea}</span>
            </div>
            <div className="info-item">
              <span className="label">Duración:</span>
              <span className="valor">{reserva.vuelo.duracion}</span>
            </div>
          </div>
        </div>

        <div className="detalles-pasajero">
          <h3>👤 Datos del Pasajero</h3>
          <div className="info-pasajero-grid">
            <div className="info-item">
              <span className="label">Nombre:</span>
              <span className="valor">{reserva.pasajero.nombre} {reserva.pasajero.apellidos}</span>
            </div>
            <div className="info-item">
              <span className="label">Email:</span>
              <span className="valor">{reserva.pasajero.email}</span>
            </div>
            <div className="info-item">
              <span className="label">Teléfono:</span>
              <span className="valor">{reserva.pasajero.telefono}</span>
            </div>
            <div className="info-item">
              <span className="label">Documento:</span>
              <span className="valor">{reserva.pasajero.dni}</span>
            </div>
            <div className="info-item">
              <span className="label">Asientos:</span>
              <span className="valor">{reserva.pasajero.asientos}</span>
            </div>
          </div>
        </div>

        <div className="resumen-pago">
          <h3>💰 Resumen de Pago</h3>
          <div className="total-pagado">
            <span>Total Pagado:</span>
            <span className="precio-total">{formatearPrecio(reserva.total)}</span>
          </div>
          <div className="estado-pago">
            <span className="badge-confirmado">✅ Pago Confirmado</span>
          </div>
        </div>
      </div>

      <div className="instrucciones-viaje">
        <h3>📋 Instrucciones Importantes</h3>
        <div className="lista-instrucciones">
          <div className="instruccion">
            <span className="icono">🕐</span>
            <div>
              <strong>Llegada al aeropuerto:</strong>
              <p>Llega al menos 2 horas antes para vuelos nacionales</p>
            </div>
          </div>
          <div className="instruccion">
            <span className="icono">🆔</span>
            <div>
              <strong>Documentación:</strong>
              <p>Lleva tu DNI/Pasaporte y esta confirmación de reserva</p>
            </div>
          </div>
          <div className="instruccion">
            <span className="icono">🧳</span>
            <div>
              <strong>Equipaje:</strong>
              <p>Revisa las políticas de equipaje de {reserva.vuelo.aerolinea}</p>
            </div>
          </div>
          <div className="instruccion">
            <span className="icono">📱</span>
            <div>
              <strong>Check-in online:</strong>
              <p>Disponible 24h antes del vuelo en la web de la aerolínea</p>
            </div>
          </div>
        </div>
      </div>

      <div className="acciones-confirmacion">
        <button onClick={descargarPDF} className="btn-secundario">
          📄 Descargar PDF
        </button>
        <button onClick={enviarPorEmail} className="btn-secundario">
          📧 Enviar por Email
        </button>
        <button onClick={onNuevaBusqueda} className="btn-principal">
          🔍 Nueva Búsqueda
        </button>
      </div>

      <div className="contacto-soporte">
        <h4>¿Necesitas ayuda?</h4>
        <p>Contacta con nuestro servicio de atención al cliente:</p>
        <div className="info-contacto">
          <span>📞 900 123 456</span>
          <span>📧 soporte@aerotickets.com</span>
        </div>
      </div>
    </div>
  )
}

export default ConfirmacionReserva