import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { BsImage } from "react-icons/bs";
import Slider from "../../components/Slider";
import PageTitle from "../../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  getActivities,
  getCitiesForFlights,
  getCitiesForPOI,
  getFlightCultureData,
  getFlightsSearchSuggestions,
  searchedCitiesForFlights,
  searchedCitiesForPOI,
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

  const citiesForPOI = useSelector(searchedCitiesForPOI);
  const citiesForFlights = useSelector(searchedCitiesForFlights);

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

  const handleOnPOICitySearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = e.target.value;

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      dispatch(getCitiesForPOI({ city: inputValue }));
    }, 300);
  };

  const handleOnFlightsSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = e.target.value;

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      dispatch(getFlightCultureData()).then(() => {
        dispatch(getFlightsSearchSuggestions({ searchedCity: inputValue }));
      });
      dispatch(getCitiesForFlights({ city: inputValue }));
    }, 300);
  };

  const searchedPOICities = citiesForPOI.map((city: any, index: any) => {
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
  const searchedFlightsCities = citiesForFlights.map(
    (city: any, index: any) => {
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
    }
  );

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
      <Search
        searched={searchedPOICities}
        handleOnSearchChange={handleOnPOICitySearchChange}
      />
      <Slider content={content} />
      <Search
        searched={searchedFlightsCities}
        handleOnSearchChange={handleOnFlightsSearchChange}
      />
    </div>
  );
};

export default Explore;
