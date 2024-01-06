import React from "react";
import { iconPhoto } from "../../../assets";
import { useGetProfileQuery } from "../../../features/profile/profileSlice";

interface Props {
  user?: any;
  cover: any;
  handleChangeCover: (file: File) => void;
}

const Cover = ({ cover, user, handleChangeCover }: Props) => {
  const hiddenFileInput = React.useRef<HTMLInputElement | null>(null);
  const handleClick = () => {
    hiddenFileInput.current && hiddenFileInput.current.click();
  };
  const handleFileSelect = (event: any) => {
    event.target.files[0] && handleChangeCover(event.target.files[0]);
  };

  const { data: profile } = useGetProfileQuery("me");

  return (
    <div>
      <div className="h-36 overflow-hidden flex justify-center items-center">
        <img src={cover} alt="Not found" />
        <div className="absolute right-0 bottom-40 m-2">
          {profile?.user === user && (
            <button
              onClick={handleClick}
              className="flex items-center gap-1 bg-mainLightGray py-1 px-2 rounded-md shadow-md shadow-gray-500"
            >
              <input
                id="image_uploads"
                src={iconPhoto}
                ref={hiddenFileInput}
                type="file"
                name="myImage"
                style={{ display: "none" }}
                onChange={handleFileSelect}
              />
              <img src={iconPhoto} />
              Change cover image
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cover;
