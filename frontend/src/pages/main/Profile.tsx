import Avatar from "../../components/Avatar";
import Card from "../../components/Card";
import Post from "../../components/Post";
import {
  useGetPostsQuery,
  selectPostIds,
} from "../../features/posts/postsSlice";
import { useSelector } from "react-redux";

const Profile = () => {
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
        <h2 className="text-[24px]">My profile</h2>
      </div>
      <Card noPadding={true}>
        <div className="relative">
          <div className="h-36 overflow-hidden flex justify-center items-center">
            <img
              src="https://images.unsplash.com/photo-1474127773417-aec7504236d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80"
              alt=""
            />
          </div>
          <div className="absolute top-24 left-4">
            <Avatar size={"lg"} />
          </div>
          <div className="p-4 pb-0">
            <div className="ml-40">
              <h1 className="text-3xl font-bold">Mark Jones</h1>
              <div className="text=gray-500 leading-4">Berlin, Germany</div>
            </div>
            <div className="mt-10 flex gap-1">
              <div>
                <button className="flex gap-1 px-4 py-1 items-center border-blue-400 border-b-4 text-blue-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                  Posts
                </button>
              </div>
              <div>
                <button className="flex gap-1 px-4 py-1 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                    />
                  </svg>
                  About me
                </button>
              </div>
            </div>
          </div>
        </div>
      </Card>
      {content}
    </div>
  );
};

export default Profile;
