import React from "react";
import PostProfile from "../_drafts/PostProfile";
import {
  selectProfilePostIds,
  useGetProfilePostsByIdQuery,
} from "../features/posts/postsSlice";
import { useSelector } from "react-redux";
import LoadingCard from "./LoadingCard";
import ProfilePost from "./ProfilePost";

const ProfilePosts = ({ uid }: any) => {
  const { data, isLoading, isSuccess, isError, error, refetch } =
    useGetProfilePostsByIdQuery(uid);
  let content;
  if (isLoading) {
    content = <LoadingCard>Loading posts...</LoadingCard>;
  } else if (isSuccess) {
    content = data.ids.map((id: any) => {
      return (
        <ProfilePost
          key={id}
          postId={id}
          postData={data.entities[id]}
          refetch={refetch}
        />
      );
    });
  } else if (isError) {
    content = <p>Something went wrong, reload the page!</p>;
  }

  return <>{content}</>;
};

export default ProfilePosts;
