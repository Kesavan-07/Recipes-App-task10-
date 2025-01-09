const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: String,
  chefName: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  instructions: String,
  ingredients: [String],
});

module.exports = mongoose.model("recipe", recipeSchema, "recipes");
