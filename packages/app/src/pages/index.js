import { ConnectButton } from "@rainbow-me/rainbowkit";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Landing.module.css";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { useExampleNFTContractRead } from "../contracts";
import { Inventory } from "../Inventory";
import { MintButton } from "../MintButton";
import { useIsMounted } from "../useIsMounted";

const Landing = () => {
  const totalSupply = useExampleNFTContractRead({
    functionName: "totalSupply",
    watch: true,
  });
  const maxSupply = useExampleNFTContractRead({ functionName: "MAX_SUPPLY" });

  const isMounted = useIsMounted();

  return (
    <div className={styles.app}>
      <Head>
        <title>TFM Project</title>
        <meta
          name="description"
          content="Website for the TFM blockchain project"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            OLYMPUS
            <span style={{ color: "#E95E51" }}> gaming</span>.
          </h1>

          <p className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum
          </p>

          <Image
            src="/controller.png"
            alt="controller"
            width={450}
            height={450}
          />
        </main>
      </div>
    </div>
  );
};

export default Landing;
