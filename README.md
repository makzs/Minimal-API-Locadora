#  Projeto de Locadora

Este projeto consiste em uma aplicação web para gerenciar uma locadora de filmes. O backend foi desenvolvido utilizando uma Minimal web API em C# com Entity Framework, e o frontend foi construído com React e TypeScript. O sistema permite a gestão de clientes, filmes, categorias e empréstimos, oferecendo funcionalidades CRUD completas para essas entidades. 

## Funcionalidades
### Backend
- Cadastro, Listagem, Atualização e Deleção de Clientes:
Endpoints para cadastrar novos clientes, listar todos os clientes, buscar clientes por ID, atualizar informações de clientes e deletar clientes.

- Cadastro, Listagem, Atualização e Deleção de Filmes:
Endpoints para cadastrar novos filmes, listar todos os filmes, buscar filmes por ID, atualizar informações de filmes e deletar filmes.

- Cadastro, Listagem e Deleção de Categorias:
Endpoints para cadastrar novas categorias, listar todas as categorias e deletar categorias.

-Gerenciamento de Empréstimos:
Endpoints para cadastrar novos empréstimos, listar todos os empréstimos, atualizar o status de empréstimos (devolução) e deletar empréstimos.

### Frontend
- Interface para Gerenciamento de Clientes:
Páginas para listar, cadastrar, alterar e deletar clientes.

- Interface para Gerenciamento de Filmes:
Páginas para listar, cadastrar, alterar e deletar filmes.

- Interface para Gerenciamento de Empréstimos:
Páginas para listar, cadastrar, devolver e renovar empréstimos.

## Tecnologias Utilizadas
### Backend

- *C# e .NET:*
 Utilizado para desenvolver a Minimal API.

- *Entity Framework Core:*
ORM (Object-Relational Mapping) utilizado para manipulação do banco de dados.

- *SQLite:*
Banco de dados utilizado para armazenamento das informações.

- *ASP.NET Core:*
Framework utilizado para construir a API.

### Frontend

- *React:*
Biblioteca JavaScript utilizada para construir a interface do usuário.

- *TypeScript:*
Superset de JavaScript que adiciona tipagem estática ao código, utilizado para escrever o frontend.

- *React Router:*
Biblioteca para gerenciamento de rotas no React.

- *CSS:*
Utilizado para estilizar a aplicação.

## Ferramentas de Desenvolvimento
- *Visual Studio Code:*
Editor de código utilizado para desenvolver tanto o frontend quanto o backend.

- *REST Client:*
Extensão do VS Code utilizada para testar as requisições HTTP da API.

## Como Executar o Projeto
### Pré-requisitos:
- .NET SDK
- Node.js e npm (ou yarn)

### Passo a passo:
1. Clone o repositório
2. Navegue ao diretorio do backend
3. Instale as dependências do projeto utilizando o comando "dotnet restore"
4. Execute o backend utilizando o comando "dotnet run"
5. Navegue ao diretorio do frontend
6. Instale as dependências do projeto utilizando o comando "npm i"
7. Execute o projeto utilizando o comando "npm start"
