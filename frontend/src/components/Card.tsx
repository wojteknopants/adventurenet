import { ReactNode } from "react";

const Card = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-white shadow-md shadow-gray-300 rounded-md p-4 mb-5">
      {children}    
    </div>
  );
};

export default Card;