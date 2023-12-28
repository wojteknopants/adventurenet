import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { BsImage } from "react-icons/bs";
import Slider from "../../components/Slider";
import PageTitle from "../../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  getActivities,
  getSuggestionsForTours,
  selectSuggestionsForTours,
  selectSuggestionsForItineraries,
  selectCityForTours,
  selectCityForItineraries,
  generateItineraries,
  getSuggestionsForItineraries,
  selectItineraries,
  getItineraries,
  selectActivities,
} from "../../features/explore/exploreSlice";
import { AppDispatch } from "../../store";
import Search from "../../components/Search";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import MDEditor from "@uiw/react-md-editor";
import Card from "../../components/Card";
import PostHeader from "../../components/PostHeader";
import { useGetProfileQuery } from "../../features/profile/profileSlice";
import Itinerary from "../../components/Itinerary";

const activityPlaceHolder = [
  { name: "Activity One", stars: 4, price: "$$" },
  { name: "Activity Two", stars: 3, price: "$$$" },
  { name: "Activity Three", stars: 2, price: "$$$" },
  { name: "Activity Four", stars: 5, price: "$" },
  { name: "Activity Five", stars: 3, price: "$$" },
  { name: "Activity One", stars: 4, price: "$$" },
  { name: "Activity Two", stars: 3, price: "$$$" },
  { name: "Activity Three", stars: 2, price: "$$$" },
  { name: "Activity Four", stars: 5, price: "$" },
  { name: "Activity Five", stars: 3, price: "$$" },
  { name: "Activity One", stars: 4, price: "$$" },
  { name: "Activity Two", stars: 3, price: "$$$" },
  { name: "Activity Three", stars: 2, price: "$$$" },
  { name: "Activity Four", stars: 5, price: "$" },
  { name: "Activity Five", stars: 3, price: "$$" },
  { name: "Activity One", stars: 4, price: "$$" },
  { name: "Activity Two", stars: 3, price: "$$$" },
  { name: "Activity Three", stars: 2, price: "$$$" },
  { name: "Activity Four", stars: 5, price: "$" },
  { name: "Activity Five", stars: 3, price: "$$" },
];

const Explore = () => {
  const cardRef = useRef(null);

  const dispatch = useDispatch<AppDispatch>();
  const [selectedCity, setSelectedCity] = useState();
  let timeout: NodeJS.Timeout;

  const suggestionsForTours = useSelector(selectSuggestionsForTours);
  const suggestionsForItineraries = useSelector(
    selectSuggestionsForItineraries
  );
  const itineraries = useSelector(selectItineraries);
  const activities = useSelector(selectActivities);

  const handleOnToursCityClick = (city: any) => {
    console.log(city);
    setSelectedCity(city);
    dispatch(selectCityForTours(city));

    dispatch(
      getActivities({
        latitude: city.geoCode.latitude,
        longitude: city.geoCode.longitude,
      })
    );
  };

  const handleOnItinerariesCityClick = (city: any) => {
    console.log(city);
    setSelectedCity(city);
    dispatch(selectCityForItineraries(city));

    dispatch(
      generateItineraries({
        latitude: city.geoCode.latitude,
        longitude: city.geoCode.longitude,
      })
    );
  };

  const handleOnCityForTourSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = e.target.value;

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      dispatch(getSuggestionsForTours({ city: inputValue }));
    }, 300);
  };

  const handleOnCityForItinerariesSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = e.target.value;

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      dispatch(getSuggestionsForItineraries({ city: inputValue }));
    }, 300);
  };

  const suggestionForTours = suggestionsForTours.map(
    (city: any, index: any) => {
      return (
        <li key={index}>
          <button
            onClick={() => handleOnToursCityClick(city)}
            className="flex grow w-full text-mainGray hover:bg-mainLightGray hover:text-mainBlue transition-all rounded-lg px-2 py-1 text-lg"
          >
            {city.name}
          </button>
        </li>
      );
    }
  );

  const suggestionForItineraries = suggestionsForItineraries.map(
    (city: any, index: any) => {
      return (
        <li key={index}>
          <button
            onClick={() => handleOnItinerariesCityClick(city)}
            className="flex grow w-full text-mainGray hover:bg-mainLightGray hover:text-mainBlue transition-all rounded-lg px-2 py-1 text-lg"
          >
            {city.name}
          </button>
        </li>
      );
    }
  );
  const listOfItineraries = itineraries?.map((itinerary: any) => (
    <Itinerary itinerary={itinerary} />
  ));

  const activitiesForSlider = activities.slice(0, 20).map((activity: any) => (
    <div
      key={activity.id}
      className="flex  flex-col gap-2 snap-start mr-4 min-w-[300px] max-h-[350px] h-fit rounded-xl bg-white overflow-hidden"
      ref={cardRef}
    >
      <img
        className="h-1/3 aspect-video w-full"
        src={activity.pictures[0] || ""}
      />
      <div className="p-4 flex flex-col gap-2 text-mainGray ">
        <div className="truncate text-lg">{activity.name}</div>
        <div className="truncate text-sm">
          Price: {activity.price.amount} {activity.price.currencyCode}
        </div>

        <button className="shadow-md mx-auto w-1/2 shadow-blue-400/50 text-white bg-blue-400 hover:bg-blue-400/90 rounded-md">
          <a href={activity.bookingLink}>More details</a>
        </button>
      </div>
    </div>
  ));

  useEffect(() => {
    dispatch(getItineraries());
  }, []);

  return (
    <>
      <PageTitle title="Explore" />
      <Search
        placeholder={"Type city you want to visit..."}
        searched={suggestionForTours}
        handleOnSearchChange={handleOnCityForTourSearchChange}
      />
      <Slider content={activitiesForSlider} />
      <Search
        placeholder={"Type city you want to generate itineraries..."}
        searched={suggestionForItineraries}
        handleOnSearchChange={handleOnCityForItinerariesSearchChange}
      />
      {listOfItineraries}
    </>
  );
};

export default Explore;
