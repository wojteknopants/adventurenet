import React, { useState } from "react";
import PageTitle from "../../components/PageTitle";
import Search from "../../components/Search";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import {
  countriesToFlight,
  getCultureData,
  getFlightCultureData,
  getFlights,
  getFlightsSearchSuggestions,
  searchedCitiesForFlights,
  selectCity,
} from "../../features/explore/flightsSlice";
import FlightsPopup from "../../components/FlightsPopup";
import DropdownMenu from "../../components/DropdownMenu";

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
  const [isMonthDropDownOpen, setIsMonthDropDownOpen] = useState(false);
  const [isYearDropDownOpen, setIsYearDropDownOpen] = useState(false);
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  let timeout: NodeJS.Timeout;

  const citiesForFlights = useSelector(searchedCitiesForFlights);
  const countriesOffers = useSelector(countriesToFlight);
  const cultureData = useSelector(getCultureData);

  const handleOnFlightCityClick = (city: any) => {
    console.log(city);
    setSelectedCity(city);
    dispatch(selectCity(city));

    dispatch(getFlights({ entityId: city.entityId, month: month, year: year }));
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
            className="flex flex-col grow w-full text-mainGray hover:bg-mainLightGray dark:hover:bg-darkMainHover hover:text-mainBlue transition-all rounded-lg px-2 py-1 text-lg"
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
  console.log(countriesOffers);
  const flightOffers =
    countriesOffers && Object.keys(countriesOffers).length !== 0 ? (
      Object.keys(countriesOffers).map((country) => (
        <div
          key={country}
          className="p-4 flex flex-col text-lg bg-white dark:bg-darkMainBackground text-mainGray transition-all hover:bg-mainLightGray dark:hover:bg-darkMainHover hover:text-mainBlue rounded-lg shadow-md cursor-pointer gap-2 justify-between"
          onClick={() => handleOnCardClick(countriesOffers[country], country)}
        >
          <div className="">{country}</div>
          <div className="text-sm text-mainGray/50 ">
            <div>
              Cheapest price : {countriesOffers[country].cheapest}{" "}
              {cultureData.currency}
            </div>
            <div>
              Has direct flights :{" "}
              {countriesOffers[country].has_direct ? "YES" : "NO"}
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-mainGray/50 text-xl font-bold m-auto">
        Not found
      </div>
    );

  const handleClosePopup = () => {
    setShowFlights(false);
  };

  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const currentYear = new Date().getFullYear();

  const years = [currentYear, currentYear + 1];

  return (
    <>
      <PageTitle title="Flights" />
      <h3 className="text-xl text-mainGray">Cheapest flights destination from your departure country/city.</h3>
      <div className="flex shadow-none gap-2">
        <DropdownMenu
          handleDropdown={() => setIsMonthDropDownOpen((prev) => !prev)}
          isOpen={isMonthDropDownOpen}
          placeHolder={month || "MM"}
          setValue={setMonth}
          dropDownContent={months}
        />
        <DropdownMenu
          handleDropdown={() => setIsYearDropDownOpen((prev) => !prev)}
          isOpen={isYearDropDownOpen}
          placeHolder={year || "YY"}
          setValue={setYear}
          dropDownContent={years}
        />
        <Search
          placeholder={"Type from where you want to fly..."}
          searched={searchedFlightsCities}
          handleOnSearchChange={handleOnFlightsSearchChange}
        />
      </div>
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-5">
        {flightOffers || (
          <div className="flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-mainGray/50 text-xl font-bold m-auto">
            No flights
          </div>
        )}
        {showFlights && (
          <FlightsPopup
            selectedFlightCountry={selectedFlightCountry}
            closePopup={handleClosePopup}
            currency={cultureData.currency}
          />
        )}
      </div>
    </>
  );
};

export default Flights;
