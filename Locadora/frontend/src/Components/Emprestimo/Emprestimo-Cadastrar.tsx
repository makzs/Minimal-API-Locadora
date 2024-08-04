import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Cliente } from "../../Models/Cliente";
import { Filme } from "../../Models/Filme";
import { Emprestimo } from "../../Models/Emprestimo";

function EmprestimoCadastrar() {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [clienteId, setClienteId] = useState("");
  const [filmeId, setFilmeId] = useState("");

  useEffect(() => {
    carregarClientes();
    carregarFilmes();
  }, []);

  function carregarClientes() {
    fetch("http://localhost:5088/cliente/listar")
      .then((resposta) => resposta.json())
      .then((clientes: Cliente[]) => {
        setClientes(clientes);
      });
  }

  function carregarFilmes() {
    fetch("http://localhost:5088/filme/listar")
      .then((resposta) => resposta.json())
      .then((filmes: Filme[]) => {
        setFilmes(filmes);
      });
  }

  function cadastrarEmprestimo(e: any) {
    e.preventDefault();
    const emprestimo = {
      clienteId: clienteId,
      filmeId: filmeId,
    };

    fetch("http://localhost:5088/emprestimo/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emprestimo),
    })
      .then((resposta) => resposta.json())
      .then((emprestimo: Emprestimo) => {
        console.log(emprestimo);
        setClienteId("");
        setFilmeId("");
        navigate("/pages/emprestimo/listar");
      });
  }

  return (
    <div>
      <h1>Cadastrar Empréstimo</h1>
      <form onSubmit={cadastrarEmprestimo}>
        <label>Cliente:</label>
        <select
          value={clienteId}
          onChange={(e: any) => setClienteId(e.target.value)}
          required
        >
          <option value="">Selecione um cliente</option>
          {clientes.map((cliente) => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nome}
            </option>
          ))}
        </select>

        <label>Filme:</label>
        <select
          value={filmeId}
          onChange={(e: any) => setFilmeId(e.target.value)}
          required
        >
          <option value="">Selecione um filme</option>
          {filmes.map((filme) => (
            <option key={filme.id} value={filme.id}>
              {filme.titulo}
            </option>
          ))}
        </select>

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default EmprestimoCadastrar;