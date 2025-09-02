import { useState } from 'react'
import CompraTicket from './ui/Components/compraTicket/CompraTicket'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>✈️ AeroTickets</h1>
        <p>Reserva tu vuelo ideal</p>
      </header>
      <main>
        <CompraTicket />
      </main>
    </div>
  )
}

export default App
