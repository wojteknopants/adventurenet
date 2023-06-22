import { iconPhoto } from "../../../assets";

interface Props {
  cover: any;
  handleChangeCover: (file: File) => void;
}

const Cover = ({ cover, handleChangeCover }: Props) => {
  const handleFileSelect = (event: any) => {
    event.target.files[0] && handleChangeCover(event.target.files[0]);
  };
  return (
    <div>
      <div className="h-36 overflow-hidden flex justify-center items-center">
        <img src={cover} alt="Not found" />
        <div className="absolute right-0 bottom-36 m-2">
          <button className="flex items-center gap-1 bg-mainLightGray py-1 px-2 rounded-md shadow-md shadow-gray-500">
            <input
              src={iconPhoto}
              type="file"
              name="myImage"
              onChange={handleFileSelect}
            />
            Change cover image
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cover;