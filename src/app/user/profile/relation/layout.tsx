import { cookies } from "next/headers";
import RelationNav from "./RelationNav";
import UserName from "./UserName";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  const cookie = cookies().get("auth_token_x_clone")?.value || ""
  return (
    <>
      <UserName token={cookie} />
      <RelationNav />
      <div>{children}</div>
    </>
  );
}

export default Layout;
