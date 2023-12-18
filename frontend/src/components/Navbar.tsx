import { useState } from "react";
import { Link } from "react-router-dom";
import { navLinks } from "../constants";
import { logo, smallLogo } from "../assets";

interface NavbarProps {
  currentPageId: string;
}

const Navbar = ({ currentPageId }: NavbarProps) => {
  const [selectedId, setSelectedId] = useState(currentPageId);

  const printNavBar = navLinks.map((nav) => (
    <li className="mt-2" key={nav.id}>
      <Link
        to={`/${nav.id}`}
        className={`flex items-center transition px-2 text-xl rounded-xl drop-shadow-md focus:drop-shadow hover:bg-blue-100 ${
          selectedId === nav.id
            ? "shadow-md shadow-blue-400/50 text-white bg-blue-400 hover:bg-blue-400/90 "
            : "text-blue-400 bg-none"
        } max-w-fit `}
        onClick={() => {
          setSelectedId(nav.id);
        }}
      >
        <img
          src={nav.icon}
          alt="icon"
          className={`mt-1 transition p-2.5 rounded-2xl ${
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
        <div className="lg:block lg:pr-5 pr-0 hidden">{nav.title}</div>
      </Link>
    </li>
  ));

  return (
    <nav className=" flex flex-col justify-between px-[8px] xl:px-[64px] lg:px-[32px] fixed">
      <header className="flex flex-1 ">
        <img className="my-[32px] font-bold lg:flex flex-1 hidden" src={logo} />
        <img
          className="my-[32px] font-bold flex flex-1 lg:hidden"
          src={smallLogo}
        />
      </header>
      <ul className="flex flex-col justify-center min-w-[64px]">
        {printNavBar}
      </ul>
    </nav>
  );
};

export default Navbar;
