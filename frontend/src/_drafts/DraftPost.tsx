import React from "react";
import { useSelector } from "react-redux";

import {
  selectPostById,
  useDeletePostMutation,
} from "../features/posts/postsSlice";
const DraftPost = ({ postId }: any) => {
  const post = useSelector((state) => selectPostById(state, postId));
  const [deletePost] = useDeletePostMutation();

  const onDeletePostClicked = async () => {
    try {
      await deletePost({ id: post.id }).unwrap();
    } catch (err) {
      console.error("Failed to delete the post", err);
    }
  };

  return (
    <article className=" max-w-[300px]">
      <h2 className=" bg-red-400 rounded-lg shadow-md">{post.id}</h2>
      <h2>Post id:</h2>
      <h2 className=" bg-slate-400 rounded-lg shadow-md">{post.id}</h2>
      <h2>Post user:</h2>
      <h2 className=" bg-slate-400 rounded-lg shadow-md">{post.user}</h2>
      <h2>Post title:</h2>
      <h2 className=" bg-slate-400 rounded-lg shadow-md">{post.title}</h2>
      <h2>Post content:</h2>
      <h2 className=" bg-slate-400 rounded-lg shadow-md">{post.content}</h2>
      <h2>Date of creation:</h2>
      <h2 className=" bg-slate-400 rounded-lg shadow-md">{post.created_at}</h2>
      <h2>Date of modifying:</h2>
      <h2 className=" bg-slate-400 rounded-lg shadow-md">{post.updated_at}</h2>
      <button
        className=" bg-red-400 rounded-lg shadow-md"
        onClick={onDeletePostClicked}
      >
        Delete
      </button>
    </article>
  );
};

export default DraftPost;
