import Post from "../../components/Post";
import AddPostForm from "../../components/AddPostForm";
import {
  useGetPostsQuery,
  selectPostIds,
} from "../../features/posts/postsSlice";
import { useSelector } from "react-redux";
import PageTitle from "../../components/PageTitle";
import Card from "../../components/Card";
import LoadingCard from "../../components/LoadingCard";
import FeedPost from "../../components/FeedPost";

const Feed = () => {
  const { isLoading, isSuccess, isError, error, refetch } =
    useGetPostsQuery(undefined);

  const orderedPostIds = useSelector(selectPostIds);

  let content;
  if (isLoading) {
    content = <LoadingCard>Loading posts...</LoadingCard>;
  } else if (isSuccess) {
    if (Array.isArray(orderedPostIds)) {
      content = orderedPostIds.map((postId) => (
        <FeedPost key={postId} postId={postId} refetch={refetch} />
      ));
    }
  } else if (isError) {
    content = <p>{"Refresh the page! It should help :)"}</p>;
  }

  return (
    <>
      <PageTitle title="Feed" />
      <AddPostForm />
      {content}
    </>
  );
};

export default Feed;
