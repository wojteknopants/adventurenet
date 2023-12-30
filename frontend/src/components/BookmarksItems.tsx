import React from "react";
import {
  selectBookmarksIds,
  useGetBookmarksQuery,
} from "../features/bookmarks/bookmarksSlice";
import FeedPost from "./FeedPost";
import { useSelector } from "react-redux";
import LoadingCard from "./LoadingCard";
import NotOptimizedPost from "./NotOptimizedPost";
import Itinerary from "./Itinerary";

const BookmarksItems = () => {
  const {
    data: bookmarks,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetBookmarksQuery(undefined);

  let content;
  if (isLoading) {
    content = <LoadingCard>Loading posts...</LoadingCard>;
  } else if (isSuccess) {
    console.log(bookmarks);
    content = bookmarks.ids.map((id: any) => {
      console.log(bookmarks.entities[id].content_object);
      if (
        bookmarks.entities[id].content_type === "post" &&
        bookmarks.entities[id].content_object !== null
      ) {
        return (
          <NotOptimizedPost
            key={bookmarks.entities[id].content_object.id}
            postId={bookmarks.entities[id].content_object.id}
            postData={bookmarks.entities[id].content_object}
            refetch={refetch}
          />
        );
      } else if (bookmarks.entities[id].content_type === "itinerary") {
        return <Itinerary itinerary={bookmarks.entities[id].content_object} />;
      }
    });
  } else if (isError) {
    content = <p>Something went wrong, reload the page!</p>;
  }

  return content;
};

export default BookmarksItems;
