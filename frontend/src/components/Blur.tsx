import React, { useState } from "react";

interface Props {
  zIndex: number;
  blurInPx: number;
}

const Blur = ({ zIndex, blurInPx }: Props) => {
  const backdropBlurStyle = {
    backdropFilter: `blur(${blurInPx}px)`,
  };
  return (
    <div
      className={`z-${zIndex} fixed left-0 top-0 bottom-0 right-0 w-full h-full`}
      style={backdropBlurStyle}
    ></div>
  );
};

export default Blur;
