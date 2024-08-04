using Microsoft.EntityFrameworkCore;
using System.Globalization;
using Microsoft.AspNetCore.Mvc;
using MinimalAPI;

var builder = WebApplication.CreateBuilder(args);

// configurar a politica de CORS para liberar o acesso total
builder.Services.AddCors(
    options => options.AddPolicy("Acesso Total", configs => configs.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod())
);

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
app.MapPut("/cliente/atualizar/{id}", ([FromRoute] string id, [FromBody] Cliente clienteAtualizado, [FromServices] AppDbContext ctx) =>
{

    Cliente? clienteExistente = ctx.Clientes.FirstOrDefault(c => c.Id == id);

    if (clienteExistente is null)
    {
        return Results.NotFound("Id requisitado nao encontrado na lista de clientes");
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
    var filmes = ctx.Filmes
        .Include(f => f.Categoria)
        .ToList();

    if (filmes.Any())
    {
        return Results.Ok(filmes);
    }

    return Results.NotFound("Não existem filmes registrados!");
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
        return Results.NotFound("Id requisitado nao encontrado na lista de Filmes");
    }

    FilmeExistente.Titulo = FilmeAtualizado.Titulo;
    FilmeExistente.Diretor = FilmeAtualizado.Diretor;
    FilmeExistente.Ano = FilmeAtualizado.Ano;
    FilmeExistente.Categoria = FilmeAtualizado.Categoria;

    ctx.SaveChanges();
    return Results.Ok($"Filme {FilmeAtualizado.Titulo} alterado com sucesso!");
});

// Fim CRUD Filmes

// CRUD da entidade Categorias no banco de dados

app.MapPost("/categoria/cadastrar", ([FromBody] Categoria categoria, [FromServices] AppDbContext ctx) =>
{

    ctx.Categorias.Add(categoria);
    ctx.SaveChanges();
    return Results.Created("", categoria);
});

app.MapGet("/categoria/listar",
    ([FromServices] AppDbContext ctx) =>
{
    if (ctx.Categorias.Any())
    {
        return Results.Ok(ctx.Categorias.ToList());
    }
    return Results.NotFound("Não existem categorias registradas!");
});

app.MapDelete("/categoria/deletar/{id}", ([FromServices] AppDbContext ctx, [FromRoute] string id) =>
{
    Categoria? categoriaExistente = ctx.Categorias.FirstOrDefault(p => p.Id == id);

        if (categoriaExistente == null)
        {
            return Results.NotFound("Categoria não encontrada.");
        }

        ctx.Categorias.Remove(categoriaExistente);
        ctx.SaveChanges();

        return Results.Ok("Categoria deletada com sucesso!");
});

// Fim CRUD Categorias

// CRUD da entidade emprestimo no banco de dados

// Listar emprestimos
app.MapGet("/emprestimo/listar", async ([FromServices] AppDbContext ctx) =>
{
    var emprestimos = await ctx.Emprestimos
                              .Include(e => e.Cliente)
                              .Include(e => e.Filme)
                              .ToListAsync();

    if (emprestimos.Any())
    {
        var emprestimosFormatados = emprestimos.Select(e => new
        {
            e.Id,
            Cliente = e.Cliente != null ? new 
            {
                e.Cliente.Id,
                e.Cliente.Nome
            } : null,
            Filme = e.Filme != null ? new
            {
                e.Filme.Id,
                e.Filme.Titulo
            } : null,
            DataEmprestimo = e.DataEmprestimo.ToString("dd/MM/yyyy", CultureInfo.InvariantCulture),
            DataDevolucaoPrevista = e.DataDevolucaoPrevista.ToString("dd/MM/yyyy", CultureInfo.InvariantCulture),
            e.StatusEmprestimo
        });

        return Results.Ok(emprestimosFormatados);
    }

    return Results.NotFound("Não existem empréstimos registrados!");
});


// cadastrar emprestimos
app.MapPost("/emprestimo/cadastrar", ([FromServices] AppDbContext ctx, [FromBody] Emprestimo emprestimo) =>
{

    Cliente? cliente = ctx.Clientes.FirstOrDefault(l => l.Id == emprestimo.ClienteId);
    Filme? filme = ctx.Filmes.FirstOrDefault(l => l.Id == emprestimo.FilmeId);

    if (cliente is null || filme is null)
    {
        return Results.BadRequest("Cliente ou Filme não encontrado!");
    }

    emprestimo.Cliente = cliente;
    emprestimo.Filme = filme;

    ctx.Emprestimos.Add(emprestimo);
    ctx.SaveChanges();
    return Results.Created("Emprestimo cadastrado com sucesso! ", emprestimo);
});

// atualizar emprestimos
app.MapPut("/emprestimo/atualizar/{id}", ([FromServices] AppDbContext ctx, string id) =>
{
    var emprestimo = ctx.Emprestimos.FirstOrDefault(e => e.Id == id);

    if (emprestimo is null)
    {
        return Results.NotFound("Empréstimo não encontrado!");
    }

    emprestimo.StatusEmprestimo = "Devolvido";
    ctx.SaveChanges();

    return Results.Ok("Empréstimo devolvido!");
});

// deletar emprestimos
app.MapDelete("/emprestimo/deletar/{id}", ([FromServices] AppDbContext ctx, string id) =>
{
    var emprestimo = ctx.Emprestimos.FirstOrDefault(e => e.Id == id);

    if (emprestimo is null)
    {
        return Results.NotFound("Empréstimo não encontrado!");
    }

    ctx.Emprestimos.Remove(emprestimo);
    ctx.SaveChanges();

    return Results.Ok("Empréstimo deletado com sucesso.");
});

app.UseCors("Acesso Total");
app.Run();
