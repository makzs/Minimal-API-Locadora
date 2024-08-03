namespace MinimalAPI;

// Entidade Categoria
// se relaciona com a entidade filme

public class Categoria
{

    //Propriedades
    public string? Id { get; set; }
    public string? Nome { get; set; }
    public DateTime CriadoEm { get; set; }


    //Construtor
    public Categoria()
    {
        Id = Guid.NewGuid().ToString();
        CriadoEm = DateTime.Now;
    }
}