import { useState } from "react";
import { Link } from "react-router-dom";
import { navLinks } from "../constants";
import { logo, smallLogo } from "../assets";
import { IoMenu } from "react-icons/io5";

interface MobileNavbarProps {
  currentPageId: string;
}

const MobileNavbar = ({ currentPageId }: MobileNavbarProps) => {
  const [selectedId, setSelectedId] = useState(currentPageId);
  const [isOpen, setIsOpen] = useState(false);

  const printMobileNavbar = navLinks.map((nav) => (
    <li className="" key={nav.id}>
      <Link
        to={`/${nav.id}`}
        className={`flex items-center transition-all px-2 text-xl rounded-xl drop-shadow-md focus:drop-shadow hover:bg-blue-100 dark:hover:bg-darkMainHover ${
          selectedId === nav.id
            ? "shadow-md shadow-blue-400/50 text-white bg-blue-400 hover:bg-blue-400/90 "
            : "text-blue-400 bg-none"
        } `}
        onClick={() => {
          setSelectedId(nav.id);
        }}
      >
        <img
          src={nav.icon}
          alt="icon"
          className={`transition p-2.5 rounded-2xl ${
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
        <div className="lg:block lg:pr-5 pr-0">{nav.title}</div>
      </Link>
    </li>
  ));

  return isOpen ? (
    <nav className="shadow-md bg-white/95 dark:bg-darkMainBackground/95 flex rounded-lg p-2 right-1 top-1 flex-col justify-between fixed">
      {/* <header className="flex flex-1 ">
        <img className="my-[32px] font-bold lg:flex flex-1 hidden" src={logo} />
        <img
          className="my-[32px] font-bold flex flex-1 lg:hidden"
          src={smallLogo}
        />
      </header> */}
      <ul
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex flex-col min-w-[64px]"
      >
        {printMobileNavbar}
      </ul>
    </nav>
  ) : (
    <nav
      onClick={() => setIsOpen((prev) => !prev)}
      className="text-mainGray top-5 rounded-sm fixed right-5 scale-[3.5]"
    >
      <IoMenu />
    </nav>
  );
};

export default MobileNavbar;
