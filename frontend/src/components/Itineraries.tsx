import React from "react";
import Itinerary from "./Itinerary";

const Itineraries = ({ itineraries }: any) => {
  const listOfItineraries = itineraries?.map((itinerary: any) => (
    <Itinerary itinerary={itinerary} />
  ));
  return <div>{listOfItineraries}</div>;
};

export default Itineraries;
