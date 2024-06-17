import { cookies } from "next/headers";
import Header from "./Header";
import Tweets from "../tweets/page";
const page = () => {
  const cookie = cookies().get("auth_token_x_clone")?.value ?? "";
  return (
    <>
      <Header cookie={cookie} />
      <Tweets />
    </>
  );
};

export default page;
