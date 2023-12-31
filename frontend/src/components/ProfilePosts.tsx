import { useGetProfilePostsByIdQuery } from "../features/posts/postsSlice";
import LoadingCard from "./LoadingCard";
import NotOptimizedPost from "./NotOptimizedPost";

const ProfilePosts = ({ uid }: any) => {
  const { data, isLoading, isSuccess, isError, error, refetch } =
    useGetProfilePostsByIdQuery(uid);
  let content;
  if (isLoading) {
    content = <LoadingCard>Loading posts...</LoadingCard>;
  } else if (isSuccess) {
    content = data.ids.map((id: any) => {
      return (
        <NotOptimizedPost
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
