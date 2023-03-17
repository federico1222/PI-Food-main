import React from "react";
import styles from "../NavBar/NavBar.module.css";
import Logout from "../Logout/Logout";
import iconoLanding from "../../assets/icono-titulo2.png";
import { RiHomeFill } from "react-icons/ri";
import { BiFoodMenu } from "react-icons/bi";
import { MdOutlineFoodBank, MdOutlineFavorite } from "react-icons/md";
import { useAuth0 } from "@auth0/auth0-react";
import Login from '../Login/Login'

const NavBar = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <div className={styles.containerNav}>
      <div className={styles.logoLanding}>
        <img src={iconoLanding} alt="" />
      </div>
      <div className={styles.buttons}>
        <div className={styles.buttonNav}>
          <RiHomeFill className={styles.icon} />
        </div>
        <div className={styles.buttonNav}>
          <BiFoodMenu className={styles.icon} />
        </div>
        <div className={styles.buttonNav}>
          <MdOutlineFoodBank className={styles.icon} />
        </div>
        <div className={styles.buttonNav}>
          <MdOutlineFavorite className={styles.icon} />
        </div>
      </div>
      <div className={styles.ProfileLogout}>
      {isAuthenticated ? (
              <>
                <Logout />
              </>
            ) : (
              <Login />
            )}
      </div>
    </div>
  );
};
export default NavBar;
