import { useState } from "react";
import { Link } from "react-router-dom";
import { navLinks } from "../constants";

interface Props {
  currentPageId: string;
}

const Navbar = ({ currentPageId }: Props) => {
  const [selectedId, setSelectedId] = useState(currentPageId);

  const printNavBar = navLinks.map((nav) => (
    <li className="p-[10px] mb-0.5" key={nav.id}>
      <Link
        to={`/${nav.id}`}
        className={` transition p-[10px] text-[20px] rounded-2xl drop-shadow-md focus:drop-shadow hover:bg-blue-100 ${
          selectedId === nav.id
            ? "shadow-md shadow-blue-500/50 text-white bg-blue-600 hover:bg-blue-600/90 "
            : "text-black bg-none"
        }`}
        onClick={() => {
          setSelectedId(nav.id);
        }}
      >
        {nav.title}
      </Link>
    </li>
  ));

  return (
    <nav className="fixed flex flex-col justify-between px-[16px] xl:px-[64px] lg:px-[32px]">
      <header className="flex flex-1">
        <h1 className="mx-[10px] my-[32px] text-[24px] font-bold">
          Adventurer.Net
        </h1>
      </header>
      <ul className="">{printNavBar}</ul>
    </nav>
  );
};

export default Navbar;
