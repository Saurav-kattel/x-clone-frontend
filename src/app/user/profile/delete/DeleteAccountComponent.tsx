import React from "react";
import { cookies } from "next/headers";
import DeleteAccountForm from "./DeleteAccountForm";

const DeleteAccountComponent = () => {
  const cookie = cookies().get("auth_token_x_clone")?.value;
  return (
    <div className="flex m-2 p-2 justify-center items-center">
      <DeleteAccountForm cookie={cookie ?? ""} />
    </div>
  );
};

export default DeleteAccountComponent;
