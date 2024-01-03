import { ReactNode, useRef } from "react";
import { iconPhoto } from "../../../assets";
import { profilePlaceholder } from "../../../assets";
import { useGetProfileQuery } from "../../../features/profile/profileSlice";

interface Props {
  user?: any;
  size: ReactNode;
  photo: any;
  handleChangePhoto: (file: File) => void;
}

const AvatarProfile = ({ user, size, photo, handleChangePhoto }: Props) => {
  let width = "w-12";
  if (size === "lg") {
    width = "w-36";
  }

  const { data: profile } = useGetProfileQuery("me");

  const hiddenFileInput = useRef<HTMLInputElement | null>(null);
  const handleClick = () => {
    hiddenFileInput.current?.click();
  };

  const handleFileSelect = (event: any) => {
    event.target.files[0] && handleChangePhoto(event.target.files[0]);
  };
  return (
    <div className={`${width} relative`}>
      <div className=" aspect-square rounded-full overflow-hidden">
        <img src={photo ? photo : profilePlaceholder} alt="" />
      </div>
      {profile?.user === user && (
        <button
          onClick={handleClick}
          className="absolute bottom-0 right-0 shadow-md shadow-gray-500 p-2 bg-mainLightGray rounded-full"
        >
          <input
            src={iconPhoto}
            type="file"
            name="myImage"
            ref={hiddenFileInput}
            onChange={handleFileSelect}
            style={{ display: "none" }}
          />

          <img src={iconPhoto} />
        </button>
      )}
    </div>
  );
};

export default AvatarProfile;
