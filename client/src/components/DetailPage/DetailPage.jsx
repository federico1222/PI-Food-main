import React from "react";
import styles from '../DetailPage/DetailPage.module.css'
import NavBar from "../NavBar/NavBar";

const DetailPage = () => {
    return(
        <div className={styles.container}>
            <NavBar/>
            <div className={styles.detailPage}>

            </div>
        </div>
    )
};

export default DetailPage;