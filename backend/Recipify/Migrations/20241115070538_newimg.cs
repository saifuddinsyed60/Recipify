using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Recipify.Migrations
{
    /// <inheritdoc />
    public partial class newimg : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "image",
                table: "Recipe");

            migrationBuilder.AddColumn<byte[]>(
                name: "imageFile",
                table: "Recipe",
                type: "BLOB",
                nullable: false,
                defaultValue: new byte[0]);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "imageFile",
                table: "Recipe");

            migrationBuilder.AddColumn<string>(
                name: "image",
                table: "Recipe",
                type: "TEXT",
                nullable: true);
        }
    }
}
