import ClipLoader from "react-spinners/ClipLoader";
import styles from "../styles/Landing.module.css";

export default function LoadingScreen() {
  return (
    <div className={styles.app}>
        <div className={styles.container}>
        <main className={styles.main}>
            <ClipLoader color={"#123abc"} loading={true} size={150} />
        </main>
        </div>
    </div>
  );
}
