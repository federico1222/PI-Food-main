import React from "react";
import recipesImg from '../../assets/recipesImg.png'
import styles from "../Recipes/Recipes.module.css";

const Recipes = ({ title}) => {
  return (
    <div className={styles.containerRecipes}>
      <img src={recipesImg} alt="" />
      <div className={styles.tituloButton}>
      <h1>{title}</h1>
      </div>
    </div>
  );
};

export default Recipes;
