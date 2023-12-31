import Post from "./Post";

const NotOptimizedPost = (props: any) => {
  return (
    <Post
      postData={props.postData}
      postId={props.postId}
      refetch={props.refetch}
    />
  );
};

export default NotOptimizedPost;
