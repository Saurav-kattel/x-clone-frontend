import React from "react";
import SideBarComponent from "./SideBarComponent";
import getCookie from "../actions/getCookies";

const page = () => {
  const cookie = getCookie()
  return (
    <div className="sticky top-0 left-0 *:border-r-[0.5px] border-slate-700 ">
      <SideBarComponent cookie={cookie} />
    </div>
  );
};

export default page;
