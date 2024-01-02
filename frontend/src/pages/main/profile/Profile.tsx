import { useEffect, useState } from "react";
import AddPostForm from "../../../components/AddPostForm";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../../features/profile/profileSlice";
import ProfilePosts from "../../../components/ProfilePosts";
import { useParams } from "react-router-dom";
import PageTitle from "../../../components/PageTitle";
import ProfileHeader from "./ProfileHeader";

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

  const { uid } = useParams<{ uid: string }>();

  const { data, isLoading, isSuccess, isError, error, refetch } =
    useGetProfileQuery(uid);
  const { data: myProfile } = useGetProfileQuery("me");
  if (uid !== undefined) {
    localStorage.setItem("uid", uid);
  }

  const [updateProfile] = useUpdateProfileMutation();

  const handleChangeCover = (file: any) => {
    setNewCover(file);
  };

  const handleChangeAvatar = (file: any) => {
    setNewAvatar(file);
  };

  const onProfileChange = async () => {
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
    } else if (isError) {
      console.error(error);
    }

    console.log(profile);
  }, [isLoading, data]);
  return (
    <>
      <PageTitle title="Profile" />
      <ProfileHeader
        profile={profile}
        handleChangeAvatar={handleChangeAvatar}
        handleChangeCover={handleChangeCover}
      />
      {myProfile?.user === data?.user && <AddPostForm />}
      <ProfilePosts uid={uid} />
    </>
  );
};

export default Profile;
