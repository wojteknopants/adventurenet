import { useState } from "react";
import Popup from "./Popup";
import MDEditor from "@uiw/react-md-editor";
import Avatar from "./Avatar";
import { useGetProfileQuery } from "../features/profile/profileSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import {
  getItineraries,
  saveItinerary,
} from "../features/explore/exploreSlice";

interface EditItineraryPopupProps {
  handlePopup: () => void;
  itinerary: any;
}

const EditItineraryPopup = ({
  handlePopup,
  itinerary,
}: EditItineraryPopupProps) => {
  document.documentElement.setAttribute("data-color-mode", "light");

  const [content, setContent] = useState<string>(itinerary);

  const dispatch = useDispatch<AppDispatch>();

  const { data: profile } = useGetProfileQuery("me");

  const handleOnSaveClick = async () => {
    handlePopup();
    await dispatch(saveItinerary({ itinerary: content })).then(() =>
      dispatch(getItineraries())
    );
  };
  return (
    <Popup>
      <div className="flex flex-col gap-2 max-h-[90vh]  overflow-y-scroll">
        <div className="flex flex-row justify-between">
          <div className="items-center flex gap-3">
            <div>
              <Avatar size={""} user_pfp={profile?.profile_picture} />
            </div>
            <div className="grow">
              <p>
                <a className="font-semibold">You</a>
              </p>
            </div>
          </div>

          <button className="text-red-400" onClick={handlePopup}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <MDEditor
          value={content}
          onChange={(value, viewUpdate) => setContent(value || "")}
        />
        <MDEditor.Markdown
          source={content}
          style={{
            whiteSpace: "pre-wrap",
            background: "white",
            color: "#BDBDBD",
          }}
        />
        <button
          className="bg-gray-100 dark:bg-darkMainSection hover:bg-gray-200 dark:hover:bg-darkMainHover text-mainBlue font-bold my-4 py-2 px-4 rounded-md"
          onClick={handleOnSaveClick}
        >
          Save itinerary
        </button>
      </div>
    </Popup>
  );
};

export default EditItineraryPopup;
