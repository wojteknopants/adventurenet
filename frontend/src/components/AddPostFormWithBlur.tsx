import React from "react";
import Blur from "./Blur";

const AddPostFormWithBlur = () => {
  return (
    <>
      <Blur />
      <div className="absolute flex bg-slate-500 w-20 h-20">
        <input placeholder="Type something..."></input>
      </div>
    </>
  );
};

export default AddPostFormWithBlur;
