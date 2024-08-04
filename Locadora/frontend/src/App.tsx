import React from 'react';
import './App.css';
import ClienteListar from './Components/Cliente/Cliente-Consultar';
import EmprestimoListar from './Components/Emprestimo/Emprestimo-Consultar';
import FilmeListar from './Components/Filme/Filme-Consultar';

function App() {
  return (
    <div className="App">
      <h1>Locadora</h1>
      <ClienteListar></ClienteListar>
      <FilmeListar></FilmeListar>
      <EmprestimoListar></EmprestimoListar>
    </div>
  );
}

export default App;
