public class Comments {
    public int id { get; set; }
    public String? comment { get; set; }
    public String? username { get; set; }
    public int recipeId { get; set; }
    public DateTime createdAt { get; set; } = DateTime.UtcNow;
}