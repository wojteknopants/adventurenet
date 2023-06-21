import * as React from "react";
import { iconSearch } from "../assets";

export default function CustomizedInputBase() {
  return (
    // <div className='flex gap-2 items-center mt-2'>
    //   <img
    //       src={iconSearch}
    //       alt="icon"
    //       className=''
    //     />
    //   <p className=''>Search</p>
    // </div>

    <div className="flex mt-4 gap-3">
      <div className="border grow rounded-xl relative">
        <input
          className="block w-full p-3 px-4 overflow-hidden h-12 rounded-xl"
          placeholder="Search"
        ></input>
        <button className="absolute top-3 right-3 text-gray-400">
          <img src={iconSearch} alt="icon" className="" />
        </button>
      </div>
    </div>
  );
}
