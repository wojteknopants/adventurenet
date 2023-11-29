import Post from "../../components/Post";
import AddPostForm from "../../components/AddPostForm";
import {
  useGetPostsQuery,
  selectPostIds,
} from "../../features/posts/postsSlice";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { selectComments } from "../../features/posts/commentsSlice";
import PageTitle from "../../components/PageTitle";

const Feed = () => {
  const { isLoading, isSuccess, isError, error, refetch } =
    useGetPostsQuery(undefined);

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
      <PageTitle title="Feed" />

      <AddPostForm />
      {content}
    </div>
  );
};

export default Feed;
