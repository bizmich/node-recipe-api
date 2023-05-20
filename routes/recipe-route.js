const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

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
router.put("/recipe/:id", updateRecipe);
router.delete("/recipe/:id", deleteRecipe);
router.post("/recipe/rating", getRecipeByIdAndUpdateRating);

module.exports = router;
