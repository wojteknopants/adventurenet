import { useEffect, useRef, useState } from "react";
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
  selectGenerateStatus,
  selectGeneratedItinerary,
} from "../../features/explore/exploreSlice";
import { AppDispatch } from "../../store";
import Search from "../../components/Search";
import LoadingCard from "../../components/LoadingCard";
import { postsPlaceholder } from "../../assets";
import Itineraries from "../../components/Itineraries";
import EditItineraryPopup from "../../components/EditItineraryPopup";

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
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  let timeout: NodeJS.Timeout;

  const suggestionsForTours = useSelector(selectSuggestionsForTours);
  const suggestionsForItineraries = useSelector(
    selectSuggestionsForItineraries
  );
  const itineraries = useSelector(selectItineraries);
  const generatedItinerary = useSelector(selectGeneratedItinerary);
  const activities = useSelector(selectActivities);
  const generateStatus = useSelector(selectGenerateStatus);

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
    setIsOpenPopup(true);
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

  const activitiesForSlider = activities.slice(0, 20).map((activity: any) => (
    <div
      key={activity.id}
      className="flex flex-col gap-2 snap-start mr-4 min-w-[300px] max-h-[350px] h-fit rounded-xl bg-white overflow-hidden"
      ref={cardRef}
    >
      <img
        className="h-1/3 aspect-video w-full"
        src={activity.pictures[0] || postsPlaceholder}
        alt={"Image activity"}
        loading="lazy"
      />
      <div className="p-4 flex flex-col gap-2 text-mainGray ">
        <div className="truncate text-lg">{activity.name}</div>
        <div className="truncate text-sm">
          Minimum duration: {activity.minimumDuration}
        </div>
        <div className="truncate text-sm flex justify-between">
          <div className="flex gap-1">
            <div className="">Price:</div>
            <div className="text-mainBlue">
              {activity.price.amount} {activity.price.currencyCode}
            </div>
          </div>
          {activity.rating && (
            <div className="truncate text-sm flex gap-1">
              Rating: <div className="text-mainBlue">{activity.rating}</div>
            </div>
          )}
        </div>
        <button className="shadow-md py-1 shadow-blue-400/50 text-white bg-blue-400 hover:bg-blue-400/90 rounded-md">
          <a href={activity.bookingLink}>More details</a>
        </button>
      </div>
    </div>
  ));

  const handlePopup = () => {
    setIsOpenPopup(false);
  };

  useEffect(() => {
    dispatch(getItineraries());
  }, []);
  console.log(generatedItinerary);
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
      {generateStatus == "fulfilled" ? (
        generatedItinerary !== null &&
        isOpenPopup && (
          <EditItineraryPopup
            handlePopup={handlePopup}
            itinerary={generatedItinerary}
          />
        )
      ) : (
        <LoadingCard>
          Generating itinerary, it can takes more then 30 second...
        </LoadingCard>
      )}
      <Itineraries itineraries={itineraries} />
    </>
  );
};

export default Explore;
