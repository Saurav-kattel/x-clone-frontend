import React from "react";

import LoginForm from "./LoginForm";
import { cookies } from "next/headers";

const page = () => {
  const cookie = cookies().get("auth_token_x_clone")?.value || ""
  return (
    <div>
      <LoginForm cookie={cookie} />
    </div>
  );
};

export default page;
