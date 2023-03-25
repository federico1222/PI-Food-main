import {
  GET_RECIPES,
  FILTER_BY_DIET,
  FILTER_BY_DATABASE,
  ORDER_BY_TITLE,
  ORDER_BY_HEALTH_SCORE,
  FILTER_BY_NAME,
  GET_DIETS,
} from "./actions";

const initialState = {
  recipes: [],
  allRecipes: [],
  diets: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //--------------------------------GET_RECIPES--------------------------------\\
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };
    //--------------------------------POST_RECIPES--------------------------------\\
    case "POST_RECIPES":
      return {
        ...state,
      };
    //--------------------------------FILTER_BY_NAME--------------------------------\\
    case FILTER_BY_NAME:
      return {
        ...state,
        recipes: action.payload,
      };
    //--------------------------------FILTER_BY_DATABASE--------------------------------\\
    case FILTER_BY_DATABASE:
      const filterByDataBase = state.allRecipes;
      const filteredRecipes =
        action.payload === "created"
          ? filterByDataBase.filter((element) => element.createInDb)
          : filterByDataBase.filter((element) => !element.createInDb);
      return {
        ...state,
        recipes:
          action.payload === "allRecipes" ? state.allRecipes : filteredRecipes,
      };
    //--------------------------------ORDER_BY_TITLE--------------------------------\\
    case ORDER_BY_TITLE:
      const sortedRecipes = [...state.recipes];
      if (action.payload === "asc") {
        sortedRecipes.sort((a, b) => a.title.localeCompare(b.title));
      } else if (action.payload === "desc") {
        sortedRecipes.sort((a, b) => -a.title.localeCompare(b.title));
      }
      return {
        ...state,
        recipes: sortedRecipes,
      };
    //--------------------------------ORDER_BY_HEALTH_SCORE--------------------------------\\
    case ORDER_BY_HEALTH_SCORE:
      const orderedRecipes = [...state.recipes];
      if (action.payload === "ceroCien") {
        orderedRecipes.sort((a, b) => a.HealthyFoodLevel - b.HealthyFoodLevel);
      } else if (action.payload === "cienCero") {
        orderedRecipes.sort((a, b) => b.HealthyFoodLevel - a.HealthyFoodLevel);
      }
      return {
        ...state,
        recipes: orderedRecipes,
      };
    //--------------------------------GET_DIET--------------------------------\\
    case GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      };
    //--------------------------------FILTER_BY_DIET--------------------------------\\
    case FILTER_BY_DIET:
      const filteredDiets = state.allRecipes.filter((recipe) =>
        recipe.Diets.some((diet) =>
          diet.name
            ? diet.name.includes(action.payload)
            : diet.includes(action.payload)
        )
      );
      //uso el método some() para recorrer todas las dietas de cada receta y verificar 
      //si alguna de ellas coincide con "action.payload". En cada iteración del some(),
      //verifico si la dieta tiene una propiedad "name" y, en caso afirmativo, uso esa
      //propiedad para compararla con "action.payload". Si la dieta no tiene una propiedad 
      //"name", simplemente comparo la dieta completa con "action.payload".
      return {
        ...state,
        recipes:
          action.payload === "allRecipes" ? state.allRecipes : filteredDiets,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
