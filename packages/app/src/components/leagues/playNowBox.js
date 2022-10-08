import Link from "next/link";
import Image from "next/image";

export const PlayNowBox = () => {
  return (
    <Link href="/play">
      <div className="group infoBox h-fit w-full text-center hover:text-custom-orange-strong hover:cursor-pointer transform transition duration-1000 hover:scale-105">
        <div className="transform transition duration-500 translate-y-2 group-hover:-translate-y-1.5">
          <Image
            src="/controller.png"
            alt="controller"
            width={100}
            height={100}
          />
          <br></br>
          <span className="text-xl font-medium">PLAY NOW</span>
        </div>
        <div className="text-sm text-custom-gray opacity-0 group-hover:opacity-100 transform transition-all duration-500">
          Find new games and start earning
        </div>
      </div>
    </Link>
  );
};
