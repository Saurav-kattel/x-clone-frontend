import Header from "./Header";
import { cookies } from "next/headers";
import Tweet from "../tweets/page";
const page = () => {
  const cookie = cookies().get("auth_token_x_clone")?.value ?? "";
  return (
    <>
      <Header cookie={cookie} />
      <Tweet />
    </>
  );
};

export default page;
