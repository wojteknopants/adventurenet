import Avatar from "./Avatar";
import Card from "./Card";
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { parseISO } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPostById,
  useDeletePostMutation,
} from "../features/posts/postsSlice";
import { postsPlaceholder } from "../assets";
import { AppDispatch } from "../store";
import {
  addComment,
  fetchComments,
  getComments,
} from "../features/posts/commentsSlice";

//{ { postId }: { postId: number }
const Post = ({ postId }: any) => {
  const post = useSelector((state) => selectPostById(state, postId));
  const [deletePost] = useDeletePostMutation();
  const dispatch: AppDispatch = useDispatch();

  const formatRelativeTime = (timestamp: string): string => {
    const parsedDate = parseISO(timestamp);
    return formatDistanceToNow(parsedDate, { addSuffix: true });
  };

  const onDeletePostClicked = async () => {
    try {
      await deletePost({ id: post.id }).unwrap();
    } catch (err) {
      console.error("Failed to delete the post", err);
    }
  };

  const onClickShowComments = async () => {
    // dispatch(addComment({ postId }));

    console.log();
  };

  return (
    <Card noPadding={false}>
      <div className="flex gap-3">
        <div>
          <Avatar size={""} />
        </div>
        <div className="grow">
          <p>
            <a className="font-semibold">{post.user}</a>
            {/* shared a{" "}
            <a className="text-blue-400">post</a> */}
          </p>
          <p className="text-gray-500 text-sm">
            {formatRelativeTime(post.created_at)}
          </p>
        </div>
        <div>
          <button className="text-red-400" onClick={onDeletePostClicked}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
      <div>
        <div className="rounded-xl overflow-hidden mt-2 max-h-[340px]">
          {post.images[0]?.image ? (
            <img src={`${post.images[0]?.image}`} alt="Error" />
          ) : (
            <img
              className=" m-auto w-[300px] h-full"
              style={{ filter: "invert(90%) grayscale(100%)" }}
              src={postsPlaceholder}
            />
          )}
        </div>
        <p className="my-3 leading-5 text-[14px] text-mainGray">
          {post.content}
        </p>
      </div>
      <div className="mt-5 flex gap-3 text-mainGray text-[14px]">
        <button className="flex gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#BDBDBD"
            className="w-[24px] h-[24px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
          <div>{post.likes_count}</div>
        </button>
        <button
          onClick={onClickShowComments}
          className="flex gap-2 items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#BDBDBD"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
            />
          </svg>
          2.3k
        </button>
        <button className="flex gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#BDBDBD"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
            />
          </svg>
          15
        </button>
        <div className="grow text-right">
          <button className="items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#BDBDBD"
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
      </div>
      {/* <div className="flex mt-4 gap-3">
        <div>
          <Avatar size={""} />
        </div>
        <div className="border grow rounded-full relative">
          <input
            className="block w-full p-3 px-4 overflow-hidden h-12 rounded-full"
            placeholder="Leave a comment"
          ></input>
          <button className="absolute top-3 right-3 text-gray-400">
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
          </button>
        </div>
      </div> */}
      <div>HERE WILL BE COMMENTS</div>
    </Card>
  );
};

export default Post;
