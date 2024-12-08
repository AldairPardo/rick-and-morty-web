import React from "react";
import empty from "../../assets/empty.gif";

const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full sm:hidden  text-gray-700 overflow-hidden">
      <img src={empty} alt="Empty State" className="w-full h-full" />
    </div>
  );
};

export default EmptyState;
