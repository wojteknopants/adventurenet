import { useState } from "react";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { useUpdatePostMutation } from "../features/posts/postsSlice";

const UpdateForm = () => {
  const [updatePost, { isLoading }] = useUpdatePostMutation();

  const [postId, setPostId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onIdChanged = (e) => setPostId(e.target.value);
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);

  const canSave = [title, content].every(Boolean) && !isLoading;

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        await updatePost({ id: postId, title, content }).unwrap();

        setPostId("");
        setTitle("");
        setContent("");
      } catch (err) {
        console.error("Failed to save the post", err);
      }
    }
  };

  return (
    <section>
      <h2>Edit post</h2>
      <form onSubmit={onSavePostClicked} className="flex flex-col">
        <input placeholder="Type id of post..." onChange={onIdChanged}></input>
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
export default UpdateForm;
