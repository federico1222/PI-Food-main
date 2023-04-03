import React from "react";
import recipesImg from "../../assets/recipesImg.png";
import styles from "../Recipes/Recipes.module.css";
import { Link } from "react-router-dom";


const Recipes = ({ title, showButton , id}) => {
  return (
    <div className={styles.containerRecipes}>
      <img src={recipesImg} alt="" />
      <div className={styles.tituloButton}>
        <h1>{title}</h1>
        {showButton && (
          <Link to={`/DetailPage/${id}`}>
            <button>View Details</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Recipes;
