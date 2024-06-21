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
    <div className=" flex flex-col w-[30vw] h-[100vh] items-center p-2 text-white justify-start gap-1">
      <span className="py-2 text-4xl font-bold text-center">X clone</span>
      {userData ? items.map((item) => (
        <SideItems key={item.path} item={item} username={userData?.res.username ?? ""} />
      )) : <Spinner />}
    </div>
  );
};

export default SideBarComponent;
