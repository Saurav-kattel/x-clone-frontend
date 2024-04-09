"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";
const SideItems = ({
  item,
}: {
  item: { name: string; path: string; icon: IconDefinition };
}) => {
  const pathname = usePathname();
  return (
    <Link
      className={`px-4 py-2 flex justify-evenly hover:bg-[#000c14] ${
        pathname === item.path ? "bg-[#000c14]" : ""
      } rounded-2xl`}
      href={item.path}
    >
      <span>
        <FontAwesomeIcon className="px-2 text-xl " icon={item.icon} />
      </span>
      <span className="font-bold text-center">{item.name}</span>
    </Link>
  );
};

export default SideItems;
