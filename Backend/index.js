const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Datos de ejemplo (en producción usarías MongoDB)
const vuelos = [
  {
    id: 1,
    origen: 'Madrid',
    destino: 'Barcelona',
    fecha: '2025-02-15',
    hora: '08:00',
    precio: 120,
    aerolinea: 'Iberia',
    asientosDisponibles: 45
  },
  {
    id: 2,
    origen: 'Madrid',
    destino: 'Valencia',
    fecha: '2025-02-15',
    hora: '10:30',
    precio: 95,
    aerolinea: 'Vueling',
    asientosDisponibles: 32
  },
  {
    id: 3,
    origen: 'Barcelona',
    destino: 'Madrid',
    fecha: '2025-02-16',
    hora: '14:15',
    precio: 115,
    aerolinea: 'Iberia',
    asientosDisponibles: 28
  }
];

const reservas = [];

// Rutas
app.get('/api/vuelos', (req, res) => {
  const { origen, destino, fecha } = req.query;
  
  let vuelosFiltrados = vuelos;
  
  if (origen) {
    vuelosFiltrados = vuelosFiltrados.filter(v => 
      v.origen.toLowerCase().includes(origen.toLowerCase())
    );
  }
  
  if (destino) {
    vuelosFiltrados = vuelosFiltrados.filter(v => 
      v.destino.toLowerCase().includes(destino.toLowerCase())
    );
  }
  
  if (fecha) {
    vuelosFiltrados = vuelosFiltrados.filter(v => v.fecha === fecha);
  }
  
  res.json(vuelosFiltrados);
});

app.post('/api/reservas', (req, res) => {
  const { vueloId, pasajero, asientos } = req.body;
  
  const vuelo = vuelos.find(v => v.id === vueloId);
  
  if (!vuelo) {
    return res.status(404).json({ error: 'Vuelo no encontrado' });
  }
  
  if (vuelo.asientosDisponibles < asientos) {
    return res.status(400).json({ error: 'No hay suficientes asientos disponibles' });
  }
  
  const reserva = {
    id: reservas.length + 1,
    vueloId,
    pasajero,
    asientos,
    fechaReserva: new Date().toISOString(),
    total: vuelo.precio * asientos,
    estado: 'confirmada'
  };
  
  reservas.push(reserva);
  vuelo.asientosDisponibles -= asientos;
  
  res.status(201).json(reserva);
});

app.get('/api/reservas/:id', (req, res) => {
  const reserva = reservas.find(r => r.id === parseInt(req.params.id));
  
  if (!reserva) {
    return res.status(404).json({ error: 'Reserva no encontrada' });
  }
  
  res.json(reserva);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});