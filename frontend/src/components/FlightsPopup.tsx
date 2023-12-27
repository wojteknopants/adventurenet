import Blur from "./Blur";

interface AddPostPopupProps {
  selectedFlightCountry: any;
  closePopup: any;
  currency: string;
}

const AddPostPopup = ({
  selectedFlightCountry,
  closePopup,
  currency,
}: AddPostPopupProps) => {
  console.log(selectedFlightCountry);
  return (
    <>
      <div className="fixed z-10">
        <Blur zIndex={1} blurInPx={4} />

        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:w-1/2 md:w-2/3 w-11/12 max-h-fit rounded-xl px-6 py-3 drop-shadow-lg bg-white">
          <div className="flex justify-between p-4 text-xl text-mainBlue">
            <div>{selectedFlightCountry.country}</div>
            <button className="text-red-400" onClick={closePopup}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div>
            {selectedFlightCountry.offers.flights.map((flight: any) => (
              <div className="flex flex-col p-3 gap-2 text-mainGray">
                <div className="flex justify-between border-t-2 items-center border-mainLightGray">
                  <div className="flex flex-col">
                    <div>Carrier name : {flight.carrier_name}</div>
                    <div>Direct : {flight.is_direct ? "YES" : "NO"}</div>
                  </div>
                  <img className=" scale-50" src={flight.carrier_imageurl} />
                </div>
                <div className="flex justify-between">
                  <div>From : {flight.origin}</div>
                  <div>To : {flight.destination}</div>
                </div>
                <div className="border-b-2 border-mainLightGray flex justify-between">
                  <div className="text-mainBlue">
                    Date : {flight.date.day}.{flight.date.month}.
                    {flight.date.year}
                  </div>
                  <div className="text-mainBlue">
                    Price : {flight.price} {currency}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPostPopup;