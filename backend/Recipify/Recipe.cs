using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

public class Recipe
{
    public int id { get; set; }
    public String? recipeName { get; set; }
    public List<String>? ingredients { get; set; }
    public List<String>? steps { get; set; }
    public byte[] imageFile { get; set; }
    
    [NotMapped]
    public String? imageFileBase64 { get; set; }
    public String? username { get; set; }
    public int upvotes { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}