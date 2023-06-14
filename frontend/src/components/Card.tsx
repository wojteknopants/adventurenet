import { ReactNode } from "react";

const Card = ({ children, noPadding }: { children: ReactNode, noPadding: ReactNode }) => {
  
  let classes = 'bg-white shadow-md shadow-gray-300 rounded-md mb-5 overflow-hidden'
  if (!noPadding) {
    classes += ' p-4';
  }
  return (
    <div className={classes}>
      {children}    
    </div>
  );
};

export default Card;