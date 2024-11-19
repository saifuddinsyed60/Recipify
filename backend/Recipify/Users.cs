public class Users{
    public int id { get; set; }
    public String? username { get; set; }
    public String? password { get; set; }
    public byte[] salt { get; set; }

    public String? email { get; set; }
    public DateTime createdAt { get; set; } = DateTime.UtcNow;
    public DateTime? modifiedAt { get; set; } = null;
}