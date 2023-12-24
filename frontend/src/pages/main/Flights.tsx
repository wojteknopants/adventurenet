import React, { useState } from "react";
import PageTitle from "../../components/PageTitle";
import Search from "../../components/Search";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import {
  countriesToFlight,
  getFlightCultureData,
  getFlights,
  getFlightsSearchSuggestions,
  searchedCitiesForFlights,
  selectCity,
} from "../../features/explore/exploreSlice";
import Card from "../../components/Card";
import FlightsPopup from "../../components/FlightsPopup";

interface FlightCountry {
  country: any;
  offers: any;
}

const Flights = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedCity, setSelectedCity] = useState();
  const [selectedFlightCountry, setSelectedFlightCountry] =
    useState<FlightCountry>();
  const [showFlights, setShowFlights] = useState(false);
  let timeout: NodeJS.Timeout;

  const citiesForFlights = useSelector(searchedCitiesForFlights);
  const countriesOffers = useSelector(countriesToFlight);

  const handleOnFlightCityClick = (city: any) => {
    console.log(city);
    setSelectedCity(city);
    dispatch(selectCity(city));

    dispatch(getFlights({ entityId: city.entityId }));
  };

  const handleOnCardClick = (offers: any, country: any) => {
    setShowFlights(true);
    setSelectedFlightCountry({ country: country, offers: offers });
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
            <div className="flex text-mainGray/50 text-sm">
              {place.type === "PLACE_TYPE_AIRPORT" ? "AIRPORT" : "CITY"} -{" "}
              {place.countryName}
            </div>
          </button>
        </li>
      );
    }
  );

  const flightOffers = Object.keys(countriesOffers).map((country) => (
    <div
      key={country}
      className="p-4 flex flex-col text-lg bg-white text-mainGray transition-all hover:bg-mainLightGray hover:text-mainBlue rounded-lg shadow-md cursor-pointer gap-2"
      onClick={() => handleOnCardClick(countriesOffers[country], country)}
    >
      <div className="">{country}</div>
      <div className="text-sm text-mainGray/50 ">
        <div>Cheapest price : {countriesOffers[country].cheapest}</div>
        <div>
          Has direct flights :{" "}
          {countriesOffers[country].has_direct ? "YES" : "NO"}
        </div>
      </div>
    </div>
  ));

  const handleClosePopup = () => {
    setShowFlights(false);
  };

  return (
    <div className="">
      <PageTitle title="Flights" />
      <Search
        searched={searchedFlightsCities}
        handleOnSearchChange={handleOnFlightsSearchChange}
      />
      <div className="mt-5 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {flightOffers}
        {showFlights && (
          <FlightsPopup
            selectedFlightCountry={selectedFlightCountry}
            closePopup={handleClosePopup}
          />
        )}
      </div>
    </div>
  );
};

export default Flights;
