import React from "react";
import { useGetProfileQuery } from "../features/profile/profileSlice";

const DraftProfile = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetProfileQuery();
  console.log(data);

  let profile;
  if (isLoading) {
    profile = 0;
  } else if (isSuccess) {
    profile = data;
  } else if (isError) {
    profile = <p>{error}</p>;
  }

  return (
    <div>
      <div>{profile.user}</div>
      <div>{profile.name}</div>
      <div>{profile.surname}</div>
      <div>{profile.country}</div>
      <div>{profile.bio}</div>
    </div>
  );
};

export default DraftProfile;
