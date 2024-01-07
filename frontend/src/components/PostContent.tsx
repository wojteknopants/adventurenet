interface PostContentProps {
  image: any;
  postsPlaceholder: any;
  content: string;
}

const PostContent = ({
  image,
  postsPlaceholder,
  content,
}: PostContentProps) => {
  return (
    <div>
      <div className="rounded-xl overflow-hidden mt-2 max-h-[340px]">
        {image ? (
          <img src={`${image}`} alt="Error" />
        ) : (
          <img
            className=" m-auto w-[300px] h-full "
            style={{ filter: "invert(90%) grayscale(100%)" }}
            src={postsPlaceholder}
          />
        )}
      </div>
      <p className="my-3 leading-5 text-[14px] text-mainGray">{content}</p>
    </div>
  );
};

export default PostContent;
