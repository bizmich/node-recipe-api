const mongoose = require("mongoose");

const RecipeSchema = mongoose.Schema({
  createdDate: String,
  description: String,
  image: String,
  ingredient: [],
  name: String,
  cookingTime: Number,
  rate: Number,
});

module.exports = mongoose.model("Recipe", RecipeSchema);
