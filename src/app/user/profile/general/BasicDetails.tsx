"use client";
import { backendUrl } from "@/lib/exportEnvs";
import {
  faAt,
  faCalendar,
  faMessage,
  faSignOut,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React from "react";
import { clear } from '@/app/redux/features/userSlice'
export interface UserData {
  id: string;
  username: string;
  email: string;
  imageId: string;
  createdAt: string;
  role: string;
  firstName: string;
  lastName: string;
}

async function handleLogout() {
  let res = await fetch(backendUrl + "/api/v1/user/account/logout", {
    method: "GET",
    credentials: "include",
  });
  return await res.json();
}
const BasicDetails = ({ data }: { data: UserData }) => {
  const router = useRouter();
  return (
    <div>
      <div className="text-white flex font-semibold text-md flex-col p-4">
        <span className="flex gap-1 items-center justify-start">
          <FontAwesomeIcon icon={faUserAlt} />
          {data.firstName.concat(" ").concat(data.lastName)}
        </span>
        <span className="flex gap-1 items-center justify-start">
          <FontAwesomeIcon icon={faAt} />
          {data.username}
        </span>

        <span className="flex gap-1 items-center justify-start">
          <FontAwesomeIcon icon={faMessage} /> {data.email}
        </span>
        <span className="flex gap-1 items-center justify-start">
          <FontAwesomeIcon icon={faCalendar} /> Joined on:
          {new Date(data.createdAt).toUTCString()}
        </span>
        <span className="flex gap-1 items-center justify-start">
          <FontAwesomeIcon icon={faSignOut} />
          <span
            className="hover:cursor-pointer"
            onClick={async () => {
              const res = await handleLogout();
              if (res.status == 200) {
                router.refresh();
                clear()
              }
            }}
          >
            Logout
          </span>
        </span>
      </div>
    </div>
  );
};

export default BasicDetails;
