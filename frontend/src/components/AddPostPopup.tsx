import React, { useRef, useState } from "react";
import Blur from "./Blur";
import Avatar from "./Avatar";
import { fetchTags, selectTagSuggestions } from "../features/posts/tagsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import Search from "./Search";
import Tags from "./Tags";
import Popup from "./Popup";

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
  user_pfp: any;
  handleOnTagSearchChange: (arg: any) => any;
}

const AddPostPopup = ({
  handlePopup,
  handleAddImage,
  handleAddText,
  handleOnSaveClick,
  handleDeleteTag,
  handleSelectTag,
  handleOnTagSearchChange,
  image,
  text,
  tagsSuggestions,
  selectedTags,
  user_pfp,
}: AddPostPopupProps) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (hiddenFileInput.current) hiddenFileInput.current.click();
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

  const tags = selectedTags.map((tag: any) => tag.name);

  return (
    <>
      <Popup>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-between">
            <div className="items-center flex gap-3">
              <div>
                <Avatar size={""} user_pfp={user_pfp} />
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
          <div className=" flex justify-center">
            {image ? (
              <div>
                <img
                  className=" rounded-xl max-h-[400px] max-w-[600px]"
                  alt="not found"
                  src={
                    typeof image === "string"
                      ? image
                      : URL.createObjectURL(image)
                  }
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
          <Tags handleDelete={handleDeleteTag} tags={tags} />
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
            {typeof image === "string" ? "Update post" : "Add post"}
          </button>
        </div>
      </Popup>
    </>
  );
};

export default AddPostPopup;
