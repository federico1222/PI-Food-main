import { useAuth0 } from "@auth0/auth0-react";
import { FiLogOut } from "react-icons/fi";
import styles from "../Logout/Logout.module.css";
import React from "react";

const LogoutButton = () => {
  const { logout, user, isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
      <div className={styles.divLogout}>
        <img className={styles.img} src={user.picture} alt="user.hola" />
        <button
          className={styles.containerLinks}
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          <FiLogOut className={styles.icon}/>
        </button>
      </div>
    )
  );
};

export default LogoutButton;
