import React, { useRef } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

interface SliderProps {
  content: any;
}

const Slider = ({ content }: SliderProps) => {
  const sliderRef = useRef(null);

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
    <div className="relative items-center mt-8">
      <MdChevronLeft
        onClick={slideLeft}
        size={50}
        className="text-mainDarkGray absolute left-[-25px] top-[40%] md:inline hidden"
      />
      <div
        ref={sliderRef}
        className="flex overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide
          snap-x"
      >
        {content}
      </div>
      <MdChevronRight
        onClick={slideRight}
        size={50}
        className="text-mainDarkGray absolute right-[-25px] top-[40%] md:inline hidden"
      />
    </div>
  );
};

export default Slider;
