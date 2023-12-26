import React from "react";
import Tag from "./Tag";

interface TagsProps {
  tags: any;
  handleDelete?: (arg: any) => any;
}

const Tags = ({ tags, handleDelete }: TagsProps) => {
  return (
    <div className=" flex gap-1 flex-wrap text-mainBlue">
      {tags.map((tag: any) => (
        <Tag key={tag.mapbox_id} handleDelete={handleDelete} tag={tag} />
      ))}
    </div>
  );
};

export default Tags;
