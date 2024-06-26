"use client"
import React, { useEffect } from "react";
import { items } from "./items";
import SideItems from "./SideItems";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/app/store";
import { getUserData } from "../redux/features/userSlice";
import Spinner from "@/lib/Spinner";

const SideBarComponent = ({ cookie }: { cookie: string }) => {
  const { res: userData } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!userData?.res) {
      dispatch(getUserData({ cookie: cookie }))
    }
  }, [userData])

  return (
    <div className="flex  items-center p-2 text-white justify-start gap-1 lg:sticky lg:top-0 lg:left-0 md:sticky md:top-0 md:left-0 lg:flex-col md:flex-col md:w-[10vw]  lg:w-[30vw] lg:h-[100vh] ">

      <span className="py-2 hidden lg:block text-4xl font-bold text-center">X clone</span>
      <div className="w-[100vw]  overflow-scroll md:w-[25vw] lg:w-[25vw] flex md:flex-col lg:flex-col">
        {userData ? items.map((item) => (
          <SideItems key={item.path} item={item} username={userData?.res.username ?? ""} />
        )) : <Spinner />}
      </div>
    </div>
  );
};

export default SideBarComponent;
