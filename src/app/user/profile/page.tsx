import React, { Suspense } from "react";
import ProfileComponent from "./ProfileComponent";
import { getUserData } from "./getUserData";
import { getImageData } from "./getImage";
import { cookies } from "next/headers";

const page = async () => {
  const data = await getUserData();
  const imgData = await getImageData();
  return (
    <div className="h-[100vh] text-white  p-4 overflow-auto">
      <ProfileComponent
        data={data}
        imgData={imgData}
        cookies={cookies().get("auth_token_x_clone")?.value ?? ""}
      />
    </div>
  );
};

export default page;
