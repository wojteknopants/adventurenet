const Button = ({
  handleOnClick,
  children,
}: {
  handleOnClick: () => void;
  children: any;
}) => {
  return (
    <button
      className="flex w-full justify-center min-h-10 items-center transition-all px-2 text-xl rounded-xl drop-shadow-md focus:drop-shadow hover:bg-mainBlue/80  bg-mainBlue text-white"
      onClick={handleOnClick}
    >
      {children}
    </button>
  );
};

export default Button;
