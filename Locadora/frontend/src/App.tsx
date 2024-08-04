import React from 'react';
import './App.css'; 
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import ClienteListar from './Components/Cliente/Cliente-Consultar';
import ClienteCadastrar from './Components/Cliente/Cliente-Cadastrar';
import ClienteDeletar from './Components/Cliente/Cliente-Deletar';
import ClienteAlterar from './Components/Cliente/Cliente-Alterar';
import FilmeListar from './Components/Filme/Filme-Consultar';
import FilmeCadastrar from './Components/Filme/Filme-Cadastrar';
import FilmeDeletar from './Components/Filme/Filme-Deletar';
import FilmeAlterar from './Components/Filme/Filme-Alterar';
import EmprestimoListar from './Components/Emprestimo/Emprestimo-Consultar';
import EmprestimoCadastrar from './Components/Emprestimo/Emprestimo-Cadastrar';
import EmprestimoDeletar from './Components/Emprestimo/Emprestimo-Deletar';

function App() {
  return (
    <div className="app-container">
      <h1 className="header">Locadora</h1>
      <BrowserRouter>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-section-title">Clientes</li>
            <ul className="nav-sublist">
              <li className="nav-subitem">
                <Link to="/pages/cliente/listar" className="nav-sublink">Listar Clientes</Link>
              </li>
              <li className="nav-subitem">
                <Link to="/pages/cliente/cadastrar" className="nav-sublink">Cadastrar Cliente</Link>
              </li>
              <li className="nav-subitem">
                <Link to="/pages/cliente/deletar" className="nav-sublink">Deletar ou Alterar Clientes</Link>
              </li>
            </ul>
            <li className="nav-section-title">Filmes</li>
            <ul className="nav-sublist">
              <li className="nav-subitem">
                <Link to="/pages/filme/listar" className="nav-sublink">Listar Filmes</Link>
              </li>
              <li className="nav-subitem">
                <Link to="/pages/filme/cadastrar" className="nav-sublink">Cadastrar Filme</Link>
              </li>
              <li className="nav-subitem">
                <Link to="/pages/filme/deletar" className="nav-sublink">Deletar ou Alterar Filmes</Link>
              </li>
            </ul>
            <li className="nav-section-title">Empréstimos</li>
            <ul className="nav-sublist">
              <li className="nav-subitem">
                <Link to="/pages/emprestimo/listar" className="nav-sublink">Listar Empréstimos</Link>
              </li>
              <li className="nav-subitem">
                <Link to="/pages/emprestimo/cadastrar" className="nav-sublink">Realizar Empréstimo</Link>
              </li>
              <li className="nav-subitem">
                <Link to="/pages/emprestimo/deletar" className="nav-sublink">Devolver ou Renovar Empréstimos</Link>
              </li>
            </ul>
          </ul>
        </nav>
        <Routes>
          <Route path='/pages/cliente/listar' element={<ClienteListar />} />
          <Route path='/pages/cliente/cadastrar' element={<ClienteCadastrar />} />
          <Route path='/pages/cliente/deletar' element={<ClienteDeletar />} />
          <Route path='/pages/cliente/alterar/:id' element={<ClienteAlterar />} />
          <Route path='/pages/filme/listar' element={<FilmeListar />} />
          <Route path='/pages/filme/cadastrar' element={<FilmeCadastrar />} />
          <Route path='/pages/filme/deletar' element={<FilmeDeletar />} />
          <Route path='/pages/filme/alterar/:id' element={<FilmeAlterar />} />
          <Route path='/pages/emprestimo/listar' element={<EmprestimoListar />} />
          <Route path='/pages/emprestimo/cadastrar' element={<EmprestimoCadastrar />} />
          <Route path='/pages/emprestimo/deletar' element={<EmprestimoDeletar />} />
        </Routes>
      </BrowserRouter>      
      <footer className="footer">
        <p>Feito por Erik</p>
      </footer>
    </div>
  );
}

export default App;