import Avatar from "./Avatar";
import Card from "./Card";
import { useAddNewPostMutation } from "../features/posts/postsSlice";
import { useEffect, useState } from "react";
import AddPostPopup from "./AddPostPopup";
import { iconAddPost } from "../assets";
import { useDispatch, useSelector } from "react-redux";
import { useGetProfileQuery } from "../features/profile/profileSlice";
import {
  fetchTags,
  selectTag,
  selectTagSuggestions,
} from "../features/posts/tagsSlice";
import { AppDispatch } from "../store";

const AddPostForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  let timeout: NodeJS.Timeout;

  const [addNewPost, { isLoading }] = useAddNewPostMutation();
  const { data, isSuccess, isError } = useGetProfileQuery("me");
  const [content, setContent] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState<File | "">("");
  const [picture, setPicture] = useState(null);
  const [selectedTags, setSelectedTags] = useState<any[]>([]);

  const tagsSuggestions = useSelector(selectTagSuggestions);

  const onContentChanged = (event: any) => setContent(event.target.value);

  const handleImageUpload = (event: any) => {
    console.log(event.target.files[0]);
    setImage(event.target.files[0]);
  };

  const canSave = [content, image].every(Boolean) && !isLoading;

  const handleDeleteTag = (tagToDelete: any) => {
    const updatedSelectedTags = selectedTags.filter(
      (tag) => tag.name !== tagToDelete
    );

    setSelectedTags(updatedSelectedTags);

    console.log(updatedSelectedTags);
  };

  const handleSelectTag = (tag: any) => {
    if (!selectedTags.some((selectedTag) => selectedTag === tag)) {
      const newSelectedTags = [...selectedTags, tag];
      setSelectedTags(newSelectedTags);
      dispatch(selectTag({ tag }));
    }

    console.log(selectedTags);
  };

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
        if (selectedTags !== null) {
          selectedTags.forEach((tag) => formData.append("new_tags", tag.name));
        }

        console.log(formData);

        await addNewPost(formData).unwrap();

        setIsOpen(false);
        setContent("");
      } catch (err) {
        console.error("Failed to save the post", err);
      }
    }
  };

  const handleOnTagSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      dispatch(fetchTags({ query: event.target.value }));
    }, 300);
  };

  useEffect(() => {
    if (isSuccess) {
      setPicture(data.profile_picture);
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
            className="grow m-auto min-w-[160px] h-14 ml-3 focus:outline-none"
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
          <AddPostPopup
            user_pfp={data?.profile_picture}
            image={image || null}
            text={content}
            tagsSuggestions={tagsSuggestions}
            selectedTags={selectedTags}
            handleOnTagSearchChange={handleOnTagSearchChange}
            handlePopup={handlePopup}
            handleAddImage={handleImageUpload}
            handleAddText={onContentChanged}
            handleOnSaveClick={onSavePostClicked}
            handleDeleteTag={handleDeleteTag}
            handleSelectTag={handleSelectTag}
          />
        ) : (
          ""
        )}
      </Card>
    </>
  );
};
export default AddPostForm;
