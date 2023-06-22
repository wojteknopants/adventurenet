import { useEffect, useState } from "react";
import AddPostForm from "../../components/AddPostForm";
import AvatarProfile from "../../components/AvatarProfile";
import Card from "../../components/Card";
import Cover from "../../components/Cover";
import Post from "../../components/Post";
import {
  useGetPostsQuery,
  selectPostIds,
} from "../../features/posts/postsSlice";
import {
  useGetProfilesQuery,
  selectProfileIds,
  useGetProfileQuery,
} from "../../features/profile/profileSlice";
import { useSelector } from "react-redux";
import ProfilePosts from "./ProfilePosts";

interface Profile {
  user: number;
  name: string;
  surname: string;
  country: string;
  bio: string;
  username: string;
  profile_picture: string;
  background_image: string;
  created_at: string;
  updated_at: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [cover, setCover] = useState<string | undefined>();

  // const { isLoading: profilesIsLoading } = useGetProfilesQuery();
  // const profilesIsd = useSelector(selectProfileIds);

  const { data, isLoading, isSuccess, isError, error } = useGetProfileQuery();

  const handleChangeCover = (event: any) => {
    console.log(event.target.files[0]);
    setCover(event.target.files[0]);
  };

  useEffect(() => {
    if (isLoading) {
      // Handle loading state if needed
    } else if (isSuccess) {
      const updatedProfile = { ...data };
      if (updatedProfile.background_image == null) {
        updatedProfile.background_image = "No cover";
      }
      setProfile(updatedProfile);
      setCover(updatedProfile.background_image);
    } else if (isError) {
      console.error(error);
    }
  }, [isLoading, data]);

  console.log(profile);

  return (
    <div>
      <div className="flex justify-between my-6">
        <h2 className="text-[24px]">My profile</h2>
      </div>
      <Card noPadding={true}>
        <div className="relative">
          <Cover handleChangeCover={handleChangeCover} cover={cover} />
          <div className="absolute top-24 left-4">
            <AvatarProfile size={"lg"} />
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
      <AddPostForm />
      <ProfilePosts />
    </div>
  );
};

export default Profile;
