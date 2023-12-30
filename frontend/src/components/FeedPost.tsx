import React from "react";
import Post from "./Post";
import ProfilePosts from "./ProfilePosts";
import PostProfile from "../_drafts/PostProfile";
import { useSelector } from "react-redux";
import { selectPostById } from "../features/posts/postsSlice";

const FeedPost = (props: any) => {
  const post = useSelector((state: any) => selectPostById(state, props.postId));
  return <Post postData={post} postId={props.postId} refetch={props.refetch} />;
};

export default FeedPost;
