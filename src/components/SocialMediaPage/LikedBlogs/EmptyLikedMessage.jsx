import React from "react";

const EmptyLikedMessage = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <span className="font-bold text-white/60 sm:text-2xl">
        No Liked Blog Found!
      </span>
    </div>
  );
};

export default EmptyLikedMessage;
