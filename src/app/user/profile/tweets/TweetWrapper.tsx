"use client"
import { useState } from "react";
import UserTweets from "./UserTweets";
import { VisType } from "@/app/home/Header";

export default function TweetWrapper({ cookie }: { cookie: string }) {

  const [selectedVisibility, setSelectedVisibility] = useState<VisType>("followers")
  return <div>

    <div className="flex w-[40dvw] p-2 bg-slate-950 justify-evenly items-center">
      <div onClick={() => setSelectedVisibility("public")}><span> Public</span></div>
      <div onClick={() => setSelectedVisibility("private")}><span>Private</span></div>
      <div onClick={() => setSelectedVisibility("followers")}><span >Followers</span></div>
    </div>
    <UserTweets cookie={cookie} vis={selectedVisibility} />
  </div>
}
