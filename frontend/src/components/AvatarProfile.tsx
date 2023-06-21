import { ReactNode } from "react";
import { iconPhoto } from "../assets";

const AvatarProfile = ({ size }: { size: ReactNode }) => {
  let width = "w-12";
  if (size === "lg") {
    width = "w-36";
  }

return (
  <div className={`${width} relative`}>
    <div className="rounded-full overflow-hidden">   
      <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80"></img>
    </div> 
    <button className="absolute bottom-0 right-0 shadow-md shadow-gray-500 p-2 bg-white rounded-full">
      <img
        src={iconPhoto}
        alt="icon"
      />
    </button>
  </div>
  );
};

export default AvatarProfile;