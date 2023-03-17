const { Recipe, Diets } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

const getApi = async () => {
  const apiUrl = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`
  );
  const apiInfo = await apiUrl.data.results?.map((recipe) => {
    return {
      id: recipe.id,
      title: recipe.title,
      Imagen: recipe.image,
      SumamaryOfTheDish: recipe.summary,
      HealthyFoodLevel: recipe.healthScore,
      StepByStep: recipe.analyzedInstructions?.map(
        (instrucciones) => instrucciones.steps
      ),
    };
  });
  return apiInfo;
};

const getDataBaseInfo = async () => {
  return await Recipe.findAll({
    include: {
      model: Diets,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

//controlador que trae todas las recetas
const getAllRecipe = async () => {
  let apiInfo = await getApi();
  let dataBaseInfo = await getDataBaseInfo();
  let allInfo = apiInfo.concat(dataBaseInfo);
  return allInfo;
};
//controlador que trae una receta por name
const findRecipeByTitle = async (title) => {
  let totalRecipe = await getAllRecipe();
  let findByTitle = await totalRecipe.filter((element) =>
    element.title.toLowerCase().includes(title.toLowerCase())
  );
  return findByTitle;
};
//controlador que trae una receta por id
const getRecipeById = async (recipeId) => {
  let totalRecipe = await getAllRecipe();
  let findById = await totalRecipe.find((element) => element.id == recipeId);

  return findById;
};

const createdRecipe = async (
  title,
  Imagen,
  SumamaryOfTheDish,
  HealthyFoodLevel,
  StepByStep,
  createInDb,
  diets
) => {
  const recipeCreated = await Recipe.create({
    title,
    Imagen,
    SumamaryOfTheDish,
    HealthyFoodLevel,
    StepByStep,
    createInDb,
  });

  const dietDataBase = await Diets.findAll({
    where: { name: diets },
  });

  recipeCreated.addDiets(dietDataBase);
  return recipeCreated;
};

// ---------------------------------------Diets ------------------------------------------

// let diets = [
//   { name: "gluten free" },
//   { name: "ketogenic" },
//   { name: "vegetarian" },
//   { name: "Lacto-Vegetarian" },
//   { name: "Ovo-Vegetarian" },
//   { name: "vegan" },
//   { name: "Pescetarian" },
//   { name: "Paleo" },
//   { name: "primal" },
//   { name: "Low FODMAP" },
//   { name: "whole 30" },
// ];
const diets = async () => {
  const apiUrl = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`
  );
  const apiInfo = await apiUrl.data.results?.map((recipe) => {
    return {
      name: recipe.diets?.map((element) => {
        element.diets;
      }),
    };
  });55
  console.log(apiInfo);
  return apiInfo;
};

module.exports = {
  getAllRecipe,
  findRecipeByTitle,
  getRecipeById,
  createdRecipe,
  diets,
};
