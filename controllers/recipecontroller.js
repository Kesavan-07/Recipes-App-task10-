const recipe = require("../models/recipemodel");

const recipeController = {
  // createRecipe
  createRecipe: async (request, response) => {
    try {
      const { title, chefName, createdAt, instructions, ingredients } =
        request.body;

      // Validate input
      if (
        !title ||
        !chefName ||
        !instructions ||
        !ingredients ||
        !Array.isArray(ingredients) ||
        ingredients.length === 0
      ) {
        return response.status(400).json({
          message:
            "All fields (title, chefName, instructions, ingredients) are required and ingredients must be a non-empty array.",
        });
      }

      // Validate title and chefName are only alphabets
      const isAlphabetic = /^[A-Za-z\s]+$/;
      if (!isAlphabetic.test(title)) {
        return response
          .status(400)
          .json({ message: "Title must contain only alphabets and spaces." });
      }
      if (!isAlphabetic.test(chefName)) {
        return response
          .status(400)
          .json({
            message: "Chef name must contain only alphabets and spaces.",
          });
      }

      // Check if a recipe with the same title already exists
      const existingRecipe = await recipe.findOne({ title });
      if (existingRecipe) {
        return response
          .status(400)
          .json({ message: "A recipe with this title already exists." });
      }

      // Create a new recipe
      const newRecipe = new recipe({
        title,
        chefName,
        createdAt: createdAt || new Date(),
        instructions,
        ingredients,
      });

      await newRecipe.save();
      response
        .status(201)
        .json({ message: "Recipe created successfully", recipe: newRecipe });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },

  // getAllRecipes GET
  getAllRecipes: async (request, response) => {
    try {
      const recipes = await recipe.find();
      response.status(200).json(recipes);
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },

  // getRecipeById GET
  getRecipeById: async (request, response) => {
    try {
      const { id } = request.params;
      const recipeDetails = await recipe.findById(id);
      if (!recipeDetails) {
        return response.status(404).json({ message: "Recipe not found" });
      }
      response.status(200).json(recipeDetails);
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

      // Validate input
      if (
        !title ||
        !chefName ||
        !instructions ||
        !ingredients ||
        !Array.isArray(ingredients) ||
        ingredients.length === 0
      ) {
        return response.status(400).json({
          message:
            "All fields (title, chefName, instructions, ingredients) are required and ingredients must be a non-empty array.",
        });
      }

      const updateRecipe = {
        title,
        chefName,
        createdAt,
        instructions,
        ingredients,
      };
      const updatedRecipe = await recipe.findByIdAndUpdate(id, updateRecipe, {
        new: true,
      });
      if (!updatedRecipe) {
        return response.status(404).json({ message: "Recipe not found" });
      }

      response
        .status(200)
        .json({
          message: "Recipe updated successfully",
          recipe: updatedRecipe,
        });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },

  // deleteRecipe DELETE
  deleteRecipe: async (request, response) => {
    try {
      const { id } = request.params;
      const deletedRecipe = await recipe.findByIdAndDelete(id);
      if (!deletedRecipe) {
        return response.status(404).json({ message: "Recipe not found" });
      }
      response.status(200).json({ message: "Recipe deleted successfully" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
};

module.exports = recipeController;
