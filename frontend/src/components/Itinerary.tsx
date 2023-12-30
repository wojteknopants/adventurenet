import React from "react";
import Card from "./Card";
import MDEditor from "@uiw/react-md-editor";
import { useGetProfileQuery } from "../features/profile/profileSlice";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import {
  useAddBookmarkMutation,
  useDeleteBookmarkMutation,
} from "../features/bookmarks/bookmarksSlice";

interface ItineraryProps {
  itinerary: any;
}

const Itinerary = ({ itinerary }: ItineraryProps) => {
  console.log(itinerary);
  const { data: profile } = useGetProfileQuery(itinerary.user);
  const content = itinerary.content.substring(4);

  const [addBookmark] = useAddBookmarkMutation();
  const [deleteBookmark] = useDeleteBookmarkMutation();

  const handleSaveClick = async () => {
    if (!itinerary.is_saved) {
      try {
        await addBookmark({
          object_id: itinerary.id,
          content_type: "itinerary",
        }).unwrap();
      } catch (err) {
        console.error("Failed to save the item", err);
      }
    } else {
      try {
        await deleteBookmark({ id: itinerary.id }).unwrap();
      } catch (err) {
        console.error("Failed to delete the item", err);
      }
    }
  };

  return (
    <Card noPadding={false}>
      <div className="flex flex-col gap-2">
        <PostHeader
          user={itinerary.user}
          user_pfp={profile?.profile_picture}
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
        <PostFooter
          is_saved={itinerary.is_saved}
          handleSaveClick={handleSaveClick}
        />
      </div>
    </Card>
  );
};

export default Itinerary;
