interface PostLikeCounterProps {
  likes_count: number;
  is_liked: boolean;
  handleLikeClick: (arg: any) => void;
}

const PostLikeCounter = ({
  is_liked,
  likes_count,
  handleLikeClick,
}: PostLikeCounterProps) => {
  return (
    <button
      onClick={handleLikeClick}
      className="flex gap-2 items-center text-mainGray"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={is_liked ? "red" : "none"}
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke={is_liked ? "red" : "#BDBDBD"}
        className="w-[24px] h-[24px]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
      <div>{likes_count}</div>
    </button>
  );
};

export default PostLikeCounter;
