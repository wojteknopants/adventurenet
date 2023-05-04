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
        <div className="w-[762px] h-[2000px] shadow-inner bg-slate-100">
          <div className="mx-8">
            <Outlet />
          </div>
        </div>
        <div className="w-[362px]">
          <Contacts />
        </div>
      </div>
    </div>
  );
};

export default MainContext;
