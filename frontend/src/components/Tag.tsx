import React from "react";
import Delete from "./Delete";

interface TagProps {
  tag: any;
  handleDelete?: (arg: any) => any;
}

const Tag = ({ tag, handleDelete }: TagProps) => {
  const handleClick = () => {
    if (handleDelete) {
      handleDelete(tag);
    }
  };
  return (
    <div className="rounded-lg border border-mainBlue px-1 flex items-center">
      #{tag.name}
      <div onClick={handleClick} className=" scale-75">
        <Delete />
      </div>
    </div>
  );
};

export default Tag;
