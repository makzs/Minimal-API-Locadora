import { useEffect, useState } from "react";
import { Filme } from "../../Models/Filme";
import { useNavigate, useParams } from "react-router-dom";

function FilmeAlterar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [diretor, setDiretor] = useState("");
  const [ano, setAno] = useState("");
  const [categoria, setCategoria] = useState("");

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5088/filme/buscar/${id}`)
        .then((resposta) => resposta.json())
        .then((filme: Filme) => {
          setTitulo(filme.titulo);
          setDiretor(filme.diretor);
          setAno(filme.ano);
        })
        .catch((error) => {
          console.error("Erro ao carregar filme:", error);
        });
    }
  }, [id]);

  function alterarFilme(e: any) {
    const filme: Filme = {
      id: id,
      titulo: titulo,
      diretor: diretor,
      ano: ano,
    };

    fetch(`http://localhost:5088/filme/atualizar/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filme),
    })
      .then((resposta) => resposta.json())
      .then((filme: Filme) => {
        navigate("/pages/filme/listar");
      })
      .catch((error) => {
        console.error("Erro ao atualizar filme:", error);
      });
    e.preventDefault();
  }

  return (
    <div>
      <h1>Alterar Filme</h1>
      <form onSubmit={alterarFilme}>
        <label>Título:</label>
        <input type="text" value={titulo} onChange={(e: any) => setTitulo(e.target.value)} required />

        <label>Diretor:</label>
        <input type="text" value={diretor} onChange={(e: any) => setDiretor(e.target.value)} required />

        <label>Ano:</label>
        <input type="text" value={ano} onChange={(e: any) => setAno(e.target.value)} required />

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default FilmeAlterar;