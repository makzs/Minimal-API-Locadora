import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Filme } from "../../Models/Filme";
import { Categoria } from "../../Models/Categoria";

function FilmeCadastrar() {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [diretor, setDiretor] = useState("");
  const [ano, setAno] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    carregarCategorias();
  }, []);

  function carregarCategorias() {
    fetch("http://localhost:5088/categoria/listar")
      .then((resposta) => resposta.json())
      .then((categorias: Categoria[]) => {
        setCategorias(categorias);
      });
  }

  function cadastrarFilme(e: any) {
    e.preventDefault();

    const filme: Filme = {
      titulo: titulo,
      diretor: diretor,
      ano: ano,
      categoriaId: categoriaId,
    };

    fetch("http://localhost:5088/filme/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filme),
    })
      .then((resposta) => resposta.json())
      .then((filme: Filme) => {
        navigate("/pages/filme/listar");
      });
  }

  return (
    <div>
      <h1>Cadastrar Filme</h1>
      <form onSubmit={cadastrarFilme}>
        <label>Título:</label>
        <input
          type="text"
          placeholder="Digite o título"
          onChange={(e: any) => setTitulo(e.target.value)}
          required
        />
        <br />
        <label>Diretor:</label>
        <input
          type="text"
          placeholder="Digite o Diretor"
          onChange={(e: any) => setDiretor(e.target.value)}
        />
        <br />
        <label>Ano:</label>
        <input
          type="text"
          placeholder="Digite o ano de lançamento"
          onChange={(e: any) => setAno(e.target.value)}
        />
        <br />
        <label>Categorias:</label>
        <select onChange={(e: any) => setCategoriaId(e.target.value)}>
          <option value="">Selecione uma categoria</option>
          {categorias.map((categoria) => (
            <option value={categoria.id} key={categoria.id}>
              {categoria.nome}
            </option>
          ))}
        </select>
        <br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default FilmeCadastrar;