import { ReactNode } from "react";
import { profilePlaceholder } from "../assets";

const Avatar = ({ size, user_pfp }: any) => {
  let width = "w-12";
  if (size !== "") {
    width = size;
  }
  return (
    <div
      className={`${width} aspect-square rounded-full bg-mainLightGray overflow-hidden`}
    >
      <img
        src={user_pfp || profilePlaceholder}
        // style={{ filter: "invert(88%) grayscale(100%)" }}
      ></img>
    </div>
  );
};

export default Avatar;
