import React, { useRef, useState } from "react";
import Blur from "./Blur";
import Avatar from "./Avatar";
import { fetchTags, selectTagSuggestions } from "../features/posts/tagsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import Search from "./Search";
import Tags from "./Tags";

interface AddPostPopupProps {
  handlePopup: () => void;
  handleAddImage: (event: any) => void;
  handleAddText: (event: any) => void;
  handleOnSaveClick: () => void;
  image: File | "";
  text: string;
  tagsSuggestions: any;
  selectedTags: any;
  handleSelectTag: (arg: any) => any;
  handleDeleteTag: (arg: any) => any;
}

const AddPostPopup = ({
  handlePopup,
  handleAddImage,
  handleAddText,
  handleOnSaveClick,
  handleDeleteTag,
  handleSelectTag,
  image,
  text,
  tagsSuggestions,
  selectedTags,
}: AddPostPopupProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const hiddenFileInput = useRef<HTMLInputElement>(null);

  let timeout: NodeJS.Timeout;

  const handleClick = () => {
    if (hiddenFileInput.current) hiddenFileInput.current.click();
  };

  const handleOnTagSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      dispatch(fetchTags({ query: event.target.value }));
    }, 300);
  };

  const searched = tagsSuggestions.map((tag: any, index: any) => (
    <button
      onClick={() => handleSelectTag(tag)}
      className="flex flex-col grow w-full text-mainGray hover:bg-mainLightGray hover:text-mainBlue transition-all rounded-lg px-2 py-1 text-lg "
      key={index}
    >
      <div>{tag.name}</div>
      <div className="text-sm text-mainGray/50">{tag.place_formatted}</div>
    </button>
  ));

  return (
    <>
      <div className="fixed z-10">
        <Blur zIndex={1} blurInPx={4} />

        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:w-1/2 md:w-2/3 w-11/12 max-h-fit rounded-xl px-6 py-3 drop-shadow-lg bg-white">
          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
              <div className="items-center flex gap-3">
                <div>
                  <Avatar size={""} />
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
            <Search
              placeholder={"Type some tags..."}
              handleOnSearchChange={handleOnTagSearchChange}
              searched={searched}
              offShadows
            />
            <div className="my-[20px] flex justify-center">
              {image ? (
                <div>
                  <img
                    className=" rounded-xl max-h-[400px] max-w-[600px]"
                    alt="not found"
                    src={URL.createObjectURL(image)}
                  />
                </div>
              ) : (
                <div
                  onClick={handleClick}
                  className="flex justify-center w-full h-[50vh] rounded-xl bg-mainLightGray cursor-pointer"
                >
                  <input
                    ref={hiddenFileInput}
                    type="file"
                    name="myImage"
                    onChange={handleAddImage}
                    style={{ display: "none" }}
                  />

                  <div className="m-auto">Add photo</div>
                </div>
              )}
            </div>
            {/* <input
              value={tagSearch}
              onChange={handleOnTagSearchChange}
              className=" bg-white"
              placeholder="Tags..."
            /> */}
            <Tags handleDelete={handleDeleteTag} tags={selectedTags} />
            <input
              value={text}
              onChange={handleAddText}
              className=" bg-white"
              placeholder="Type something..."
            />
            <button
              className="bg-gray-100 hover:bg-gray-200 text-mainBlue font-bold mx-60 my-4 py-2 px-4 rounded-md"
              onClick={handleOnSaveClick}
            >
              Add post
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPostPopup;
