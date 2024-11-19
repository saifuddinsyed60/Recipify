﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Recipify.Migrations
{
    [DbContext(typeof(recipeContext))]
    [Migration("20241115070538_newimg")]
    partial class newimg
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.10");

            modelBuilder.Entity("Recipe", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("TEXT");

                    b.Property<byte[]>("imageFile")
                        .IsRequired()
                        .HasColumnType("BLOB");

                    b.Property<string>("ingredients")
                        .HasColumnType("TEXT");

                    b.Property<string>("recipeName")
                        .HasColumnType("TEXT");

                    b.Property<string>("steps")
                        .HasColumnType("TEXT");

                    b.Property<int>("upvotes")
                        .HasColumnType("INTEGER");

                    b.Property<string>("username")
                        .HasColumnType("TEXT");

                    b.HasKey("id");

                    b.ToTable("Recipe");
                });
#pragma warning restore 612, 618
        }
    }
}