const express = require("express");
const router = express.Router();
const {
  getAllRecipe,
  createRecipe,
} = require("../controllers/recipeController");

router.get("/recipe", getAllRecipe);
router.post("/recipe", createRecipe);

module.exports = router;
