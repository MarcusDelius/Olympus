import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import UserLogin from "./auth/userLogin";
import { useSession } from "next-auth/react";

export const Navbar = (props) => {
  const categories = [
    {
      name: "Home",
      path: "/home",
    },
    {
      name: "Play",
      path: "/play",
    },
    {
      name: "Profile",
      path: "/profile",
    },
  ];

  const { data: session, status } = useSession();
  const router = useRouter();
  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive(!active);
  };

  const logoLink = (session) ? "/home" : "/";

  return (
    <>
      <nav className="flex items-center flex-wrap p-1 sticky top-0 bg-menu-darkBlue border-b border-zinc-900 z-20">
        <Link href={logoLink}>
          <a className="inline-flex items-center p-2 mr-4 ">
            <Image src="/VectorLogo.svg" alt="Logo" width={35} height={35} />
            <span className="text-xl text-white font-bold uppercase tracking-wide ml-4">
              Olympus
            </span>
          </a>
        </Link>
        <button
          className=" inline-flex p-3 hover:bg-orange-600 rounded lg:hidden text-white ml-auto hover:text-white outline-none"
          onClick={handleClick}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {/*Note that in this div we will use a ternary operator to decide whether or not to display the content of the div  */}
        <div
          className={`${
            active ? "" : "hidden"
          }   w-full lg:inline-flex lg:flex-grow lg:w-auto`}
        >
          <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start text-white font-bold flex flex-col lg:h-auto">
            {session && (
              categories.map((category) => (
                <Link key={category} href={category.path}>
                  <a className={`lg:inline-flex lg:w-auto w-full px-3 py-2 rounded items-center justify-center hover:bg-orange-600 hover:text-white ${category.path === router.pathname ? "text-orange-600" : "text-white"}`}>
                    {category.name}
                  </a>
                </Link>
              )))}
            <UserLogin />
          </div>
        </div>
      </nav>
    </>
  );
};
