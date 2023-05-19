const RecipeSchema = require("../model/recipe-model");
const CommentSchema = require("../model/comment-model");

// getting all recipe
module.exports.getAllRecipe = async (req, res) => {
  await RecipeSchema.find()
    .then((doc) => {
      const filteredRecipes = doc.map((el) => {
        return {
          createdDate: el.createdDate,
          description: el.description,
          image: el.image,
          ingredient: el.ingredient,
          name: el.name,
          cookingTime: el.cookingTime,
          rate: el.rate,
          id: el._id,
        };
      });
      res.status(200).json({
        list: filteredRecipes,
        count: doc.length,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Произошла ошибка",
        error: error,
      });
    });
};

// creating a recipe
module.exports.createRecipe = async (req, res) => {
  const recipeData = {
    createdDate: new Date().toISOString(),
    description: req.body.description,
    image: "image",
    ingredient: req.body.ingredient,
    name: req.body.name,
    cookingTime: req.body.cookingTime,
    rate: req.body.rate,
  };

  await RecipeSchema.create(recipeData)
    .then((doc) => {
      console.log("doc:", doc);

      res.status(200).json({
        list: doc,
      });
    })
    .catch((err) => console.log("Error", err));
};

// get by id
module.exports.getRecipeById = async (req, res) => {
  const response = await CommentSchema.find({ recipeId: req.params.id });

  await RecipeSchema.findById(req.params.id)
    .then((doc) => {
      const filteredRecipes = {
        createdDate: doc.createdDate,
        description: doc.description,
        image: doc.image,
        ingredient: doc.ingredient,
        name: doc.name,
        cookingTime: doc.cookingTime,
        rate: doc.rate,
        id: doc._id,
        comments: response,
      };

      res.status(200).json({
        ...filteredRecipes,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Произошла ошибка",
        error: error,
      });
    });
};

// updating a recipe
module.exports.updateRecipe = async (req, res) => {
  const id = req.params.id;

  const recipeData = {
    createdDate: new Date().toISOString(),
    description: req.body.description,
    image: "image",
    ingredient: req.body.ingredient,
    name: req.body.name,
    cookingTime: req.body.cookingTime,
    rate: req.body.rate,
  };

  await RecipeSchema.findByIdAndUpdate(id, recipeData)
    .then((doc) => {
      res.status(200).json({
        message: "Updated successfully",
      });
    })
    .catch((err) => console.log("Error", err));
};

// updating a recipe
module.exports.deleteRecipe = async (req, res) => {
  const id = req.params.id;

  await RecipeSchema.findByIdAndRemove(id)
    .then((doc) => {
      res.status(200).json({
        message: "Delete successfully",
      });
    })
    .catch((err) =>
      res.status(404).json({
        message: err.message,
      })
    );
};