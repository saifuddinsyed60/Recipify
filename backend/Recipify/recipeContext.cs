using Microsoft.EntityFrameworkCore;

public class recipeContext:DbContext{

    public DbSet<Recipe> Recipe {get;set;}
     protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlite($"Data Source=recipify.db");

}