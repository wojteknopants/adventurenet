import { useEffect, useState } from "react";
import AddPostForm from "../../../components/AddPostForm";
import AvatarProfile from "./AvatarProfile";
import Card from "../../../components/Card";
import Cover from "./Cover";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../../features/profile/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import ProfilePosts from "./ProfilePosts";
import { useParams } from "react-router-dom";

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
  const [newCover, setNewCover] = useState(null);
  const [newAvatar, setNewAvatar] = useState(null);
  const dispatch = useDispatch();
  // const { isLoading: profilesIsLoading } = useGetProfilesQuery();
  // const profilesIsd = useSelector(selectProfileIds);

  const { uid } = useParams<{ uid: string }>();

  const { data, isLoading, isSuccess, isError, error, refetch } =
    useGetProfileQuery(uid);

  console.log("UID : " + uid);
  console.log(data);

  const [updateProfile] = useUpdateProfileMutation();

  // const canSave = [newCover].every(Boolean) && !isUpdateLoading;

  const handleChangeCover = (file: any) => {
    setNewCover(file);
  };

  const handleChangeAvatar = (file: any) => {
    setNewAvatar(file);
  };

  const onProfileChange = async () => {
    // if (canSave) {
    try {
      const formData = new FormData();
      if (newCover) {
        formData.append("background_image", newCover);
      }
      if (newAvatar) {
        formData.append("profile_picture", newAvatar);
      }

      await updateProfile(formData).unwrap();
      setNewAvatar(null);
      setNewCover(null);
      console.log("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to update the profile", err);
    }
    // }
  };

  useEffect(() => {
    if (newCover) {
      onProfileChange();
    }
    if (newAvatar) {
      onProfileChange();
    }
  }, [newCover, newAvatar]);

  useEffect(() => {
    if (isLoading) {
      console.log("Loading...");
    } else if (isSuccess) {
      const updatedProfile = { ...data };

      setProfile(updatedProfile);
      // setCover(updatedProfile.background_image);
      // setUserPhoto(updatedProfile.profile_picture);
    } else if (isError) {
      console.error(error);
    }

    console.log(profile);
  }, [isLoading, data]);

  return (
    <div>
      <div className="flex justify-between my-8">
        <h2 className="text-[24px] font-bold">My profile</h2>
      </div>
      <Card noPadding={true}>
        <div className="relative">
          <Cover
            handleChangeCover={handleChangeCover}
            cover={profile?.background_image}
          />
          <div className="absolute top-24 left-4">
            <AvatarProfile
              photo={profile?.profile_picture}
              handleChangePhoto={handleChangeAvatar}
              size={"lg"}
            />
          </div>
          <div className="p-4 pb-0">
            <div className="ml-40">
              <h1 className="text-3xl font-bold">
                {/* {profile?.name == null ? "Mark " : profile?.name}
                {profile?.surname == null ? "Jones" : profile?.surname} */}
                {profile?.user}
              </h1>
              <div className="text=gray-500 leading-4">Poznan, Poland</div>
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
      <ProfilePosts uid={uid} />
    </div>
  );
};

export default Profile;
