import React from "react";
import styles from "../DetailPage/DetailPage.module.css";
import NavBar from "../NavBar/NavBar";
import { SpinnerRoundOutlined } from "spinners-react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipesDetail } from "../../redux/actions";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import detailImg from '../../assets/detaiImg.png'

const DetailPage = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { id } = useParams();
  const myRecipe = useSelector((state) => state.detail);
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  useEffect(() => {
    setLoading(true);
    dispatch(getRecipesDetail(id)).then(() => setLoading(false));
  }, [dispatch, id]);
  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.detailPage}>
        <div className={styles.welcome}>
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
                Welcome! Here I leave the recipe you are looking for with
                  all its details
                </p>
              </div>
            </div>
          )}
        </div>
        <div className={styles.detailImg}>
          <img src={detailImg} alt="" />
        </div>
        {loading ? (
          <div className={styles.spinner}>
            <SpinnerRoundOutlined color="#5E454B" />
          </div>
        ) : (
          <div className={styles.welcome}>
            <p>{myRecipe.id}</p>
            <hr />
            <p>{myRecipe.title}</p>
            <hr />
            <img src={myRecipe.Image} alt="" />
            <hr />
            <p>{myRecipe.SumamaryOfTheDish}</p>
            <hr />
            <p>{myRecipe.HealthyFoodLevel}</p>
            <hr />
            <p>{myRecipe.StepByStep}</p>
            <hr />
            <div>
              {myRecipe.Diets?.map((diet, i) => {
                return <p key={i}>{diet.name ? diet.name : diet}</p>;
              })}
            </div>
            <hr />
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailPage;
