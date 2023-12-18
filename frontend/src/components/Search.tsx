import * as React from "react";
import { iconSearch } from "../assets";
import {
  getCities,
  searchedCities,
  selectCity,
} from "../features/explore/exploreSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { useState } from "react";

export default function Search() {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedCity, setSelectedCity] = useState();
  let timeout: NodeJS.Timeout;

  const cities = useSelector(searchedCities);

  const handleOnCityClick = (city: any) => {
    console.log(city);
    setSelectedCity(city);
    dispatch(selectCity(city));
  };

  const helper = cities.map((city: any, index: any) => (
    <li key={index}>
      <button
        onClick={() => handleOnCityClick(city)}
        className="flex grow w-full text-mainGray hover:bg-mainLightGray hover:text-mainBlue transition-all rounded-lg px-2 py-1 text-lg"
      >
        {city.name}
      </button>
    </li>
  ));

  const handleOnSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      dispatch(getCities({ city: inputValue }));

      console.log(inputValue);
    }, 300);
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
        {helper && (
          <ul className="flex flex-col shadow-md mt-14 bg-white/95 rounded-xl fixed z-10 px-2 py-2">
            {helper}
          </ul>
        )}
      </div>
    </div>
  );
}
