import React from "react";
import Tag from "./Tag";

interface TagsProps {
  tags: any;
  handleDelete?: (arg: any) => any;
  hideDelete?: any;
}

const Tags = ({ hideDelete = 0, tags, handleDelete }: TagsProps) => {
  return (
    <div className=" flex gap-1 flex-wrap text-mainBlue">
      {tags.map((tag: any, index: any) => (
        <Tag
          key={index}
          hideDelete={hideDelete}
          handleDelete={handleDelete}
          tag={tag}
        />
      ))}
    </div>
  );
};

export default Tags;
