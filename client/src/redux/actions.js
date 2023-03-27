import axios from "axios";
export const GET_RECIPES = "GET_RECIPES";
export const GET_DIETS = "GET_DIETS";
export const FILTER_BY_NAME = "FILTER_BY_NAME";
export const FILTER_BY_DATABASE = "FILTER_BY_DATABASE";
export const ORDER_BY_TITLE = "ORDER_BY_TITLE";
export const ORDER_BY_HEALTH_SCORE = "ORDER_BY_HEALTH_SCORE";
export const FILTER_BY_DIET = "FILTER_BY_DIET";
export const GET_DETAIL_RECIPES = "GET_DETAIL_RECIPES";

export function getRecipes() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/recipes");
    return dispatch({
      type: "GET_RECIPES",
      payload: json.data,
    });
  };
}
export function getRecipesDetail(id) {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/recipes/"+ id);
    return dispatch({
      type: "GET_DETAIL_RECIPES",
      payload: json.data,
    });
  };
}
export function getDiets() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/diets");
    return dispatch({
      type: "GET_DIETS",
      payload: json.data,
    });
  };
}
export function filterByName(payload) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        "http://localhost:3001/recipes?title=" + payload
      );
      return dispatch({
        type: "FILTER_BY_NAME",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function filterRecipesDataBase(payload) {
  return {
    type: "FILTER_BY_DATABASE",
    payload,
  };
}
export function orderByTitle(payload) {
  return {
    type: "ORDER_BY_TITLE",
    payload,
  };
}
export function orderByHealthScore(payload) {
  return {
    type: "ORDER_BY_HEALTH_SCORE",
    payload,
  };
}
export function orderByDiets(payload) {
  return {
    type: "FILTER_BY_DIET",
    payload,
  };
}
export function createRecipe(payload) {
  return async function (dispatch) {
    const response = await axios.post("http://localhost:3001/recipes", payload);
    console.log(response);
    return response;
  };
}
