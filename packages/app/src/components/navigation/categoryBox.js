import Link from "next/link";
import Image from "next/image";

export const CategoryBox = (props) => {
  return (
    <Link href={props.link}>
      <div className="group infoBox h-fit w-full text-center hover:text-custom-orange-strong hover:cursor-pointer transform transition duration-1000 hover:scale-105">
        <div className="transform transition duration-500 translate-y-2 group-hover:-translate-y-1.5">
          <i className={`bi bi-${props.icon} text-5xl text-custom-gray group-hover:text-custom-orange-strong`} />
          <div className="mt-1 text-custom-gray text-xl font-medium group-hover:text-custom-orange-strong">{props.text}</div>
        </div>
        <div className="text-sm text-custom-gray opacity-0 group-hover:opacity-100 transform transition-all duration-500">
          {props.description}
        </div>
      </div>
    </Link>
  );
};
