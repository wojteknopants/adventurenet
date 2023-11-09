import { ReactNode } from "react";
import { profilePlaceholder } from "../assets";

const Avatar = ({ size }: { size: ReactNode }) => {
  let width = "w-12";
  if (size === "lg") {
    width = "w-36";
  }

  return (
    <div className={`${width} rounded-full bg-mainLightGray overflow-hidden`}>
      <img
        src={profilePlaceholder}
        // style={{ filter: "invert(88%) grayscale(100%)" }}
      ></img>
    </div>
  );
};

export default Avatar;
