import React, { useRef } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

interface SliderProps {
  content: any;
}

const Slider = ({ content }: SliderProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const slideLeft = () => {
    const slider = sliderRef.current;
    if (slider) {
      slider.scrollLeft = slider.scrollLeft - 600;
    }
  };

  const slideRight = () => {
    const slider = sliderRef.current;
    if (slider) {
      slider.scrollLeft = slider.scrollLeft + 600;
    }
  };
  return (
    <div className="relative items-center">
      <MdChevronLeft
        onClick={slideLeft}
        size={40}
        className="text-mainDarkGray absolute left-[-30px] top-[40%] md:inline hidden hover:text-mainBlue cursor-pointer hover:bg-mainLightGray/90 hover:rounded-xl transition rounded-xl"
      />
      <div
        ref={sliderRef}
        className="flex overflow-x-scroll  whitespace-nowrap scroll-smooth scrollbar-hide
          snap-x"
      >
        {content}
      </div>
      <MdChevronRight
        onClick={slideRight}
        size={40}
        className="text-mainDarkGray absolute right-[-30px] top-[40%] md:inline hidden hover:text-mainBlue cursor-pointer hover:bg-mainLightGray/90 hover:rounded-xl transition rounded-xl"
      />
    </div>
  );
};

export default Slider;
