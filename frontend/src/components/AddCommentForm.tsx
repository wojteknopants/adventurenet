import React from "react";

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
    <form className="flex justify-between">
      <input
        className="flex flex-1 mr-3"
        placeholder="Type something..."
        onChange={handleOnChangeAdd}
        value={input}
      />
      <button
        type="submit"
        className="flex p-2 rounded-xl bg-mainBlue text-mainLightGray "
        onClick={handleOnAddClick}
      >
        Add
      </button>
    </form>
  );
};

export default AddCommentForm;
