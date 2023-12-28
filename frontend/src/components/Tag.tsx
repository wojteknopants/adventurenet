import React from "react";
import Delete from "./Delete";

interface TagProps {
  tag: any;
  handleDelete?: (arg: any) => any;
  hideDelete?: any;
}

const Tag = ({ hideDelete, tag, handleDelete }: TagProps) => {
  const handleClick = () => {
    if (handleDelete) {
      handleDelete(tag);
    }
  };
  return (
    <div
      className={`rounded-lg ${
        !hideDelete ? "border" : "cursor-pointer"
      }  border-mainBlue px-1 flex items-center`}
    >
      #{tag}
      {!hideDelete && (
        <div onClick={handleClick} className=" scale-75">
          <Delete />
        </div>
      )}
    </div>
  );
};

export default Tag;
