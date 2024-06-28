import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Card from "../components/Card/Card";
import Navbar from "../components/Navbar/Navbar";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <Card />
    </div>
  );
};

export default Home;
