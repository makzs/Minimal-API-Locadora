namespace MinimalAPI;

// Entidade Filme

public class Filme{

    //Propriedades
    public string Id {get; set;}
    public string? Titulo {get; set;}
    public string? Diretor {get; set;}
    public int? Ano {get; set;}
    public string? CategoriaId {get; set;}
    public  Categoria? Categoria {get; set;}
    public string? Status {get; set;}
    public DateTime DataCadastro {get; set;}


    //Construtores
    public Filme(){
        Id = Guid.NewGuid().ToString();
        DataCadastro = DateTime.Now;
    }

    public Filme(string titulo, string diretor, int ano){
        Id = Guid.NewGuid().ToString();
        Titulo = titulo;
        Diretor = diretor;
        Ano = ano;
        Status = "Disponivel";
        DataCadastro = DateTime.Now;
    }
}