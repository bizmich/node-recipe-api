const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

const {
  getAllRecipe,
  createRecipe,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  getRecipeByIdAndUpdateRating,
} = require("../controllers/recipe-controller");

router.get("/recipe", getAllRecipe);
router.post("/recipe", upload.single("image"), createRecipe);
router.get("/recipe/:id", getRecipeById);
router.put("/recipe/:id", upload.single("image"), updateRecipe);
router.delete("/recipe/:id", deleteRecipe);
router.post("/recipe/rating", getRecipeByIdAndUpdateRating);

module.exports = router;
