import { ReactNode } from "react";
import { iconPhoto } from "../../../assets";

interface Props {
  size: ReactNode;
  photo: any;
  handleChangePhoto: (file: File) => void;
}

const AvatarProfile = ({ size, photo, handleChangePhoto }: Props) => {
  let width = "w-12";
  if (size === "lg") {
    width = "w-36";
  }
  const handleFileSelect = (event: any) => {
    event.target.files[0] && handleChangePhoto(event.target.files[0]);
  };
  return (
    <div className={`${width} relative`}>
      <div className="rounded-full overflow-hidden">
        <img src={photo} alt="" />
      </div>
      <button className="absolute bottom-0 right-0 shadow-md shadow-gray-500 p-2 bg-mainLightGray rounded-full">
        <input
          src={iconPhoto}
          type="file"
          name="myImage"
          onChange={handleFileSelect}
        />
      </button>
    </div>
  );
};

export default AvatarProfile;
