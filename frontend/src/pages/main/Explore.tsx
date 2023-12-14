import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { BsImage } from "react-icons/bs";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Slider from "../../components/Slider";
import PageTitle from "../../components/PageTitle";
import { useDispatch } from "react-redux";
import { getCities } from "../../features/explore/exploreSlice";
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
      <Search />
      <Slider content={content} />
    </div>
  );
};

export default Explore;
