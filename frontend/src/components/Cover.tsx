import { iconPhoto } from "../assets";

const Cover = () => {
  return (
    <div>
      <div className="h-36 overflow-hidden flex justify-center items-center">
        <img
          src="https://images.unsplash.com/photo-1474127773417-aec7504236d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80"
          alt=""
        />
        <div className="absolute right-0 bottom-36 m-2">
          <button className="flex items-center gap-1 bg-white py-1 px-2 rounded-md shadow-md shadow-gray-500">
            <img
            src={iconPhoto}
            alt="icon"
            />
            Change cover image
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cover;