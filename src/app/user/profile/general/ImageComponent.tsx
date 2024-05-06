import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/app/store";
import { getProfileImage } from "@/app/redux/features/profileImageSlice";
import Image from "next/image"

const ImageComponent = ({
  username,
  cookie,
}: {
  username: string;
  cookie: string;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const imageData = useSelector((state: RootState) => state.profileImg.res);
  const { loading } = useSelector((state: RootState) => state.profileImg);

  useEffect(() => {
    setTimeout(() => {
      if (!imageData) {
        dispatch(getProfileImage({ cookie: cookie }));
      }
    }, 50)
  }, []);

  if (loading) {
    return "loading...";
  }

  if (!imageData || !imageData.res.image) {
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
      <Image
        height={50}
        alt="tweet"
        fetchPriority="low"
        width={50}
        className="w-[50px] h-[50px] rounded-full bg-contain object-fit"
        src={`data:image/jpeg;base64,${imageData.res.image}`}
      />
    </div>
  );
};

export default ImageComponent;
