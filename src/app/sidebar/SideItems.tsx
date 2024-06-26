"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";
const SideItems = ({
  item,
  username,
}: {
  item: { name: string; path: string; icon: IconDefinition };
  username: string
}) => {

  const pathname = usePathname();

  const [urlPath] = useState(() => {
    if (item.name === "Profile") {
      return `/user/${username}`
    }
    return item.path
  })

  function active(pathname: string, itemName: string) {
    if (pathname.includes(itemName)) {
      return true
    }


    return false
  }
  let isActive = active(pathname, item.path.toLowerCase())
  return (
    <Link
      className={`px-4 py-2 w-[20vw] flex justify-around hover:bg-[#000c14] ${isActive ? "bg-[#000c14]" : ""
        } rounded-2xl`}
      href={urlPath}
    >
      <span>
        <FontAwesomeIcon className="px-2 text-xl " icon={item.icon} />
      </span>
      <div className="w-[15vw] hidden lg:flex  lg:justify-center lg:items-center">

        <span className="font-bold text-center">{item.name}</span>
      </div>
    </Link>
  );
};

export default SideItems;
