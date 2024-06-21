"use client"
import React, { useEffect } from 'react'
import { AppDispatch, RootState } from '../redux/app/store';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileImage } from '../redux/features/profileImageSlice';
import Image from 'next/image';

const ProfileImage = ({ cookie, username }: { cookie: string, username: string | undefined }) => {
  const { res: profileImgRes } = useSelector(
    (state: RootState) => state.profileImg
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!profileImgRes) {
      setTimeout(() => {
        dispatch(getProfileImage({ cookie }));
      }, 600)
    }

  }, []);
  return (
    <div>
      {profileImgRes?.res.image ? (
        <div className="flex items-center p-2 justify-start ">
          <Image
            height={100}
            alt='profile picture'
            placeholder='blur'
            blurDataURL='https://www.drupal.org/files/project-images/nextjs-icon-dark-background.png'
            width={100}
            className="w-[70px] h-[70px] rounded-full bg-contain object-fit"
            src={`data:image/jpeg;base64,${profileImgRes.res.image}`}
          />
        </div>
      ) : (
        <div className="rounded-[50%] flex justify-center items-center text-center w-[70px] bg-gray-200 h-[70px]">
          <span className="text-4xl text-slate-600 font-bold">
            {username?.slice(0, 1).toUpperCase()}
          </span>
        </div>
      )}
    </div>
  )
}

export default ProfileImage
