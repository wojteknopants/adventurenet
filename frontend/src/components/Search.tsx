import * as React from "react";
import { iconSearch } from "../assets";
import { getCities, searchedCities } from "../features/explore/exploreSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";

export default function Search() {
  const dispatch = useDispatch<AppDispatch>();
  let timeout: NodeJS.Timeout;

  const cities = useSelector(searchedCities);

  const helper = cities.map((city: any, index: any) => (
    <div key={index}>{city.name}</div>
  ));

  const handleOnSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      dispatch(getCities({ city: inputValue }));

      console.log(inputValue);
    }, 500);
  };

  return (
    <div className="flex mt-4 gap-3">
      <div className="flex flex-col grow">
        <div className="border grow rounded-xl relative">
          <input
            onChange={handleOnSearchChange}
            className="block w-full p-3 px-4 overflow-hidden h-12 rounded-xl"
            placeholder="Search"
          />
          <button className="absolute top-3 right-3 text-gray-400">
            <img src={iconSearch} alt="icon" className="" />
          </button>
        </div>
        {helper}
      </div>
    </div>
  );
}
