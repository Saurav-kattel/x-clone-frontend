import React from "react";
import ProfileComponent from "./general/ProfileComponent";

import { cookies } from "next/headers";
import SecurityComponent from "./security/SecurityComponent";
import DeleteAccountComponent from "./delete/DeleteAccountComponent";

const page = async () => {
  return (
    <div className="flex py-8  justify-center items-center gap-2  flex-col ">
      <ProfileComponent
        cookies={cookies().get("auth_token_x_clone")?.value ?? ""}
      />
      <SecurityComponent />
      <DeleteAccountComponent />
    </div>
  );
};

export default page; 
