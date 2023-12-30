import React from "react";
import Post from "./Post";
import ProfilePosts from "./ProfilePosts";
import PostProfile from "../_drafts/PostProfile";
import { useSelector } from "react-redux";
import { selectPostById } from "../features/posts/postsSlice";

const NotOptimizedPost = (props: any) => {
  return (
    <Post
      postData={props.postData}
      postId={props.postId}
      refetch={props.refetch}
    />
  );
};

export default NotOptimizedPost;
