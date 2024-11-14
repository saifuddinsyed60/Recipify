using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Recipify.Migrations
{
    /// <inheritdoc />
    public partial class UpdateForImage1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "imageName",
                table: "Recipe",
                newName: "imageFile");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "imageFile",
                table: "Recipe",
                newName: "imageName");
        }
    }
}
