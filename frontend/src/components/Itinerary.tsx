import React from "react";
import Card from "./Card";
import MDEditor from "@uiw/react-md-editor";
import { useGetProfileQuery } from "../features/profile/profileSlice";
import PostHeader from "./PostHeader";

interface ItineraryProps {
  itinerary: any;
}

const Itinerary = ({ itinerary }: ItineraryProps) => {
  const { data: profile } = useGetProfileQuery(itinerary.user);
  const content = itinerary.content.substring(4);
  return (
    <Card noPadding={false}>
      <div className="flex flex-col gap-2">
        <PostHeader
          user={itinerary.user}
          user_pfp={profile.profile_picture}
          created_at={itinerary.updated_at}
          onDeletePostClicked={() => {
            1;
          }}
        />
        <MDEditor.Markdown
          source={content}
          style={{
            whiteSpace: "pre-wrap",
            background: "white",
            color: "#BDBDBD",
          }}
        />
      </div>
    </Card>
  );
};

export default Itinerary;
