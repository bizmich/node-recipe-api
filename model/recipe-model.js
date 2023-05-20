const mongoose = require("mongoose");

const RecipeSchema = mongoose.Schema({
  createdDate: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  ingredient: {
    type: Array,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  cookingTime: {
    type: Number,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
    default: 0,
  },
  viewCount: {
    type: Number,
    require: true,
    default: 0,
  },
});

module.exports = mongoose.model("Recipe", RecipeSchema);
