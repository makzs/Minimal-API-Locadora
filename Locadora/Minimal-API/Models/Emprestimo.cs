namespace MinimalAPI;

// Entidade Emprestimo
// Se relaciona com as entidades Cliente e Filme

public class Emprestimo
{

    //Propriedades
public string Id { get; set; }
    public string? ClienteId { get; set; }
    public Cliente? Cliente { get; set; }
    public string? FilmeId { get; set; }
    public Filme? Filme { get; set; }
    public DateTime DataEmprestimo { get; set; }
    public DateTime DataDevolucaoPrevista { get; set; }
    public string? StatusEmprestimo { get; set; }


    //Construtores
  public Emprestimo() {
    Id = Guid.NewGuid().ToString();
    DataEmprestimo = DateTime.Now;
    DataDevolucaoPrevista = DateTime.Now.AddDays(14);
    StatusEmprestimo = "Pendente";
   }

  // Construtor com todos os parâmetros
  public Emprestimo(string clienteId, Cliente cliente, string filmeid, Filme filme)
  {
    Id = Guid.NewGuid().ToString();
    ClienteId = clienteId;
    Cliente = cliente;
    FilmeId = filmeid;
    Filme = filme;
    DataEmprestimo = DateTime.Now;
    DataDevolucaoPrevista = DateTime.Now.AddDays(14);
    StatusEmprestimo = "Pendente";
  }
}