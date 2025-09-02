import { useState } from 'react'

const FormularioReserva = ({ vuelo, onConfirmar, onVolver }) => {
    const [datosPersonales, setDatosPersonales] = useState({
        nombre: '',
        apellidos: '',
        email: '',
        telefono: '',
        dni: '',
        fechaNacimiento: ''
    })

    const [asientos, setAsientos] = useState(1)
    const [equipaje, setEquipaje] = useState('basico')
    const [seguro, setSeguro] = useState(false)
    const [terminosAceptados, setTerminosAceptados] = useState(false)

    const precios = {
        basico: 0,
        equipaje: 25,
        seguro: 15
    }

    const calcularTotal = () => {
        let total = vuelo.precio * asientos
        if (equipaje === 'equipaje') total += precios.equipaje * asientos
        if (seguro) total += precios.seguro * asientos
        return total
    }

    const handleInputChange = (campo, valor) => {
        setDatosPersonales(prev => ({
            ...prev,
            [campo]: valor
        }))
    }

    const validarFormulario = () => {
        const { nombre, apellidos, email, telefono, dni } = datosPersonales

        if (!nombre || !apellidos || !email || !telefono || !dni) {
            alert('Por favor completa todos los campos obligatorios')
            return false
        }

        if (!email.includes('@')) {
            alert('Por favor ingresa un email válido')
            return false
        }

        if (!terminosAceptados) {
            alert('Debes aceptar los términos y condiciones')
            return false
        }

        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!validarFormulario()) return

        const datosReserva = {
            ...datosPersonales,
            asientos,
            equipaje,
            seguro,
            total: calcularTotal()
        }

        onConfirmar(datosReserva)
    }

    const formatearPrecio = (precio) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR'
        }).format(precio)
    }

    return (
        <div className="formulario-reserva">
            <div className="header-reserva">
                <button onClick={onVolver} className="btn-volver">
                    ← Volver a vuelos
                </button>
                <h2>Completar Reserva</h2>
            </div>

            <div className="resumen-vuelo-seleccionado">
                <h3>✈️ Vuelo Seleccionado</h3>
                <div className="info-vuelo-compacta">
                    <span>{vuelo.origen} → {vuelo.destino}</span>
                    <span>{vuelo.fecha} - {vuelo.horaSalida}</span>
                    <span>{vuelo.aerolinea}</span>
                    <span className="precio-base">{formatearPrecio(vuelo.precio)}/persona</span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="form-reserva">
                <div className="seccion-formulario">
                    <h3>👤 Datos del Pasajero Principal</h3>
                    <div className="campos-grid">
                        <div className="campo">
                            <label htmlFor="nombre">Nombre *</label>
                            <input
                                type="text"
                                id="nombre"
                                value={datosPersonales.nombre}
                                onChange={(e) => handleInputChange('nombre', e.target.value)}
                                required
                            />
                        </div>

                        <div className="campo">
                            <label htmlFor="apellidos">Apellidos *</label>
                            <input
                                type="text"
                                id="apellidos"
                                value={datosPersonales.apellidos}
                                onChange={(e) => handleInputChange('apellidos', e.target.value)}
                                required
                            />
                        </div>

                        <div className="campo">
                            <label htmlFor="email">Email *</label>
                            <input
                                type="email"
                                id="email"
                                value={datosPersonales.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                required
                            />
                        </div>

                        <div className="campo">
                            <label htmlFor="telefono">Teléfono *</label>
                            <input
                                type="tel"
                                id="telefono"
                                value={datosPersonales.telefono}
                                onChange={(e) => handleInputChange('telefono', e.target.value)}
                                required
                            />
                        </div>

                        <div className="campo">
                            <label htmlFor="dni">DNI/Pasaporte *</label>
                            <input
                                type="text"
                                id="dni"
                                value={datosPersonales.dni}
                                onChange={(e) => handleInputChange('dni', e.target.value)}
                                required
                            />
                        </div>

                        <div className="campo">
                            <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
                            <input
                                type="date"
                                id="fechaNacimiento"
                                value={datosPersonales.fechaNacimiento}
                                onChange={(e) => handleInputChange('fechaNacimiento', e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="seccion-formulario">
                    <h3>🎫 Opciones de Reserva</h3>

                    <div className="campo">
                        <label htmlFor="asientos">Número de Asientos</label>
                        <select
                            id="asientos"
                            value={asientos}
                            onChange={(e) => setAsientos(parseInt(e.target.value))}
                        >
                            {Array.from({ length: Math.min(vuelo.asientosDisponibles, 9) }, (_, i) => i + 1).map(num => (
                                <option key={num} value={num}>{num} asiento{num > 1 ? 's' : ''}</option>
                            ))}
                        </select>
                    </div>

                    <div className="campo">
                        <label>Equipaje</label>
                        <div className="opciones-radio">
                            <label className="opcion-radio">
                                <input
                                    type="radio"
                                    name="equipaje"
                                    value="basico"
                                    checked={equipaje === 'basico'}
                                    onChange={(e) => setEquipaje(e.target.value)}
                                />
                                <span>Solo equipaje de mano (incluido)</span>
                            </label>
                            <label className="opcion-radio">
                                <input
                                    type="radio"
                                    name="equipaje"
                                    value="equipaje"
                                    checked={equipaje === 'equipaje'}
                                    onChange={(e) => setEquipaje(e.target.value)}
                                />
                                <span>Equipaje facturado (+{formatearPrecio(precios.equipaje)} por persona)</span>
                            </label>
                        </div>
                    </div>

                    <div className="campo">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={seguro}
                                onChange={(e) => setSeguro(e.target.checked)}
                            />
                            <span>Seguro de viaje (+{formatearPrecio(precios.seguro)} por persona)</span>
                        </label>
                    </div>
                </div>

                <div className="resumen-precio">
                    <h3>💰 Resumen de Precios</h3>
                    <div className="desglose-precio">
                        <div className="linea-precio">
                            <span>Vuelo ({asientos} asiento{asientos > 1 ? 's' : ''})</span>
                            <span>{formatearPrecio(vuelo.precio * asientos)}</span>
                        </div>
                        {equipaje === 'equipaje' && (
                            <div className="linea-precio">
                                <span>Equipaje facturado</span>
                                <span>{formatearPrecio(precios.equipaje * asientos)}</span>
                            </div>
                        )}
                        {seguro && (
                            <div className="linea-precio">
                                <span>Seguro de viaje</span>
                                <span>{formatearPrecio(precios.seguro * asientos)}</span>
                            </div>
                        )}
                        <div className="linea-precio total">
                            <span><strong>Total</strong></span>
                            <span><strong>{formatearPrecio(calcularTotal())}</strong></span>
                        </div>
                    </div>
                </div>

                <div className="terminos">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={terminosAceptados}
                            onChange={(e) => setTerminosAceptados(e.target.checked)}
                            required
                        />
                        <span>Acepto los <a href="#" target="_blank">términos y condiciones</a> y la <a href="#" target="_blank">política de privacidad</a> *</span>
                    </label>
                </div>

                <button type="submit" className="btn-confirmar-reserva">
                    Confirmar Reserva - {formatearPrecio(calcularTotal())}
                </button>
            </form>
        </div>
    )
}

export default FormularioReserva;