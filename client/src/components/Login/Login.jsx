import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "../Login/Login.module.css";
import imgLogin from "../../assets/iniciar-sesion.png";
import imgSingIn from "../../assets/user.png";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();
  return isAuthenticated ? (
    <div className={styles.profile}>
      <p>{user.name}</p>
      <img class={styles.imgProfile} src={user.picture} alt="" />
    </div>
  ) : (
    <div className={styles.LoginRegister}>
      <div className={styles.containerLogin}>
        <p onClick={() => loginWithRedirect()}>Log In</p>
        <img src={imgLogin} alt="" />
      </div>
      <div className={styles.containerSingIn}>
        <p onClick={() => loginWithRedirect()}>Sing In</p>
        <img src={imgSingIn} alt="" />
      </div>
    </div>
  );
};

export default LoginButton;
