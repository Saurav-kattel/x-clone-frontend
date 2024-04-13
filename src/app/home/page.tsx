import React, { Suspense } from "react";
import Header from "./Header";
import { cookies } from "next/headers";
import Tweets from "./Tweets";
const page = () => {
  const cookie = cookies().get("auth_token_x_clone")?.value ?? "";

  return (
    <>
      <Suspense fallback={"Loading.."}>
        <Header cookie={cookie} />
      </Suspense>
      <Tweets cookie={cookie} />
    </>
  );
};

export default page;
