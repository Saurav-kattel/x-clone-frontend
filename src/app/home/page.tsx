import React from "react";
import Header from "./Header";
import { cookies } from "next/headers";
import Tweets from "./Tweets";

const page = () => {
  const cookie = cookies().get("auth_token_x_clone")?.value ?? "";

  return (
    <div className="">
      <Header cookie={cookie} />
      <div className="">
        <Tweets cookie={cookie} />
      </div>
    </div>
  );
};

export default page;
