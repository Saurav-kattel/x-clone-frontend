import { backendUrl } from "@/lib/exportEnvs";
import {
  faCalendar,
  faMessage,
  faSignOut,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export interface UserData {
  id: string;
  username: string;
  email: string;
  imageId: string;
  createdAt: string;
  role: string;
}

async function handleLogout() {
  await fetch(backendUrl + "/api/v1/user/account/logout");
}
const BasicDetails = ({ data }: { data: UserData }) => {
  return (
    <div>
      <div className="text-white flex font-semibold text-md flex-col p-4">
        <span className="flex gap-1 items-center justify-start">
          <FontAwesomeIcon icon={faUserAlt} />
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
          <span className="hover:cursor-pointer" onClick={handleLogout}>
            Logout
          </span>
        </span>
      </div>
    </div>
  );
};

export default BasicDetails;
