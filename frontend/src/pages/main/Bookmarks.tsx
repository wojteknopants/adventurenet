import BookmarksItems from "../../components/BookmarksItems";
import PageTitle from "../../components/PageTitle";
import { useGetBookmarksQuery } from "../../features/bookmarks/bookmarksSlice";

const Bookmarks = () => {
  return (
    <>
      <PageTitle title="Bookmarks" />
      <BookmarksItems />
    </>
  );
};

export default Bookmarks;
