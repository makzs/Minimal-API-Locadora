using Microsoft.EntityFrameworkCore;
namespace MinimalAPI;

// Configura as tabelas no banco de dados a partir das entidades

public class AppDbContext : DbContext
{
  public DbSet<Cliente> Clientes { get; set; }
  public DbSet<Filme> Filmes { get; set; }
  public DbSet<Emprestimo> Emprestimos { get; set; }
  public DbSet<Categoria> Categorias { get; set; }

  protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
  {
    optionsBuilder.UseSqlite("Data Source=bancoLocadora.db");
  }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<Filme>()
        .HasOne(f => f.Categoria)
        .WithMany()
        .HasForeignKey(f => f.CategoriaId);

      modelBuilder.Entity<Emprestimo>()
          .HasOne(e => e.Cliente)
          .WithMany()
          .HasForeignKey(e => e.ClienteId);

      modelBuilder.Entity<Emprestimo>()
          .HasOne(e => e.Filme)
          .WithMany()
          .HasForeignKey(e => e.FilmeId);
    }
}