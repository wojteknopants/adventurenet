import React from "react";
import PostProfile from "./PostProfile";
import {
  useGetProfilePostsByIdQuery
} from "../../../features/posts/postsSlice";

const ProfilePosts = ({ uid }: any) => {
  // const { isLoading, isSuccess, isError, error, refetch } =
  //   useGetProfilePostsByIdQuery();

  const { data, isLoading, isSuccess, isError, error, refetch } =
    useGetProfilePostsByIdQuery(uid);

  //const profilePosts = selectProfilePostsById(uid)(`getProfilePostsById("2")`);
  //const profilePosts = useSelector(profilePostsSelector.selectAll);
  // The last works, but adapter doesnt work, the first works and adapter also, dont give a fuck why. Thats why I will make it in this stange
  //selectProfilePostIds(uid);
  // selectProfilePostsResult(uid);
  // const orderedPostIds = useSelector(selectProfilePostIds);
  // console.log(data);

  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    // console.log(data.ids);
    // console.log(data.entities[2]);
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
