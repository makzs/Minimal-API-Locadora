import { useEffect, useState } from "react";
import { Emprestimo } from "../../Models/Emprestimo";
import { Cliente } from "../../Models/Cliente";
import { Filme } from "../../Models/Filme";

function EmprestimoListar(){

    const[emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);

    useEffect(() =>
        {
            console.log("O componente foi carregado");
            carregarEmprestimo();
            
    
        }, []);

        function carregarEmprestimo() {
            fetch("http://localhost:5088/emprestimo/listar")
                .then((resposta) => resposta.json())
                .then((dados) => {
                    console.log("Dados recebidos da API:", dados);
                    if (Array.isArray(dados)) {
                        setEmprestimos(dados);
                        console.log("Emprestimos carregados");
                    } else {
                        setEmprestimos([]); // Inicializa como array vazio se a resposta não for um array
                        console.warn("Dados recebidos não são um array, inicializando como array vazio");
                    }
                });
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
            <h1>Lista de Emprestimos</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cliente ID</th>
                        <th>Cliente</th>
                        <th>Filme ID</th>
                        <th>Filme</th>
                        <th>dataEmprestimo</th>
                        <th>dataDevolução</th>
                        <th>status</th>
                    </tr>
                </thead>
                <tbody>
                    {emprestimos.map((emprestimo, index) => (
                        <tr key={emprestimo.id || index}>
                            <td>{emprestimo.id}</td>
                            <td>{emprestimo.cliente.id}</td>
                            <td>{emprestimo.cliente?.nome}</td>
                            <td>{emprestimo.filme.id}</td>
                            <td>{emprestimo.filme?.titulo}</td>
                            <td>{emprestimo.dataEmprestimo}</td>
                            <td>{emprestimo.dataDevolucaoPrevista}</td>
                            <td>{emprestimo.statusEmprestimo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmprestimoListar;