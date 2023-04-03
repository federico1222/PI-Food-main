import React from "react";
import { connect } from "react-redux";
import Navbar from "../NavBar/NavBar";
import Recipes from "../Recipes/Recipes";
import styles from "../FavoritePage/Favorite.module.css";
import imgSlogan from "../../assets/sloganFavorites.png";

const FavoritePage = (props) => {
  return (
    <div className={styles.containerHome}>
      <Navbar />
      <div className={styles.home}>
        <div className={styles.slogan}>
          <img src={imgSlogan} alt="" />
        </div>
        <div className={styles.containerRecipesFav}>
          {props.MyFavorites?.map((fav, i) => {
            return (
              <>
                <Recipes key={i} title={fav.title} showButton={true} id={fav.id}/>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    MyFavorites: state.MyFavorites,
  };
};

export default connect(mapStateToProps, null)(FavoritePage);
