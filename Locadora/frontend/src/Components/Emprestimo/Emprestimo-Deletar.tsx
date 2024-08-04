import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Emprestimo } from "../../Models/Emprestimo";
import { Cliente } from "../../Models/Cliente";
import { Filme } from "../../Models/Filme";

function EmprestimoDeletar() {
  const navigate = useNavigate();
  const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const [mensagem, setMensagem] = useState<string | null>(null);

  useEffect(() => {
    carregarEmprestimos();
    carregarClientes();
    carregarFilmes();
  }, []);

  function carregarEmprestimos() {
    fetch("http://localhost:5088/emprestimo/listar")
      .then((resposta) => resposta.json())
      .then((dados) => {
        if (Array.isArray(dados)) {
          setEmprestimos(dados);
        } else {
          setEmprestimos([]);
        }
      })
      .catch((erro) => {
        setErro("Erro ao carregar empréstimos: " + erro.message);
      });
  }

  function carregarClientes() {
    fetch("http://localhost:5088/cliente/listar")
      .then((resposta) => resposta.json())
      .then((dados) => {
        if (Array.isArray(dados)) {
          setClientes(dados);
        } else {
          setClientes([]);
        }
      })
      .catch((erro) => {
        setErro("Erro ao carregar clientes: " + erro.message);
      });
  }

  function carregarFilmes() {
    fetch("http://localhost:5088/filme/listar")
      .then((resposta) => resposta.json())
      .then((dados) => {
        if (Array.isArray(dados)) {
          setFilmes(dados);
        } else {
          setFilmes([]);
        }
      })
      .catch((erro) => {
        setErro("Erro ao carregar filmes: " + erro.message);
      });
  }

  function deletarEmprestimo(id: string, status: string) {
    if (status === "Devolvido") {
    axios.delete(`http://localhost:5088/emprestimo/deletar/${id}`)
      .then(() => {
        carregarEmprestimos(); // Recarrega a lista após deletar
        setMensagem("Este empréstimo já foi devolvido! Deletando dados...");
      })
      .catch((erro) => {
        setErro("Erro ao deletar empréstimo: " + erro.message);
      });
    } else{
        setMensagem("Este empréstimo não foi devolvido! impossivel deletar dados");
    }
  }

  function atualizarEmprestimo(id: string) {
    axios.put(`http://localhost:5088/emprestimo/atualizar/${id}`)
      .then((resposta) => {
        console.log("Empréstimo atualizado:", resposta.data);
        carregarEmprestimos(); // Recarrega a lista após atualizar
      })
      .catch((erro) => {
        setErro("Erro ao atualizar empréstimo: " + erro.message);
      });
  }

  function obterNomeCliente(id: string) {
    const cliente = clientes.find((cli) => cli.id === id);
    return cliente ? cliente.nome : "Sem cliente";
  }

  function obterTituloFilme(id: string) {
    const filme = filmes.find((liv) => liv.id === id);
    return filme ? filme.titulo : "Sem filme";
  }

  return (
    <div>
      <style>{`
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                }
                th {
                    background-color: #f2f2f2;
                    font-weight: bold;
                }
                tr:nth-child(even) {
                    background-color: #f9f9f9;
                }
                tr:hover {
                    background-color: #ddd;
                }
            `}</style>
      <h1>Devolver ou Renovar Emprestimos</h1>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      {mensagem && <p style={{ color: "green" }}>{mensagem}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Filme</th>
            <th>Data de Empréstimo</th>
            <th>Data de Devolução</th>
            <th>Status</th>
            <th>Deletar</th>
            <th>Atualizar</th>
          </tr>
        </thead>
        <tbody>
          {emprestimos.map((emprestimo, index) => (
            <tr key={emprestimo.id || index}>
              <td>{emprestimo.id}</td>
              <td>{emprestimo.cliente.nome}</td>
              <td>{emprestimo.filme.titulo}</td>
              <td>{emprestimo.dataEmprestimo}</td>
              <td>{emprestimo.dataDevolucaoPrevista}</td>
              <td>{emprestimo.statusEmprestimo}</td>
              <td>
                <button onClick={() => deletarEmprestimo(emprestimo.id!, emprestimo.statusEmprestimo)}>Deletar</button>
              </td>
              <td>
                <button onClick={() => atualizarEmprestimo(emprestimo.id!)}>Devolver</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmprestimoDeletar;
