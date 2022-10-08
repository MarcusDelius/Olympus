import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import React from "react";

import LoadingScreen from "./loadingScreen";
import { Navbar } from "./Navbar";
import { SideNav } from "./sideNav";

export default function Layout({ children, ...props }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  //const dispatch = useNotification();

  if (status === "loading") {
    return (
      <>
        <Navbar />
        <LoadingScreen />
      </>
    );
  } else {
    if ((status !== "authenticated") & (router.pathname !== "/")) {
      const icon = React.ReactElement;
      /* dispatch({
        type: "error",
        message: "You need to login first!",
        title: "Access denied",
        icon,
        position: "topR",
      }); */
      router.push("/");
    } else {
      //Si el usuario está autenticado (o estamos en landingPage), se muestra el layout
      return (
        <>
          <Navbar />
          {props.sideBar && <SideNav />}
          <div className={props.sideBar ? "flex sm:ml-[15rem]" : "flex"}>
            <main className="w-full min-h-screen bg-dark-bg-color text-white">
              {children}
            </main>
          </div>
        </>
      );
    }
  }
}
