"use client";
import { useState } from "react";
import { UserData } from "./BasicDetails";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/app/store";
import ChangeProfileImage from "./ChangeProfileImage";
import EditUserName from "./EditUsername";
import EditModalHeader from "./EditModalHeader";
import ErrorComponent from "./ErrorComponent";
import ChangeCoverImage from "./ChangeCoverImage";

const EditModal = ({
  data,
  setVisibility,
  cookies,
}: {
  data: UserData;
  cookies: string;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [response, setResponse] = useState<any>();
  const { loading } = useSelector(
    (state: RootState) => state.profileImg
  );

  if (loading) {
    return "Loading..";
  }

  return (
    <div className="absolute w-[50vw] flex-col z-10 h-[80vh] flex justify-center items-center border border-slate-700 rounded-lg p-4 bg-[#000009]">

      <EditModalHeader setVisibility={setVisibility} />
      <EditUserName prevUserName={data.username} setResponse={setResponse} cookies={cookies} />
      <ChangeProfileImage cookie={cookies} setResponse={setResponse} username={data.username} />
      <ChangeCoverImage cookie={cookies} setResponse={setResponse} username={data.username} />

      <ErrorComponent response={response} />
    </div>
  );
};

export default EditModal;
