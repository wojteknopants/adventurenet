import { useState } from "react";
import { Link } from "react-router-dom";
import { navLinks } from "../constants";
import { logo } from "../assets";

interface Props {
  currentPageId: string;
}

const Navbar = ({ currentPageId }: Props) => {
  const [selectedId, setSelectedId] = useState(currentPageId);

  const printNavBar = navLinks.map((nav) => (
    <li className="mt-2" key={nav.id}>
      <Link
        to={`/${nav.id}`}
        className={`flex items-center transition px-[5px] text-[20px] rounded-xl drop-shadow-md focus:drop-shadow hover:bg-blue-100${
          selectedId === nav.id
            ? "shadow-md shadow-blue-400/50 text-white bg-blue-400 hover:bg-blue-400/90 "
            : "text-blue-400 bg-none"
        } max-w-fit pr-5`}
        onClick={() => {
          setSelectedId(nav.id);
        }}
      >
        <img
          src={nav.icon}
          alt="icon"
          className={`mt-1 transition p-[10px] rounded-2xl ${
            selectedId === nav.id ? " fill-current text-white " : "bg-none"
          } `}
          style={{
            filter: `${
              selectedId === nav.id
                ? "invert(0%) grayscale(100%) contrast(10000%)"
                : "hue-rotate(190deg)"
            }`,
          }}
        />
        {nav.title}
      </Link>
    </li>
  ));

  return (
    <nav className="fixed flex flex-col justify-between px-[16px] xl:px-[64px] lg:px-[32px]">
      <header className="flex flex-1">
        {/* <h1 className="mx-[10px] my-[32px] text-[24px] font-bold">
          ADVENTURE.NET
        </h1> */}
        <img className="mx-[0px] my-[32px] font-bold flex flex-1" src={logo} />
      </header>
      <ul className="">{printNavBar}</ul>
    </nav>
  );
};

export default Navbar;
