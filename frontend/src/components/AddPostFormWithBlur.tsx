import React from "react";
import Blur from "./Blur";
import Avatar from "./Avatar";

interface Props {
  handleToggleFormWithBlur: () => void;
  handleAddImage: (event: any) => void;
  handleAddText: (event: any) => void;
  handleOnSaveClick: () => void;
  image: any;
}

const AddPostFormWithBlur = ({
  handleToggleFormWithBlur,
  handleAddImage,
  handleAddText,
  handleOnSaveClick,
  image,
}: Props) => {
  return (
    <>
      <div className="fixed z-10">
        <Blur zIndex={1} blurInPx={4} />

        <div className="fixed bottom-[150px] w-[650px] h-[400px] rounded-xl px-6 py-3 drop-shadow-lg bg-white">
          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
              
            <div className="items-center flex gap-3">
              <div>
                <Avatar size={""} />
              </div>
              <div className="grow">
                <p>
                  <a className="font-semibold">Mark Jones</a>
                </p>
              </div>
            </div>

              <button className="text-red-400" onClick={handleToggleFormWithBlur!}>
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
            <div className="p-[100px] flex justify-center">
              {image && (
                <div>
                  <img
                    alt="not found"
                    width={"250px"}
                    src={URL.createObjectURL(image)}
                  />
                </div>
              )}
              <input type="file" name="myImage" onChange={handleAddImage} />
            </div>
            <input
              onChange={handleAddText}
              className=" bg-white"
              placeholder="Type something..."
            />
            <button className="bg-gray-200 hover:bg-gray-300 text-mainBlue font-bold mx-60 my-4 py-2 px-4 rounded-md" onClick={handleOnSaveClick}>Add post</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPostFormWithBlur;
