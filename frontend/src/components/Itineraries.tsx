import Itinerary from "./Itinerary";

const Itineraries = ({ itineraries }: any) => {
  const listOfItineraries = itineraries?.map((itinerary: any) => (
    <Itinerary key={itinerary.id} itinerary={itinerary} />
  ));
  return (
    <div className="flex flex-col lg:gap-5 gap-3">{listOfItineraries}</div>
  );
};

export default Itineraries;
