import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Landing.module.css";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { useExampleNFTContractRead } from "../contracts";

const Landing = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (session) {
    router.push("/home");
  }
  return (
    <div className={styles.app}>
      <Head>
        <title>OLYMPUS</title>
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
