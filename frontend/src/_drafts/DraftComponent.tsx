import React from "react";
import { useSelector } from "react-redux";
import { useGetPostsQuery, selectPostIds } from "../features/posts/postsSlice";
import DraftPost from "./DraftPost";
import DraftAddPostForm from "./DraftAddPost";
import DraftUpdateForm from "./DraftUpdateForm";

const DraftComponent = () => {
  const { isLoading, isSuccess, isError, error } = useGetPostsQuery();

  const orderedPostIds = useSelector(selectPostIds);

  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    content = orderedPostIds.map((postId: any) => (
      <DraftPost key={postId} postId={postId} />
    ));
  } else if (isError) {
    content = <p>{error}</p>;
  }
  console.log(content);

  return (
    <div>
      <DraftAddPostForm />
      <div className="flex">{content}</div>
      <DraftUpdateForm />
    </div>
  );
};

export default DraftComponent;
