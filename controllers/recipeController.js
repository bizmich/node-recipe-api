const RecipeModel = require("../model/recipeModel");

module.exports.getAllRecipe = async (req, res) => {
  await RecipeModel.find()
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

  await RecipeModel.create(recipeData)
    .then((doc) => {
      console.log("doc:", doc);

      res.status(200).json({
        list: doc,
      });
    })
    .catch((err) => console.log("Error", err));
};
