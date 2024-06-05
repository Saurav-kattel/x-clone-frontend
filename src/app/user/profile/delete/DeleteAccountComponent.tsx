import React from "react";
import { cookies } from "next/headers";
import DeleteAccountForm from "./DeleteAccountForm";

const DeleteAccountComponent = () => {
  const cookie = cookies().get("auth_token_x_clone")?.value;
  return (
    <div className="flex w-[30vw]  p-8 justify-center items-center">
      <DeleteAccountForm cookie={cookie ?? ""} />
    </div>
  );
};

export default DeleteAccountComponent;
