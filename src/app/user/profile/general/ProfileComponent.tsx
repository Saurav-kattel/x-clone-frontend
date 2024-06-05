"use client";
import React, { Suspense, useEffect, useState } from "react";
import BasicDetails, { UserData } from "./BasicDetails";
import EditModal from "./EditModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/app/store";
import { getUserData } from "@/app/redux/features/userSlice";
import Link from "next/link";
import { getFolloweeData } from "@/app/redux/features/followeeSlice";
import { getFollowerData } from "@/app/redux/features/followerSlice";
const ImageComponent = React.lazy(() => import("./ImageComponent"));

export type UserDataRes = { status: number; res: UserData } | undefined;
const ProfileComponent = ({ cookies }: { cookies: string }) => {
  const [visibility, setVisibility] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) => state.user.res);
  const loading = useSelector((state: RootState) => state.user.loading);
  const { res: followers } = useSelector((state: RootState) => state.follower);
  const { res: following } = useSelector((state: RootState) => state.following);

  useEffect(() => {
    if (!data) {
      dispatch(getUserData({ cookie: cookies }));
    }

    dispatch(getFolloweeData({ cookie: cookies }))
    dispatch(getFollowerData({ cookie: cookies }))

  }, [data]);
  return (
    <>
      {!loading ? (
        data ? (
          <div className="flex flex-col w-[40vw] justify-center items-center p-4">

            <div className=" border border-slate-800 p-4 rounded-md shadow-sm shadow-slate-400">
              <div className="font-bold text-2xl capitalize text-white py-2 px-4 text-left">
                {data.res.firstName.concat(" ").concat(data.res.lastName)}
              </div>

              <div className="m-2 flex gap-4 justify-around items-center">
                <Suspense fallback="loading...">
                  <ImageComponent
                    username={data.res.username}
                    cookie={cookies}
                  />
                </Suspense>
                <div className="flex flex-col gap-2 justify-center items-center">
                  <div
                    onClick={() => setVisibility((vis) => !vis)}
                    className="border  border-slate-700 text-white py-1 px-2 bg-slate-950 hover:cursor-pointer  hover:scale-110 rounded-lg"
                  >
                    Edit profile
                  </div>
                  <div className="flex justify-between items-center">
                    <Link href={'/user/profile/relation/followers'} className="flex justify-center flex-col hover:cursor-pointer items-center">
                      <span className="p-2 text-center flex gap-2 text-blue-600 font-semibold">Followers </span>
                      <span className="font-bold text-white"> {followers?.res ? followers?.res.length.toString() : 0} </span>
                    </Link>

                    <Link href={'/user/profile/relation/following'} className="flex justify-center hover:cursor-pointer flex-col items-center" >
                      <span className="p-2 text-center flex gap-2 text-blue-600 font-semibold">Following </span>
                      <span className="font-bold text-white">{following?.res ? following?.res.length.toString() : 0}  </span>
                    </Link>
                  </div>
                </div>
              </div>

              <BasicDetails data={data.res} />
              <div className="absolue flex justify-center items-center ">
                {visibility && (
                  <EditModal
                    data={data.res}
                    setVisibility={setVisibility}
                    cookies={cookies}
                  />
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-[40vh] text-white flex items-center justify-center ">
            Requesting Data...
          </div>
        )
      ) : (
        <div className="h-[40vh] text-white flex items-center justify-center ">
          Loading..
        </div>
      )}
    </>
  );
};

export default ProfileComponent;
