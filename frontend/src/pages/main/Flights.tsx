import React, { useState } from "react";
import PageTitle from "../../components/PageTitle";
import Search from "../../components/Search";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import {
  getFlightCultureData,
  getFlights,
  getFlightsSearchSuggestions,
  searchedCitiesForFlights,
  selectCity,
} from "../../features/explore/exploreSlice";

const Flights = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedCity, setSelectedCity] = useState();
  let timeout: NodeJS.Timeout;

  const citiesForFlights = useSelector(searchedCitiesForFlights);

  const handleOnFlightCityClick = (city: any) => {
    console.log(city);
    setSelectedCity(city);
    dispatch(selectCity(city));

    dispatch(getFlights({ entityId: city.entityId }));
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
    }, 300);
  };
  const searchedFlightsCities = citiesForFlights.map(
    (place: any, index: any) => {
      return (
        <li key={index}>
          <button
            onClick={() => handleOnFlightCityClick(place)}
            className="flex flex-col grow w-full text-mainGray hover:bg-mainLightGray hover:text-mainBlue transition-all rounded-lg px-2 py-1 text-lg"
          >
            <div>{place.name}</div>
            <div className="flex text-mainGray/50 text-sm hover:text-mainGray/100">
              {place.type === "PLACE_TYPE_AIRPORT" ? "AIRPORT" : "CITY"} -{" "}
              {place.countryName}
            </div>
          </button>
        </li>
      );
    }
  );
  return (
    <div>
      <PageTitle title="Flights" />
      <Search
        searched={searchedFlightsCities}
        handleOnSearchChange={handleOnFlightsSearchChange}
      />
    </div>
  );
};

export default Flights;
