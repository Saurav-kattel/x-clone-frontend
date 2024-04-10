import React from "react";
import UpdatePasswordComp from "./UpdatePasswordComp";
import { cookies } from "next/headers";

const SecurityComponent = () => {
  const cookie = cookies().get("auth_token_x_clone")?.value;
  return (
    <div className="flex  justify-center  items-center">
      <UpdatePasswordComp cookie={cookie ?? ""} />
    </div>
  );
};

export default SecurityComponent;
