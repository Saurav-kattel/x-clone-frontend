import React, { Suspense } from "react";
import ProfileComponent from "./general/ProfileComponent";
import { getUserData } from "./general/getUserData";
import { getImageData } from "./general/getImage";
import { cookies } from "next/headers";
import SecurityComponent from "./security/SecurityComponent";
import DeleteAccountComponent from "./delete/DeleteAccountComponent";

const page = async () => {
  const data = await getUserData();
  const imgData = await getImageData();
  return (
    <div className="h-[100vh] text-white   p-4 overflow-y-scroll">
      <ProfileComponent
        data={data}
        imgData={imgData}
        cookies={cookies().get("auth_token_x_clone")?.value ?? ""}
      />
      <SecurityComponent />
      <DeleteAccountComponent />
    </div>
  );
};

export default page;
