/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "../Profile/Profile.module.css";
import { SpinnerRoundOutlined } from "spinners-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return <SpinnerRoundOutlined color="#CEE5D0" />;
  }

  return isAuthenticated ? (
    <div className={styles.containerProfile}>
      <div className={styles.profile}>
        <h1>
          <span>Hello</span> {user.name}
        </h1>
        <p>Welcome back to our plataform</p>
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
          Welcome our plataform, Sing up{" "}
          <u><a onClick={() => loginWithRedirect()}>hear</a></u>
        </p>
      </div>
    </div>
  );
};

export default Profile;
