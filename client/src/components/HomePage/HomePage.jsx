import React from "react";
import styles from "../HomePage/HomePage.module.css";
import Navbar from "../NavBar/NavBar";
import Profile from "../Profile/Profile";
import Carrusel from "../Carrusel/Carrusel";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../../redux/actions";
import Recipes from "../Recipes/Recipes";

const HomePage = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);

  useEffect(() => {
    dispatch(getRecipes());
  }, []);
  return (
    <div className={styles.containerHome}>
      <Navbar />
      <div className={styles.home}>
        <div className={styles.welcome}>
          <Profile />
        </div>
        <div className={styles.containerDiets}>
          <h2>Diets</h2>
          <div className={styles.diets}>
            <Carrusel />
          </div>
        </div>
        <div className={styles.containerDiets}>
          <h2>Explore Our Recipes</h2>
          <div className={styles.recipes}>
            {allRecipes.map((recipe) => {
              return <Recipes title={recipe.title} imagen={recipe.Imagen} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
