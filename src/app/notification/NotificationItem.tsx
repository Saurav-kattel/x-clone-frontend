"use client"
import React, { useState } from "react"
import { NotificationData } from "./getNotifications"
import NotificationHeader from "./NotificationHeader"
import NotificationBody from "./NotificationBody"
import { updateNotificationStatus } from "./updateNotificationStatus"
import { useRouter } from "next/navigation"
const NotificationItem = ({ data }: { data: NotificationData }) => {

  const [isRead, setIsRead] = useState(data.status === "unread" ? false : true)
  function handleMouseEnter({ id }: { id: string }) {
    if (!isRead) {
      updateNotificationStatus({ id }).then(() => setIsRead(true))
    }
  }

  const router = useRouter()


  function handleClick() {
    if (data.tweet_id) {
      router.push("/tweets/" + data.tweet_id)
    }
    handleMouseEnter({ id: data.id })
  }
  return <div
    className={`${data.tweet_id ? "cursor-pointer" : null} transition-all hover:bg-[#00000f] hover:opacity-60  `}
    onClick={handleClick} >
    <div
      className={`flex items-center mt-3 border-y-slate-600 border-y-[1px] py-4 px-2 justify-center w-[40dvw] gap-2 flex-col ${isRead ? "opacity-100" : "bg-slate-900 opacity-60"} `}>
      <NotificationHeader data={data} />
      <NotificationBody data={data} />

    </div>
  </div>
}

export default NotificationItem
