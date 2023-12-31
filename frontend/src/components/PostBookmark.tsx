const PostBookmark = ({
  is_saved,
  handleSaveClick,
}: {
  is_saved: boolean;
  handleSaveClick: () => void;
}) => {
  return (
    <div className="grow text-right">
      <button onClick={handleSaveClick} className="items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={is_saved ? "#6893E5" : "none"}
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke={is_saved ? "#6893E5" : "#BDBDBD"}
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
          />
        </svg>
      </button>
    </div>
  );
};

export default PostBookmark;
