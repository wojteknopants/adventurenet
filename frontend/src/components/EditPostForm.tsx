import { useSelector } from "react-redux";
import { selectTagSuggestions } from "../features/posts/tagsSlice";
import { useUpdatePostMutation } from "../features/posts/postsSlice";
import { useGetProfileQuery } from "../features/profile/profileSlice";
import AddPostPopup from "./AddPostPopup";
import { useState } from "react";

interface EditPostFormProps {
  editData: { postId: any; image: any; content: any; tags: any };
  handleOnClick: () => any;
}

const EditPostForm = ({ editData, handleOnClick }: EditPostFormProps) => {
  const [updatePost, { isLoading }] = useUpdatePostMutation();
  const { data, isSuccess, isError } = useGetProfileQuery("me");
  const [content, setContent] = useState(editData.content);
  const [image, setImage] = useState(editData.image);
  const [selectedTags, setSelectedTags] = useState<any[]>(
    editData.tags.map((tag: any) => ({ name: tag }))
  );
  console.log(selectedTags);
  const tagsSuggestions = useSelector(selectTagSuggestions);

  const onContentChanged = (event: any) => setContent(event.target.value);

  const handleImageUpload = (event: any) => {
    console.log(event.target.files[0]);
    setImage(event.target.files[0]);
  };

  const canSave = [content, image].every(Boolean) && !isLoading;

  const handleDeleteTag = (tagToDelete: string) => {
    const updatedSelectedTags = selectedTags.filter(
      (tag: any) => tag.name !== tagToDelete
    );

    setSelectedTags(updatedSelectedTags);

    console.log(tagToDelete);
  };

  const handleSelectTag = (tag: any) => {
    if (
      !selectedTags.some((selectedTag: any) => selectedTag.name === tag.name)
    ) {
      const newSelectedTags = [...selectedTags, tag];
      setSelectedTags(newSelectedTags);
    }

    console.log(selectedTags);
  };

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        const formData = new FormData();

        // formData.append("title", "TITLE_IS_NOT_EXIST");
        formData.append("content", content);
        // if (image !== null) formData.append("new_images", image);
        if (selectedTags !== null) {
          selectedTags.forEach((tag: any) =>
            formData.append("new_tags", tag.name)
          );
        }

        const updatedPost = { id: editData.postId, formData: formData };

        console.log(updatedPost);

        await updatePost(updatedPost).unwrap();

        handleOnClick();
      } catch (err) {
        console.error("Failed to save the post", err);
      }
    }
  };

  return (
    <>
      <AddPostPopup
        user_pfp={data.profile_picture}
        image={image}
        text={content}
        tagsSuggestions={tagsSuggestions}
        selectedTags={selectedTags}
        handlePopup={handleOnClick}
        handleAddImage={handleImageUpload}
        handleAddText={onContentChanged}
        handleOnSaveClick={onSavePostClicked}
        handleDeleteTag={handleDeleteTag}
        handleSelectTag={handleSelectTag}
      />
    </>
  );
};

export default EditPostForm;
