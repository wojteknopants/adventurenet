import { useEffect, useState } from "react";
import Post from "../../components/Post";
import AddPostForm from "../../components/AddPostForm";
import {
  useGetPostsQuery,
  selectPostIds,
} from "../../features/posts/postsSlice";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { selectComments } from "../../features/posts/commentsSlice";

const Feed = () => {
  const { isLoading, isSuccess, isError, error, refetch } = useGetPostsQuery();

  const orderedPostIds = useSelector(selectPostIds);

  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    if (Array.isArray(orderedPostIds)) {
      content = orderedPostIds.map((postId) => (
        <Post key={postId} postId={postId} refetch={refetch} />
      ));
      console.log(content);
    } else {
      content = <p>"Loading..."</p>;
    }
  } else if (isError) {
    content = <p>{"Refresh the page! It should help :)"}</p>;
  }

  return (
    <div>
      <div className="flex justify-between my-6">
        <h2 className="text-[24px]">Feed</h2>
        {/* <button>TurnOn</button> */}
      </div>

      {/* <div>{testText()}</div> */}
      <AddPostForm />
      {content}
    </div>
  );
};

export default Feed;
