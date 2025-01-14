const express = require("express");
const recipeController = require("../controllers/recipecontroller");

const recipeRoute = express.Router();

// create recipe
recipeRoute.post("/create", recipeController.createRecipe);
// get all recipes
recipeRoute.get("/all", recipeController.getAllRecipes);
// get recipe by id
recipeRoute.get("/", recipeController.getRecipeById);
// update recipe
recipeRoute.put("/update", recipeController.updateRecipe);
// delete recipe
recipeRoute.delete("/delete", recipeController.deleteRecipe);

module.exports = recipeRoute;