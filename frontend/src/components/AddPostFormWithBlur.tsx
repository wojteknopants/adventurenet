import React from "react";
import Blur from "./Blur";

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

        <div className="fixed bottom-[150px] w-[650px] h-[400px] rounded-xl px-6 py-3 drop-shadow-lg bg-slate-500">
          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
              <div>photo</div>
              <button
                className="flex text-red-500"
                onClick={handleToggleFormWithBlur!}
              >
                Close
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
              className=" bg-slate-500"
              placeholder="Type something..."
            />
            <button onClick={handleOnSaveClick}>Add post</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPostFormWithBlur;
