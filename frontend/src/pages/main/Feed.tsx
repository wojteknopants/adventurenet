import { useEffect } from "react";
import Post from "../../components/Post";
import AddPostForm from "../../components/AddPostForm";
import {
  useGetPostsQuery,
  selectPostIds,
} from "../../features/posts/postsSlice";
import { useSelector } from "react-redux";

const Feed = () => {
  const { isLoading, isSuccess, isError, error } = useGetPostsQuery();

  const orderedPostIds = useSelector(selectPostIds);

  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    content = orderedPostIds.map((postId: any) => (
      <Post key={postId} postId={postId} />
    ));
  } else if (isError) {
    content = <p>{error}</p>;
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
