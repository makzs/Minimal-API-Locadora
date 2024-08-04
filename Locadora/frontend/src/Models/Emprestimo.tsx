import { Cliente } from "../Models/Cliente";
import { Filme } from "../Models/Filme";


export interface Emprestimo {
    id: string;
    clienteId: string;
    cliente: Cliente;
    filmeId: string;
    filme: Filme;
    dataEmprestimo: string;
    dataDevolucaoPrevista: string;
    statusEmprestimo: string;
}