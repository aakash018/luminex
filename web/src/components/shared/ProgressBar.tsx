import React from "react";

interface Props {
  progressPercentage: number;
}

const ProgressBar: React.FC<Props> = ({ progressPercentage }) => {
  return (
    <div className="w-full bg-gray-500 h-1 relative">
      <div
        className={`w-[${progressPercentage}%] bg-green-400 absolute top-0 left-0 h-full`}
      ></div>
    </div>
  );
};

export default ProgressBar;
