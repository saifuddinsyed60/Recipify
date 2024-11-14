using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Recipify.Migrations
{
    /// <inheritdoc />
    public partial class imageupdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "imageFile",
                table: "Recipe");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "imageFile",
                table: "Recipe",
                type: "BLOB",
                nullable: false,
                defaultValue: new byte[0]);
        }
    }
}
