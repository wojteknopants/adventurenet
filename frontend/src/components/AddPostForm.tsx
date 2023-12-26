import Avatar from "./Avatar";
import Card from "./Card";
import { useAddNewPostMutation } from "../features/posts/postsSlice";
import { useEffect, useState } from "react";
import AddPostPopupProps from "./AddPostPopup";
import { iconAddPost } from "../assets";
import { useSelector } from "react-redux";
import Profile from "../pages/main/profile/Profile";
import { useGetProfileQuery } from "../features/profile/profileSlice";

const AddPostForm = () => {
  const [addNewPost, { isLoading }] = useAddNewPostMutation();
  const { data, isSuccess, isError } = useGetProfileQuery("me");
  const [content, setContent] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState<File | "">("");
  const [picture, setPicture] = useState(null);

  const onContentChanged = (event: any) => setContent(event.target.value);

  const handleImageUpload = (event: any) => {
    console.log(event.target.files[0]);
    setImage(event.target.files[0]);
  };

  const canSave = [content, image].every(Boolean) && !isLoading;

  const handlePopup = () => {
    setIsOpen((prev) => !prev);
    setImage("");
  };

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        const formData = new FormData();

        formData.append("title", "TITLE_IS_NOT_EXIST");
        formData.append("content", content);
        if (image !== null) formData.append("new_images", image);

        console.log(formData);

        await addNewPost(formData).unwrap();

        setIsOpen(false);
        setContent("");
      } catch (err) {
        console.error("Failed to save the post", err);
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setPicture(data.profile_picture);
      // setCover(updatedProfile.background_image);
      // setUserPhoto(updatedProfile.profile_picture);
    } else if (isError) {
      console.error("ERROR");
    }

    console.log(picture);
  }, [isLoading, data]);
  return (
    <>
      <Card noPadding={false}>
        <div className="flex gap-2">
          <div className="m-auto mx-0">
            <Avatar size={""} user_pfp={picture} />
          </div>
          <input
            className="grow m-auto h-14 ml-3 focus:outline-none"
            placeholder={"Whats on your mind?"}
            onChange={onContentChanged}
          />
          <div className=" my-auto mr-0">
            <img
              src={iconAddPost}
              //onClick={onSavePostClicked}
              onClick={handlePopup}
              className="cursor-pointer"
            />
          </div>
        </div>
        {isOpen ? (
          <AddPostPopupProps
            image={image}
            text={content}
            handlePopup={handlePopup}
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
