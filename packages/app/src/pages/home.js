import Head from "next/head";
import styles from "../styles/Landing.module.css";
import { PlayNowBox } from "../components/leagues/playNowBox";
import { CategoryBox } from "../components/navigation/categoryBox";

export default function Home(props) {
  return (
    <>
      <Head>
        <title>Home - Olympus</title>
        <meta
          name="description"
          content="Website for the TFM blockchain project"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.container}>
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-6 grid-flow-col-dense place-items-center">
          <PlayNowBox />
          <CategoryBox
            text="Create a new torunament!"
            description="Lorem ipsum dolor sit amet"
            link="/tournament/new"
            icon="trophy-fill"
          />
        </div>
        <h2 className="font-size-lg mt-8 mb-3">Your account</h2>
        <div class="flex">
          <div class="mb-3 xl:w-96">
            <label
              for="exampleFormControlInput1"
              class="form-label inline-block mb-2 text-custom-gray"
            >
              Link your account to start playing
            </label>
            <input
              type="text"
              class="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-custom-orange-strong focus:outline-none
      "
              id="exampleFormControlInput1"
              placeholder="Summoner name"
            />
          </div>
        </div>
        <button className="bg-gradient-to-r from-custom-orange-strong to-custom-orange hover:to-custom-orange-strong text-white font-bold py-2 px-4 rounded">
          Link
        </button>
      </main>
    </>
  );
}
