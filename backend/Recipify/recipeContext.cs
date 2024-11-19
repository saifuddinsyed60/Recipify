using Microsoft.EntityFrameworkCore;

public class recipeContext:DbContext{

    public DbSet<Recipe> Recipe {get;set;}
    public DbSet<Users> Users {get;set;}
    public DbSet<Comments> Comments {get;set;}
    public DbSet<Favorites> Favorites {get;set;}
     protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlite($"Data Source=/home/recipify.db");

}
