import React from "react";
import styles from '../Recipes/Recipes.module.css'

const Recipes = ({title,imagen}) => {
  return (
    <div className={styles.containerRecipes}>
        <img className={styles.imgRecipes} src={imagen} alt="" />
        <p>{title}</p>
    </div>
  )
};

export default Recipes;