import { ReactNode } from "react";

const Card = ({
  children,
  noPadding = true,
}: {
  children: ReactNode;
  noPadding?: ReactNode;
}) => {
  let classes = "bg-white flex flex-col shadow-md rounded-xl overflow-hidden dark:bg-darkMainBackground";
  if (!noPadding) {
    classes += " py-3 px-6";
  }
  return <div className={classes}>{children}</div>;
};

export default Card;
