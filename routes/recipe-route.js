const express = require("express");
const router = express.Router();
const {
  getAllRecipe,
  createRecipe,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipe-controller");

router.get("/recipe", getAllRecipe);
router.post("/recipe", createRecipe);
router.get("/recipe/:id", getRecipeById);
router.put("/recipe/:id", updateRecipe);
router.delete("/recipe/:id", deleteRecipe);

module.exports = router;
