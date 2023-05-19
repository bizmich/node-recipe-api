const RecipeModel = require("../model/recipeModel");

module.exports.getAllRecipe = async (req, res) => {
  const recipe = await RecipeModel.find();

  res.status(200).json({
    list: recipe,
  });
};
module.exports.createRecipe = async (req, res) => {
  const recipeData = {
    createdDate: new Date().toISOString(),
    description: "Some description here",
    image: "image",
    ingredient: ["asdf", "asdf", "asdf"],
    name: "Pizzza",
    cookingTime: 5,
    rate: 5,
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
