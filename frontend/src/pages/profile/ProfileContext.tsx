import React from "react";
import { navLinks } from "../../constants";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const ProfileContext = () => {
  return (
    <nav className="flex justify-between px-[64px] py-[32px]">
      <div>
        <header className="flex flex-1">
          <h1 className="mx-[10px] my-[32px] text-[24px] font-bold">
            Adventurer.Net
          </h1>
        </header>
        <Navbar />
      </div>
      <div>Central Part</div>
      <div>Right Part</div>
    </nav>
  );
};

export default ProfileContext;
