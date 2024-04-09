"use client";
import React, { useState } from "react";
import BasicDetails, { UserData } from "./BasicDetails";
import EditModal from "./EditModal";
const ImageComponent = React.lazy(() => import("./ImageComponent"));

export type UserDataRes = { status: number; res: UserData } | undefined;
const ProfileComponent = ({
  data,
  imgData,
  cookies,
}: {
  data: UserDataRes;
  imgData: any;
  cookies: string;
}) => {
  if (!data) {
    return <div>Error Occured</div>;
  }

  const [visibility, setVisibility] = useState<boolean>(false);

  return (
    <div className="flex flex-col justify-center items-center p-4">
      <div className=" border border-slate-800 p-4 rounded-md shadow-sm shadow-slate-400">
        <div className="font-bold text-2xl  text-white py-2 px-4 text-center">
          {data.res.username}
        </div>

        <div className="m-2 flex gap-4 justify-around items-center">
          <ImageComponent imageData={imgData} username={data.res.username} />
          <div
            onClick={() => setVisibility((vis) => !vis)}
            className="border  border-slate-700 text-white py-1 px-2 bg-slate-950 hover:cursor-pointer  hover:scale-110 rounded-lg"
          >
            Edit profile
          </div>
        </div>

        <BasicDetails data={data.res} />
        <div className="absolue flex justify-center items-center ">
          {visibility && (
            <EditModal
              data={data.res}
              setVisibility={setVisibility}
              imageData={imgData}
              cookies={cookies}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
