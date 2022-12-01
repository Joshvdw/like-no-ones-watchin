import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import { useRef, useEffect } from "react";
import { getPositions } from "../components/singleComponents/Utils/Utils";

const Home: NextPage = () => {
  const fwdRef = useRef<HTMLHeadingElement>(null);
  return (
    <div className={styles.container}>
      <Head>
        <title>Next Three Boilerplate</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/psyFav.gif" />
      </Head>

      <main className={styles.main}>
        {/* <h1 ref={fwdRef}>Next Three Boilerplate</h1> */}
      </main>
    </div>
  );
};

export default Home;
