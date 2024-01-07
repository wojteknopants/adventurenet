import { iconSearch } from "../assets";

interface searchProps {
  searched: any;
  handleOnSearchChange: any;
  placeholder?: any;
  offShadows?: any;
}

export default function Search({
  searched,
  handleOnSearchChange,
  placeholder,
  offShadows = false,
}: searchProps) {
  return (
    <div className="flex flex-col grow gap-3">
      <div
        className={`
          ${offShadows ? "shadow-sm" : "shadow-md"}  rounded-xl relative`}
      >
        <input
          onChange={handleOnSearchChange}
          className="block w-full p-3 px-4 overflow-hidden h-12 rounded-xl dark:bg-darkMainBackground dark:text-darkWhiteText"
          placeholder={placeholder}
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
