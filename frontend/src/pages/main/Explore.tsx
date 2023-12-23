import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { BsImage } from "react-icons/bs";
import Slider from "../../components/Slider";
import PageTitle from "../../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  getActivities,
  getCities,
  searchedCities,
  selectCity,
} from "../../features/explore/exploreSlice";
import { AppDispatch } from "../../store";
import Search from "../../components/Search";

const hotels = [
  { name: "Hotel One", stars: 4, price: "$$" },
  { name: "Hotel Two", stars: 3, price: "$$$" },
  { name: "Hotel Three", stars: 2, price: "$$$" },
  { name: "Hotel Four", stars: 5, price: "$" },
  { name: "Hotel Five", stars: 3, price: "$$" },
  { name: "Hotel One", stars: 4, price: "$$" },
  { name: "Hotel Two", stars: 3, price: "$$$" },
  { name: "Hotel Three", stars: 2, price: "$$$" },
  { name: "Hotel Four", stars: 5, price: "$" },
  { name: "Hotel Five", stars: 3, price: "$$" },
  { name: "Hotel One", stars: 4, price: "$$" },
  { name: "Hotel Two", stars: 3, price: "$$$" },
  { name: "Hotel Three", stars: 2, price: "$$$" },
  { name: "Hotel Four", stars: 5, price: "$" },
  { name: "Hotel Five", stars: 3, price: "$$" },
  { name: "Hotel One", stars: 4, price: "$$" },
  { name: "Hotel Two", stars: 3, price: "$$$" },
  { name: "Hotel Three", stars: 2, price: "$$$" },
  { name: "Hotel Four", stars: 5, price: "$" },
  { name: "Hotel Five", stars: 3, price: "$$" },
];

const Explore = () => {
  const cardRef = useRef(null);

  const dispatch = useDispatch<AppDispatch>();
  const [selectedCity, setSelectedCity] = useState();
  let timeout: NodeJS.Timeout;

  const cities = useSelector(searchedCities);

  const handleOnCityClick = (city: any) => {
    console.log(city);
    setSelectedCity(city);
    dispatch(selectCity(city));
    dispatch(
      getActivities({
        latitude: city.geoCode.latitude,
        longitude: city.geoCode.longitude,
      })
    );
  };

  const handleOnSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      dispatch(getCities({ city: inputValue }));
    }, 300);
  };

  const searched = cities.map((city: any, index: any) => {
    console.log(city);
    return (
      <li key={index}>
        <button
          onClick={() => handleOnCityClick(city)}
          className="flex grow w-full text-mainGray hover:bg-mainLightGray hover:text-mainBlue transition-all rounded-lg px-2 py-1 text-lg"
        >
          {city.name}
        </button>
      </li>
    );
  });

  const content = hotels.map((hotel, index) => (
    <div
      key={index}
      className=" snap-start mr-4 min-w-[200px] rounded-xl bg-white"
      ref={cardRef}
    >
      <div>
        <BsImage className="w-full h-40 p-2 text-mainDarkGray" />
        <div className="p-4">
          <div className="mt-2">{hotel.name}</div>
          <div>{hotel.stars}</div>
          <div>{hotel.price}</div>
        </div>
      </div>
    </div>
  ));

  return (
    <div>
      <PageTitle title="Explore" />
      <Search searched={searched} handleOnSearchChange={handleOnSearchChange} />
      <Slider content={content} />
    </div>
  );
};

export default Explore;
