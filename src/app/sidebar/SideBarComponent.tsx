import React from "react";
import { items } from "./items";
import SideItems from "./SideItems";




const SideBarComponent = () => {
  return (
    <div className=" flex flex-col w-[20vw] items-center p-2 text-white justify-center gap-1">
      <span className="py-2 text-4xl font-bold text-center">X clone</span>
      {items.map((item) => (
        <SideItems key={item.path} item={item} />
      ))}
    </div>
  );
};

export default SideBarComponent;
