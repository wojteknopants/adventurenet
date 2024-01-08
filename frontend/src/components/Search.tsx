import { iconSearch } from "../assets";
import { useState } from "react";
interface searchProps {
  searched: any;
  handleOnSearchChange: any;
  placeholder?: string;
  offShadows?: any;
  value?: string;
}

export default function Search({
  searched,
  handleOnSearchChange,
  placeholder,
  offShadows = false,
  value,
}: searchProps) {
  const [val, setVal] = useState<any>("");
  console.log(val);
  return (
    <div className="flex flex-col grow gap-3">
      <div
        className={`
          ${offShadows ? "shadow-sm" : "shadow-md"}  rounded-xl relative`}
      >
        <input
          onChange={(e) => {
            // setVal(e.target.value);
            handleOnSearchChange(e, setVal);
          }}
          className="block w-full p-3 px-4 overflow-hidden h-12 rounded-xl dark:bg-darkMainBackground dark:text-darkWhiteText"
          placeholder={placeholder}
          value={value}
        />
        <button className="absolute top-3 right-3 text-gray-400">
          <img src={iconSearch} alt="icon" className="" />
        </button>
      </div>
      {searched?.length !== 0 && (
        <ul
          className={`${
            offShadows ? "shadow-sm" : "shadow-md"
          } flex flex-col mt-14  bg-white/95 rounded-xl absolute z-10 px-2 py-2 dark:bg-darkMainBackground`}
        >
          {searched}
        </ul>
      )}
    </div>
  );
}
