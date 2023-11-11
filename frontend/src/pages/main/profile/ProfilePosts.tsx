import React from "react";
import PostProfile from "./PostProfile";
import {
  useGetProfilePostsByIdQuery,
  selectProfilePostIds,
} from "../../../features/posts/postsSlice";
import { useSelector } from "react-redux";

const ProfilePosts = () => {
  const { isLoading, isSuccess, isError, error } =
    useGetProfilePostsByIdQuery();
  const orderedPostIds = useSelector(selectProfilePostIds);

  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    content = orderedPostIds.map((postId: any) => (
      <PostProfile key={postId} postId={postId} />
    ));
  } else if (isError) {
    content = <p>Something went wrong, reload the page!</p>;
  }

  return <>{content}</>;
};

export default ProfilePosts;
