import React from "react";
import { getImageData } from "./getImage";

const ImageComponent = ({
  username,
  imageData,
}: {
  imageData: any;
  username: string;
}) => {
  if (imageData.status != 200) {
    return (
      <div className="rounded-[50%] flex justify-center items-center text-center w-[100px] bg-gray-200 h-[100px]">
        <span className="text-4xl text-slate-600 font-bold ">
          {username.slice(0, 1).toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-start ">
      <img
        height={100}
        width={100}
        className="w-[100px] h-[100px] rounded-full bg-contain object-fit"
        src={`data:image/jpeg;base64,${imageData.res.image}`}
      />
    </div>
  );
};

export default ImageComponent;
