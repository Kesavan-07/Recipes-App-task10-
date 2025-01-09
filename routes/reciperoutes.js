const express = require("express");
const recipeController = require("../controllers/recipecontroller");

const recipeRoute = express.Router();

// crate recipe
recipeRoute.post("/", recipeController.createRecipe);
// get recipeee
recipeRoute.get("/", recipeController.getAllRecipes);
// get recipee by id
recipeRoute.get("/:id", recipeController.getRecipeById);
// update put
recipeRoute.put("/:id", recipeController.updateRecipe);
// delete recipee
recipeRoute.delete("/:id", recipeController.deleteRecipe);

module.exports = recipeRoute;
