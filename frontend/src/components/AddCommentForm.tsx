import React from "react";
import { BsFillSendFill } from "react-icons/bs";

interface AddCommentFormProps {
  input: string;
  handleOnChangeAdd: (arg: any) => void;
  handleOnAddClick: (arg: any) => void;
}

const AddCommentForm = ({
  input,
  handleOnChangeAdd,
  handleOnAddClick,
}: AddCommentFormProps) => {
  return (
    <form className="flex justify-between py-2">
      <input
        className="flex flex-1 mr-3"
        placeholder="Type something..."
        onChange={handleOnChangeAdd}
        value={input}
      />
      <button
        type="submit"
        className="flex h-6 w-6 text-mainGray justify-center active:outline-none"
        onClick={handleOnAddClick}
      >
        <BsFillSendFill className="h-[20px] w-[20px]" />
      </button>
    </form>
  );
};

export default AddCommentForm;
