using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Recipify.Migrations
{
    /// <inheritdoc />
    public partial class UpdateForImage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "imageName",
                table: "Recipe",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "imageName",
                table: "Recipe");
        }
    }
}
