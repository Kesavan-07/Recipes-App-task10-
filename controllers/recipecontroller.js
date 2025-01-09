const recipe = require("../models/recipemodel");
const recipeController = {
  // createRecipe
  createRecipe: async (request, response) => {
    try {
      const { title, chefName, createdAt, instructions, ingredients } =
        request.body;
      const newRecipe = new recipe({
        title,
        chefName,
        createdAt,
        instructions,
        ingredients,
      });
      await newRecipe.save();
      response.json({ message: "recipe created sucessfully" });
    } catch {
      response.status(500).json({ message: error.message });
    }
  },
  // getAllRecipes GET
  getAllRecipes: async (request, response) => {
    try {
      const recipes = await recipe.find();
      response.json(recipes);
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
    response.json({ message: " recipe get sucessful" });
  },
  // getRecipeById get by id
  getRecipeById: async (request, response) => {
    try {
      const { id } = request.params;
      const recipeDetails = await recipe.findById(id);
      response.json({ recipeDetails });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  // updateRecipe PUT
  updateRecipe: async (request, response) => {
    try {
      const { id } = request.params;
      const { title, chefName, createdAt, instructions, ingredients } =
        request.body;
      const updateRecipe = {
        title,
        chefName,
        createdAt,
        instructions,
        ingredients,
      };
      await recipe.findByIdAndUpdate(id, updateRecipe);
      response.json({ message: updateRecipe });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  // deleteRecipe DELETE
  deleteRecipe: async (request, response) => {
    try {
      const { id } = request.params;
      await recipe.findByIdAndDelete(id);
      response.json({ message: "recipe deleted sucessfully" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
    response.json({ message: "recipe deleted sucessfully" });
  },
};

module.exports = recipeController;
