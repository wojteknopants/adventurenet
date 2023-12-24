import { iconSearch } from "../assets";

interface searchProps {
  searched: any;
  handleOnSearchChange: any;
}

export default function Search({
  searched,
  handleOnSearchChange,
}: searchProps) {
  return (
    <div className="flex mt-4 gap-3">
      <div className="flex flex-col grow">
        <div className="shadow-md grow rounded-xl relative">
          <input
            onChange={handleOnSearchChange}
            className="block w-full p-3 px-4 overflow-hidden h-12 rounded-xl"
            placeholder="Search"
          />
          <button className="absolute top-3 right-3 text-gray-400">
            <img src={iconSearch} alt="icon" className="" />
          </button>
        </div>
        {searched?.length !== 0 && (
          <ul className="flex flex-col mt-14 shadow-md bg-white/95 rounded-xl absolute z-10 px-2 py-2">
            {searched}
          </ul>
        )}
      </div>
    </div>
  );
}
