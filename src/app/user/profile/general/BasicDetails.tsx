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

  function getMonth(num: number): string {
    switch (num) {
      case 1: return "JAN";
      case 2: return "FEB";
      case 3: return "MAR";
      case 4: return "APR";
      case 5: return "MAY";
      case 6: return "JUN";
      case 7: return "JUL";
      case 8: return "AUG";
      case 9: return "SEP";
      case 10: return "OCT";
      case 11: return "NOV";
      case 12: return "DEC";
      default: return "Invalid month number";
    }
  }
  let date = new Date(data.createdAt);
  let parsedDate = date.getFullYear().toString().concat(" ").concat(getMonth(date.getMonth()))
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
          <FontAwesomeIcon icon={faCalendar} />
          <div className="flex gap-2">
            <span> Joined on:</span> {parsedDate} </div>
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
