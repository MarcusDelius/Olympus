import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

export const SideNav = () => {
  const router = useRouter();
  const path = router.pathname;

  const categories = [
    {
      name: "My games",
      path: "/play",
    },
    {
      name: "Leagues",
      path: "/leagues",
    },
    {
      name: "Coming soon",
      path: "",
    },
  ];

  return (
    <>
      <div className="h-full fixed top-30 hidden sm:flex flex-col items-center w-60 bg-menu-dark-600 pt-5 z-20">
        <div className="mb-5">
          <Image
            src="/1200px-League_of_Legends_2019_vector.png"
            alt="LeagueOfLegends"
            width={183}
            height={70}
          />
        </div>
        <div className="w-full">
          <ul className="relative">
            {categories.map((category) => (
              <li className="relative" key={category.name}>
                <Link href={category.path}>
                  <div
                    className={`cursor-pointer flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white text-ellipsis whitespace-nowrap rounded hover:bg-orange-500 hover:bg-opacity-90 transition duration-300 ease-in-out ${
                      path === category.path
                        ? "text-custom-orange hover:text-white font-bold"
                        : ""
                    }`}
                  >
                    <span>{category.name}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
