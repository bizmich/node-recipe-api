const express = require("express");
const router = express.Router();
const {
  getAllRecipe,
  createRecipe,
  getRecipeById,
} = require("../controllers/recipeController");

router.get("/recipe", getAllRecipe);
router.post("/recipe", createRecipe);
router.get("/recipe/:id", getRecipeById);

module.exports = router;
