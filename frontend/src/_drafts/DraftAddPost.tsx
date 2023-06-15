import { useState } from "react";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { useAddNewPostMutation } from "../features/posts/postsSlice";

const AddPostForm = () => {
  const [addNewPost, { isLoading }] = useAddNewPostMutation();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onTitleChanged = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);
  const onContentChanged = (event: React.ChangeEvent<HTMLInputElement>) =>
    setContent(event.target.value);

  const canSave = [title, content].every(Boolean) && !isLoading;

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        await addNewPost({ title, content }).unwrap();

        setTitle("");
        setContent("");
      } catch (err) {
        console.error("Failed to save the post", err);
      }
    }
  };

  return (
    <section>
      <h2>Add a New Post</h2>
      <form onSubmit={onSavePostClicked} className="flex flex-col">
        <input placeholder="Type title..." onChange={onTitleChanged}></input>
        <input
          placeholder="Type content..."
          onChange={onContentChanged}
        ></input>
        <button className=" bg-slate-400 rounded-md p-1 max-w-xl m-2">
          Add
        </button>
      </form>
    </section>
  );
};
export default AddPostForm;
