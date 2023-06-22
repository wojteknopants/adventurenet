import Avatar from "./Avatar";
import Card from "./Card";
import { useAddNewPostMutation } from "../features/posts/postsSlice";
import { useState } from "react";
import AddPostFormWithBlur from "./AddPostFormWithBlur";
import { iconAddPost } from "../assets";
import Blur from "./Blur";

const AddPostForm = () => {
  const [addNewPost, { isLoading }] = useAddNewPostMutation();

  const [content, setContent] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(null);

  const onContentChanged = (event: any) => setContent(event.target.value);

  const handleImageUpload = (event: any) => {
    console.log(event.target.files[0]);
    setImage(event.target.files[0]);
  };

  const canSave = [content, image].every(Boolean) && !isLoading;

  const handleToggleFormWithBlur = () => {
    setIsOpen((prev) => !prev);
    setImage(null);
  };

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        const formData = new FormData();

        formData.append("title", "TITLE_IS_NOT_EXIST");
        formData.append("content", content);
        formData.append("new_images", image);

        console.log(formData);

        await addNewPost(formData).unwrap();

        setIsOpen(false);
        setContent("");
      } catch (err) {
        console.error("Failed to save the post", err);
      }
    }
  };
  return (
    <>
      <Card noPadding={false}>
        <div className="flex gap-2">
          <div className="m-auto mx-0">
            <Avatar size={""} />
          </div>
          <input
            className="grow m-auto h-14 ml-3 focus:outline-none"
            placeholder={"Whats on your mind, Mark?"}
            onChange={onContentChanged}
          />
          <div className=" my-auto mr-0">
            <img
              src={iconAddPost}
              //onClick={onSavePostClicked}
              onClick={handleToggleFormWithBlur}
              className="cursor-pointer"
            />
          </div>
        </div>

        {/* <div className="flex gap-5 items-center mt-2"> */}
        {/* <div>
            <button className="flex gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              Photos
            </button>
          </div>
          <div>
            <button className="flex gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
              LFG
            </button>
          </div>
          <div>
            <button className="flex gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              Check in
            </button>
          </div>
          <div>
            <button className="flex gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                />
              </svg>
              Mood
            </button>
          </div> */}
        {/* </div> */}
        {isOpen ? (
          <AddPostFormWithBlur
            image={image}
            handleToggleFormWithBlur={handleToggleFormWithBlur}
            handleAddImage={handleImageUpload}
            handleAddText={onContentChanged}
            handleOnSaveClick={onSavePostClicked}
          />
        ) : (
          ""
        )}
      </Card>
    </>
  );
};
export default AddPostForm;
