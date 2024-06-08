import React, { Suspense } from "react";
import Header from "./Header";
import { cookies } from "next/headers";
import Tweet from "../tweets/page";
import Spinner from "@/lib/Spinner";
const page = () => {
  const cookie = cookies().get("auth_token_x_clone")?.value ?? "";
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Header cookie={cookie} />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <Tweet />
      </Suspense>
    </>
  );
};

export default page;
