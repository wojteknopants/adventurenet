import { useState } from "react";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { useAddNewPostMutation } from "../features/posts/postsSlice";
import DraftAddImage from "./DraftAddImage";
import { error } from "console";

const AddPostForm = () => {
  const [addNewPost, { isLoading }] = useAddNewPostMutation();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const onTitleChanged = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);
  const onContentChanged = (event: React.ChangeEvent<HTMLInputElement>) =>
    setContent(event.target.value);

  const canSave = [title, content, image].every(Boolean) && !isLoading;

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        console.log("aaaaaaaaaaaaaaa");

        const formData = new FormData();

        formData.append("title", title);
        formData.append("content", content);
        formData.append("new_images", image);

        await addNewPost(formData).unwrap();

        setTitle("");
        setContent("");
        setImage(null);
      } catch (err) {
        console.error("Failed to save the post", err);
      }
    } else {
      console.error("title or content or image not filled");
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
        <h2>Image:</h2>
        <div>
          {image && (
            <div>
              <img
                alt="not found"
                width={"250px"}
                src={URL.createObjectURL(image)}
              />
              <br />
              <button onClick={() => setImage(null)}>Remove</button>
            </div>
          )}

          <input
            type="file"
            name="myImage"
            onChange={(event) => {
              console.log(event.target.files[0]);
              setImage(event.target.files[0]);
            }}
          />
        </div>
        <button className=" bg-slate-400 rounded-md p-1 max-w-xl m-2">
          Add
        </button>
      </form>
    </section>
  );
};
export default AddPostForm;
