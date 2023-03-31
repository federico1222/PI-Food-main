/* eslint-disable array-callback-return */
import React from "react";
import styles from "../DetailPage/DetailPage.module.css";
import NavBar from "../NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { getRecipesDetail } from "../../redux/actions";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import detailPageTitulo from "../../assets/DETAILPAGETITUTLO.png";
import diet1 from "../../assets/diet1.png";
import diet2 from "../../assets/diet2.png";
import diet3 from "../../assets/diet3.png";
import diet4 from "../../assets/diet4.png";
import diet6 from "../../assets/diet6.png";
import diet7 from "../../assets/diet7.png";
import diet8 from "../../assets/diet8.png";
import diet9 from "../../assets/diet9.png";
import diet10 from "../../assets/diet10.png";
import diet11 from "../../assets/diet11.png";

const DetailPage = () => {
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const { id } = useParams();
  const myRecipe = useSelector((state) => state.detail);

  useEffect(() => {
    setLoading(true);
    dispatch(getRecipesDetail(id)).then(() => setLoading(false));
  }, [dispatch, id]);
  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.detailPage}>
        <div className={styles.imgDetail}>
          {isAuthenticated ? (
            <div className={styles.containerProfile}>
              <div className={styles.profile}>
                <h1>
                  <span>Hello</span> {user.name}
                </h1>
                <p>
                  Welcome back! Here I leave the recipe you are looking for with
                  all its details
                </p>
              </div>
              <div className={styles.imgProfile}></div>
            </div>
          ) : (
            <div className={styles.containerProfile}>
              <div className={styles.profile}>
                <h1>
                  <span>Hello</span>
                </h1>
                <p>
                  Welcome! Here I leave the recipe you are looking for with all
                  its details
                </p>
              </div>
            </div>
          )}
          <div className={styles.tituloDetail}>
            <img src={detailPageTitulo} alt="" />
            <Link to={"/HomePage"}>
              <button>Back to Home</button>
            </Link>
          </div>
        </div>
        <div className={styles.idRecipe}>
          <p>{myRecipe.id}</p>
        </div>

        {loading ? (
          <div className={styles.containerSpinner}>
            <div className={styles.spinner}></div>
          </div>
        ) : (
          <>
            <div className={styles.myRecipe}>
              <div className={styles.containerTitulo}>
                <h1>{myRecipe.title + "~"}</h1>
                <h4>{myRecipe.HealthyFoodLevel}</h4>
              </div>
              <div className={styles.date}>
                <hr />
                <img src={myRecipe.Imagen} alt="" />
                <div className={styles.details}>
                  <h3>Sumamary Of The Dish~</h3>
                  <p>{myRecipe.SumamaryOfTheDish}</p>
                </div>
                <div className={styles.details}>
                  <h3>Step By Step~</h3>
                  <p>{myRecipe.StepByStep}</p>
                </div>
              </div>
            </div>
            <div className={styles.diets}>
              <h3>Diets</h3>
              {myRecipe.Diets?.map((diet, i) => {
                if (diet.name === "gluten free" || diet === "gluten free") {
                  return <img src={diet1} alt="" />;
                }
                if (diet.name === "dairy free" || diet === "dairy free") {
                  return <img src={diet4} alt="" />;
                }
                if (diet.name === "ketogenic" || diet === "ketogenic") {
                  return <img src={diet2} alt="" />;
                }
                if (
                  diet.name === "lacto ovo vegetarian" ||
                  diet === "lacto ovo vegetarian"
                ) {
                  return <img src={diet3} alt="" />;
                }
                if (diet.name === "vegan" || diet === "vegan") {
                  return <img src={diet6} alt="" />;
                }
                if (diet.name === "pescatarian" || diet === "pescatarian") {
                  return <img src={diet7} alt="" />;
                }
                if (diet.name === "paleolithic" || diet === "paleolithic") {
                  return <img src={diet8} alt="" />;
                }
                if (diet.name === "primal" || diet === "primal") {
                  return <img src={diet9} alt="" />;
                }
                if (
                  diet.name === "fodmap friendly" ||
                  diet === "fodmap friendly"
                ) {
                  return <img src={diet10} alt="" />;
                }
                if (diet.name === "whole 30" || diet === "whole 30") {
                  return <img src={diet11} alt="" />;
                }
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailPage;
