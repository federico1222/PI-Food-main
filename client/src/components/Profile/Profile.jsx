import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "../Profile/Profile.module.css";
import { SpinnerRoundOutlined } from "spinners-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <SpinnerRoundOutlined color="#ffc62962" />;
  }

  return (
    isAuthenticated && (
      <div className={styles.containerProfile}>
        <div className={styles.profile}>
          <h1><span>Hello</span> {user.name}</h1>
          <p>Welcome back to our plataform</p>
        </div>
        <div className={styles.imgProfile}>
          {/* <img className={} src={user.picture} alt="user.hola" /> */}
        </div>
      </div>
    )
  );
};

export default Profile;
