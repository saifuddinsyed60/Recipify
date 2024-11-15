using System.Formats.Tar;
using Newtonsoft.Json;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
    builder =>
    {
        builder.WithOrigins("http://127.0.0.1")
        .AllowCredentials()
        .AllowAnyHeader()
        .SetIsOriginAllowed((host) => true)
        .AllowAnyMethod();
    });
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAllOrigins");


/*List<Recipe> recipes=new List<Recipe>{
    new Recipe
            {
                id = 1,
                recipeName = "Chicken Biryani",
                ingredients = new List<string> { "chicken", "basmati rice", "yogurt", "onion", "tomato", "garlic", "ginger", "spices" },
                steps = new List<string>
                {
                    "Marinate chicken with yogurt and spices for 1 hour.",
                    "Cook onions until golden, then add tomatoes and marinated chicken.",
                    "Cook the rice separately until halfway done.",
                    "Layer chicken and rice, then cook on low heat until fully cooked.",
                    "Garnish with fried onions and cilantro, then serve."
                },
                image = "/recipeImages/biryani.jpg", // Placeholder for image
                username = "chefMike",
                upvotes = 150
            },
            new Recipe
            {
                id = 2,
                recipeName = "Vegetable Stir-Fry",
                ingredients = new List<string> { "bell peppers", "carrots", "broccoli", "soy sauce", "ginger", "garlic", "olive oil" },
                steps = new List<string>
                {
                    "Heat oil in a pan and add garlic and ginger.",
                    "Add bell peppers, carrots, and broccoli, stir-frying until tender-crisp.",
                    "Add soy sauce and cook for another 2 minutes.",
                    "Serve with rice or noodles."
                },
                image = "/recipeImages/vegetable-stirfy.jpg", // Placeholder for image
                username = "veggieChef21",
                upvotes = 85
            },
            new Recipe
            {
                id = 3,
                recipeName = "Spaghetti Carbonara",
                ingredients = new List<string> { "spaghetti", "eggs", "parmesan cheese", "bacon", "black pepper" },
                steps = new List<string>
                {
                    "Cook spaghetti until al dente.",
                    "In a separate bowl, whisk eggs and grated parmesan.",
                    "Cook bacon until crispy, then remove from heat.",
                    "Add cooked spaghetti to the pan with bacon, and quickly mix in the egg mixture off the heat.",
                    "Season with black pepper and serve immediately."
                },
                image = "/recipeImages/falafel.jpg", // Placeholder for image
                username = "italianChef",
                upvotes = 200
            },
            new Recipe
            {
                id = 4,
                recipeName = "Pancakes",
                ingredients = new List<string> { "flour", "milk", "egg", "sugar", "baking powder", "butter" },
                steps = new List<string>
                {
                    "Mix flour, baking powder, and sugar in a bowl.",
                    "Whisk in milk and egg until smooth.",
                    "Pour batter onto a hot, buttered griddle.",
                    "Cook until bubbles form, then flip and cook until golden brown.",
                    "Serve with syrup and butter."
                },
                image = "/recipeImages/shawarma.jpg", // Placeholder for image
                username = "breakfastKing",
                upvotes = 120
            },
             new Recipe
            {
                id = 5,
                recipeName = "Hummus",
                ingredients = new List<string> { "chickpeas", "tahini", "lemon juice", "garlic", "olive oil", "salt" },
                steps = new List<string>
                {
                    "Blend chickpeas, tahini, lemon juice, garlic, olive oil, and salt until smooth.",
                    "Serve with a drizzle of olive oil and a sprinkle of paprika."
                },
                image = "/recipeImages/hummus.jpg",
                username = "hummusQueen",
                upvotes = 75
            },
            new Recipe
            {
                id = 6,
                recipeName = "Butter Chicken",
                ingredients = new List<string> { "chicken", "yogurt", "garam masala", "ginger", "garlic", "tomato puree", "cream" },
                steps = new List<string>
                {
                    "Marinate chicken in yogurt and spices for 1 hour.",
                    "Cook chicken until browned, then set aside.",
                    "Make the sauce with tomato puree, cream, and spices, then add chicken back in.",
                    "Simmer until the chicken is cooked through and the sauce is thickened."
                },
                image = "/recipeImages/butter-chicken.jpg",
                username = "butterChick",
                upvotes = 180
            },
            new Recipe
            {
                id = 7,
                recipeName = "Vegetable Biryani",
                ingredients = new List<string> { "basmati rice", "carrots", "potatoes", "peas", "onion", "yogurt", "spices" },
                steps = new List<string>
                {
                    "Cook vegetables with spices until soft.",
                    "Add yogurt to the vegetables, then layer with rice.",
                    "Simmer until rice is fully cooked and flavors are absorbed."
                },
                image = "/recipeImages/veg-biryani.jpg",
                username = "vegMaster",
                upvotes = 120
            },
            new Recipe
            {
                id = 8,
                recipeName = "Lamb Kofta",
                ingredients = new List<string> { "ground lamb", "onion", "garlic", "parsley", "spices" },
                steps = new List<string>
                {
                    "Mix ground lamb with onion, garlic, parsley, and spices.",
                    "Shape into small patties or skewers.",
                    "Grill or fry until fully cooked."
                },
                image = "/recipeImages/lamb-kofta.avif",
                username = "lambLover",
                upvotes = 150
            },
            new Recipe
            {
                id = 9,
                recipeName = "Tabbouleh Salad",
                ingredients = new List<string> { "parsley", "bulgur", "tomato", "cucumber", "lemon juice", "olive oil" },
                steps = new List<string>
                {
                    "Soak bulgur in hot water until soft.",
                    "Chop parsley, tomato, and cucumber finely.",
                    "Mix with bulgur, lemon juice, and olive oil, then serve."
                },
                image = "/recipeImages/salad.webp",
                username = "tabboulehFan",
                upvotes = 90
            },
            new Recipe
            {
                id = 10,
                recipeName = "Shakshuka",
                ingredients = new List<string> { "eggs", "tomato", "bell pepper", "onion", "spices", "cilantro" },
                steps = new List<string>
                {
                    "Cook onions, peppers, and spices until soft.",
                    "Add tomatoes and simmer until sauce thickens.",
                    "Make wells in the sauce and crack eggs into them.",
                    "Cover and cook until eggs are done to preference."
                },
                image = "/recipeImages/shakshuka.webp",
                username = "shakshukaChef",
                upvotes = 135
            }
    
};

*/




app.MapGet("/getRecipes/{username?}", (string? username) =>
{
    using (recipeContext rc = new recipeContext())
    {
        List<Recipe> recipes = rc.Recipe.OrderBy(r => r.id).ToList();
        recipes.ForEach(r=>r.imageFileBase64=Convert.ToBase64String(r.imageFile));
        if (String.IsNullOrEmpty(username))
            return Results.Ok(recipes);
        else
            return Results.Ok(recipes.Where(item => item.username == username).ToList());
    }
})
.WithName("GetRecipes")
.WithOpenApi();

app.MapPost("/addRecipe", async (HttpContext context) =>
{
    var form = await context.Request.ReadFormAsync();
    Recipe r = new Recipe();
    r.recipeName=form["recipeName"];
    r.ingredients = form["ingredients"].ToString() .Trim('[', ']','"').Split(',').ToList<String>();
    r.steps = form["steps"].ToString() .Trim('[', ']','"').Split(',').ToList<String>();
    var imageFile = form.Files.GetFile("imageFile");
    if (imageFile != null)
    {
        using (var memoryStream = new MemoryStream())
        {
            await imageFile.CopyToAsync(memoryStream);
            r.imageFile = memoryStream.ToArray();
        }
    }
    else
    {
        r.imageFile = null;
    }
    r.username = form["username"];
    r.upvotes = 0;
    using (recipeContext rc = new recipeContext())
    {
        rc.Add(r);
        rc.SaveChanges();
        return Results.Ok(r);
    }
})
.WithName("AddRecipe")
.WithOpenApi();
app.Run();


