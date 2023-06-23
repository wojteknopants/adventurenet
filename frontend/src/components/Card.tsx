import { ReactNode } from "react";

const Card = ({
  children,
  noPadding,
}: {
  children: ReactNode;
  noPadding: ReactNode;
}) => {
  let classes =
    "bg-white shadow-md shadow-gray-300 rounded-xl mb-5 overflow-hidden";
  if (!noPadding) {
    classes += " py-3 px-6";
  }
  return <div className={classes}>{children}</div>;
};

export default Card;
