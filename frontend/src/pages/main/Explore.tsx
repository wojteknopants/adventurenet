import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { BsImage } from "react-icons/bs";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

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
];

const Explore = () => {
  const cardRef = useRef(null);
  const sliderRef = useRef(null);

  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    // Calculate the width of a single card
    if (cardRef.current) {
      setCardWidth(cardRef.current.clientWidth);
    }
  }, []);

  const slideLeft = () => {
    const slider = sliderRef.current;
    if (slider) {
      slider.scrollLeft = slider.scrollLeft - cardWidth - 16;
    }
  };

  const slideRight = () => {
    const slider = sliderRef.current;
    if (slider) {
      slider.scrollLeft = slider.scrollLeft + cardWidth + 16;
    }
  };
  // const [repsonse, setResponse] = useState();
  // const [accessToken, setAccessToken] = useState();
  // const [url, setUrl] = useState(
  //   "https://test.api.amadeus.com/v1/security/oauth2/token"
  // );
  // const [clientId, setClientId] = useState("AENEg4ztxX9aAB62f2j8FYwTel1InJJq");
  // const [clientSecret, setClientSecret] = useState("QCm5hSDMD0r77H9z");
  // const [data, setData] = useState({
  //   grant_type: "client_credentials",
  //   client_id: clientId,
  //   client_secret: clientSecret,
  // });

  // const [recivedData, setRecivedData] = useState();

  // const handleOnClik = async () => {
  //   try {
  //     const response = await axios.post(url, data, {
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded",
  //       },
  //     });

  //     setResponse(response.data);
  //     setAccessToken(response.data.access_token);
  //     console.log(response.data);
  //   } catch (error: any) {
  //     setResponse(error.message);
  //     console.error("Error:", error.message);
  //   }
  // };

  // const getDataFromAmadeus = async () => {
  //   const checkinUrl =
  //     "https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=PAR&radius=5&radiusUnit=KM&hotelSource=ALL";

  //   try {
  //     const response = await axios.get(checkinUrl, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });
  //     setRecivedData(() => {
  //       const data = response.data.data.map((obj: any) => (
  //         <div
  //           className="flex flex-col p-4 shadow-lg rounded-lg mt-4"
  //           key={obj.dupeId}
  //         >
  //           <div>Country: {obj.address?.countryCode}</div>
  //           <div>City: {obj.iataCode}</div>
  //           <div>Hotel name: {obj.name}</div>
  //         </div>
  //       ));
  //       console.log(response.data.data[1]);
  //       return data;
  //     });
  //   } catch (error: any) {
  //     console.error("Error:", error.message);
  //   }
  // };

  return (
    <div className="flex justify-between my-6 flex-col">
      <h2 className="text-[24px]">Explore</h2>
      <div className="flex items-center mt-8">
        <MdChevronLeft
          onClick={slideLeft}
          size={100}
          className="text-mainDarkGray"
        />
        <div
          ref={sliderRef}
          className="flex overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {hotels.map((hotel, index) => (
            <div
              key={index}
              className="mr-4 min-w-[200px] rounded-xl bg-white"
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
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          size={100}
          className="text-mainDarkGray"
        />
      </div>
    </div>
  );
};

export default Explore;
