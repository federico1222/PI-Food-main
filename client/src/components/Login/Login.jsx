import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "../Login/Login.module.css";
import { BiLogIn ,BiUser} from "react-icons/bi";


const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();
  return isAuthenticated ? (
    <div className={styles.profile}>
      <p>{user.name}</p>
      <img className={styles.imgProfile} src={user.picture} alt="" />
    </div>
  ) : (
    <div className={styles.LoginRegister}>
        <button className={styles.singInButton} onClick={() => loginWithRedirect()}>Log In <BiLogIn/></button>
        <button className={styles.LoginButton} onClick={() => loginWithRedirect()}>Sing In <BiUser/></button>
    </div>
  );
};

export default LoginButton;
