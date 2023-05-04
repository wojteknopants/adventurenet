import React from "react";
import Navbar from "../components/Navbar";
import { Outlet, Route } from "react-router-dom";
import Feed from "./feed/Feed";
import Messages from "./messages/Messages";
import Contacts from "../components/Contacts";

const MainContext = () => {
  return (
    <div>
      <div className="flex justify-between">
        <div className="w-[362px]">
          <Navbar currentPageId={"feed"} />
        </div>
        <div className="w-[762px] h-[2000px] bg-slate-400">
          <Outlet />
        </div>
        <div className="w-[362px]">
          <Contacts />
        </div>
      </div>
    </div>
  );
};

export default MainContext;
