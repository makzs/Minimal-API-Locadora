import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Filme } from "../../Models/Filme";
import { Categoria } from "../../Models/Categoria";

function FilmeDeletar() {
  const navigate = useNavigate();
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    carregarFilmes();
    carregarCategorias();
  }, []);

  function carregarFilmes() {
    fetch("http://localhost:5088/filme/listar")
      .then((resposta) => resposta.json())
      .then((dados) => {
        if (Array.isArray(dados)) {
          setFilmes(dados);
        } else {
          setFilmes([]);
        }
      });
  }

  function carregarCategorias() {
    fetch("http://localhost:5088/categoria/listar")
      .then((resposta) => resposta.json())
      .then((dados) => {
        if (Array.isArray(dados)) {
          setCategorias(dados);
        } else {
          setCategorias([]);
        }
      });
  }

  function deletarFilme(id: string) {
    axios.delete(`http://localhost:5088/filme/deletar/${id}`).then(() => {
      carregarFilmes(); // Recarrega a lista após deletar
    });
  }

  function obterNomeCategoria(id: string) {
    const categoria = categorias.find((cat) => cat.id === id);
    return categoria ? categoria.nome : "Sem categoria";
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
      <h1>Deletar Filmes</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Autor</th>
            <th>ISBN</th>
            <th>Categoria</th>
            <th>Data de Cadastro</th>
            <th>Deletar</th>
            <th>Alterar</th>
          </tr>
        </thead>
        <tbody>
          {filmes.map((filme, index) => (
            <tr key={filme.id || index}>
              <td>{filme.id}</td>
              <td>{filme.titulo}</td>
              <td>{filme.diretor}</td>
              <td>{filme.ano}</td>
              <td>{obterNomeCategoria(filme.categoriaId || "")}</td>
              <td>{filme.dataCadastro}</td>
              <td>
                <button onClick={() => deletarFilme(filme.id!)}>Deletar</button>
              </td>
              <td>
                <Link to={`/pages/filme/alterar/${filme.id}`}>Alterar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FilmeDeletar;