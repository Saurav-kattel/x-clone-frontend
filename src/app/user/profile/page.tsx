import React from "react";
import ProfileComponent from "./general/ProfileComponent";

import { cookies } from "next/headers";
import SecurityComponent from "./security/SecurityComponent";
import TweetWrapper from "./tweets/TweetWrapper";
import DeleteAccountForm from "./delete/DeleteAccountForm";

const page = async () => {
  const cookie = cookies().get("auth_token_x_clone")?.value ?? ""
  return (
    <>
      <ProfileComponent cookies={cookie} />
      d
    </>
  );
};

export default page; 
