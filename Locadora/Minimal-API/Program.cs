using Microsoft.AspNetCore.Mvc;
using MinimalAPI;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDbContext>();
var app = builder.Build();

// Pagina Raiz (inicial)
app.MapGet("/", () => "API Locadora");

// CRUD da entidade Cliente no banco de dados

// Cadastrar cliente
app.MapPost("/cliente/cadastrar", ([FromBody]  Cliente novoCliente,
    [FromServices] AppDbContext ctx) =>
{

    ctx.Clientes.Add(novoCliente);
    ctx.SaveChanges();
    return Results.Created("Cliente cadastrado com sucesso! ", novoCliente);

});

// listar Clientes
app.MapGet("/cliente/listar", ([FromServices] AppDbContext ctx) =>
{
    if (ctx.Clientes.Any())
    {
        return Results.Ok(ctx.Clientes.ToList());
    }

    return Results.NotFound("Não existem clientes registrados!");
});

// buscar cliente
app.MapGet("/cliente/buscar/{id}", ([FromRoute] string id, [FromServices] AppDbContext ctx ) => {

    Cliente? clienteBuscar = ctx.Clientes.FirstOrDefault(x => x.Id == id);
    if (clienteBuscar is null){
        return Results.NotFound("Cliente nao encontrado");
    }
    return Results.Ok(clienteBuscar);
});

// deletar Cliente
app.MapDelete("/cliente/deletar/{id}", ( [FromRoute] string id,
    [FromServices] AppDbContext ctx) =>
    {
        Cliente? clienteExistente = ctx.Clientes.Find(id);

        if (clienteExistente is null)
        {
            return Results.NotFound("Cliente não encontrado.");
        }

        ctx.Clientes.Remove(clienteExistente);
        ctx.SaveChanges();

        return Results.Ok("Cliente deletado com sucesso!");
    });

// alterar Cliente
app.MapPut("/cliente/atualizar/{Nome}", ([FromRoute] string nome, [FromBody] Cliente clienteAtualizado, [FromServices] AppDbContext ctx) =>
{

    Cliente? clienteExistente = ctx.Clientes.FirstOrDefault(c => c.Nome == nome);

    if (clienteExistente is null)
    {
        return Results.NotFound("Nome requisitado nao encontrado na lista de clientes");
    }

    clienteExistente.Nome = clienteAtualizado.Nome;
    clienteExistente.Endereco = clienteAtualizado.Endereco;
    clienteExistente.Email = clienteAtualizado.Email;
    clienteExistente.Telefone = clienteAtualizado.Telefone;

    ctx.Clientes.Update(clienteExistente);
    ctx.SaveChanges();
    return Results.Ok($"Cliente {clienteExistente.Nome} alterado com sucesso!");
});

// Fim CRUD Clientes


// CRUD da entidade Filme no banco de dados

// Cadastrar Filme
app.MapPost("/filme/cadastrar", ([FromBody]  Filme novoFilme, [FromServices] AppDbContext ctx) =>
{

    ctx.Filmes.Add(novoFilme);
    ctx.SaveChanges();
    return Results.Created("Filme cadastrado com sucesso! ", novoFilme);

});

// listar Filmes
app.MapGet("/filme/listar", ([FromServices] AppDbContext ctx) =>
{
    if (ctx.Filmes.Any())
    {
        return Results.Ok(ctx.Filmes.ToList());
    }

    return Results.NotFound("Não existem Filmes registrados!");
});

// deletar Filme


// deletar Filme por id
app.MapDelete("/filme/deletar/{id}", ( [FromRoute] string id, [FromServices] AppDbContext ctx) =>
    {
        Filme? FilmeExistente = ctx.Filmes.Find(id);

        if (FilmeExistente is null)
        {
            return Results.NotFound("Filme não encontrado.");
        }

        ctx.Filmes.Remove(FilmeExistente);
        ctx.SaveChanges();

        return Results.Ok("Filme deletado com sucesso!");
    });


// alterar Filme
app.MapPut("/filme/atualizar/{id}", ([FromRoute] string id, [FromBody] Filme FilmeAtualizado, [FromServices] AppDbContext ctx) =>
{

    Filme? FilmeExistente = ctx.Filmes.FirstOrDefault(p => p.Id == id);

    if (FilmeExistente is null)
    {
        return Results.NotFound("Nome requisitado nao encontrado na lista de Filmes");
    }

    FilmeExistente.Titulo = FilmeAtualizado.Titulo;
    FilmeExistente.Diretor = FilmeAtualizado.Diretor;
    FilmeExistente.Ano = FilmeAtualizado.Ano;
    FilmeExistente.Categoria = FilmeAtualizado.Categoria;

    ctx.SaveChanges();
    return Results.Ok($"Filme {FilmeAtualizado.Titulo} alterado com sucesso!");
});

// Fim CRUD Filmes

app.Run();
