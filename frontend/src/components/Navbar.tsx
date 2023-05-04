import React from "react";
import { navLinks } from "../constants";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <ul className="">
      {navLinks.map((nav, index) => (
        <li className="p-[10px]" key={nav.id}>
          <Link
            to={`/${nav.id}`}
            className="p-[10px] text-[20px] rounded-2xl active:bg-blue-600 active:text-white"
          >
            {nav.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Navbar;
