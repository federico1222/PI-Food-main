const { Recipe, Diets } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

const getApi = async () => {
  const apiUrl = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  );
  const apiInfo = await apiUrl.data.results?.map((recipe) => {
    return {
      id: recipe.id,
      title: recipe.title,
      Imagen: recipe.image,
      SumamaryOfTheDish: recipe.summary,
      HealthyFoodLevel: recipe.healthScore,
      StepByStep: recipe.analyzedInstructions?.map((instrucciones) =>
        instrucciones.steps?.map((steps) => steps.step)
      ),
      Diets: recipe.diets,
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

  const dietPromises = diets.map(async (diet) => {
    let dietInstance = await Diets.findOrCreate({
      where: { name: diet },
    });
    return dietInstance[0];
  });

  const dietInstances = await Promise.all(dietPromises);
  recipeCreated.addDiets(dietInstances);
  return recipeCreated;
};

// ---------------------------------------Diets ------------------------------------------
//En este código, estamos creando un conjunto vacío llamado dietsSet.
//Luego, por cada receta que obtenemos de la API, recorremos su propiedad Diets.
//Si encontramos una dieta que aún no está en el conjunto, la agregamos utilizando
//el método add() de Set. Una vez que hemos recorrido todas las recetas, convertimos
//el conjunto en un array utilizando el operador .... Finalmente, devolvemos el array de
//dietas.

const getAlldiets = async () => {
  const diets = await getAllRecipe();
  const dietsSet = new Set();

  for (const recipe of diets) {
    for (const diet of recipe.Diets) {
      dietsSet.add(diet);
    }
  }
  const dietsArray = [...dietsSet];
  return dietsArray;
};

module.exports = {
  getAllRecipe,
  findRecipeByTitle,
  getRecipeById,
  createdRecipe,
  getAlldiets,
};
