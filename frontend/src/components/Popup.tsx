import React from "react";
import Blur from "./Blur";

const Popup = ({ children }: any) => {
  return (
    <div className="fixed z-10">
      <Blur zIndex={1} blurInPx={4} />
      <div className=" fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:w-1/2 md:w-2/3 w-11/12 max-h-fit rounded-xl px-6 py-3 drop-shadow-lg bg-white">
        {children}
      </div>
    </div>
  );
};

export default Popup;
