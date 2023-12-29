import React from "react";
import PostProfile from "./PostProfile";
import {
  selectProfilePostIds,
  useGetProfilePostsByIdQuery,
} from "../../../features/posts/postsSlice";
import { useSelector } from "react-redux";
import LoadingCard from "../../../components/LoadingCard";

const ProfilePosts = ({ uid }: any) => {
  const { data, isLoading, isSuccess, isError, error, refetch } =
    useGetProfilePostsByIdQuery(uid);

  const orderedPostIds = useSelector(selectProfilePostIds);

  let content;
  if (isLoading) {
    content = <LoadingCard>Loading posts...</LoadingCard>;
  } else if (isSuccess) {
    content = data.ids.map((id: any) => (
      <PostProfile
        key={id}
        postId={id}
        postData={data.entities[id]}
        refetch={refetch}
      />
    ));
  } else if (isError) {
    content = <p>Something went wrong, reload the page!</p>;
  }

  return <>{content}</>;
};

export default ProfilePosts;
