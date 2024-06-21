"use client"

import { useState } from "react"
import RelationNav from "./RelationNav"
import Followers from "./followers/Followers"
import Following from "./following/Following";

export default function RelationWrapper({ username, token }: { username: string; token: string }) {

	let slugArray = username.split("-")
	let validUrl = slugArray[0] === "followers" || slugArray[0] === "following"
	if (slugArray.length != 2 || !validUrl) {

		return <div className="flex justify-center w-[40dvw] h-[100dvh] items-center text-wrap text-xl text-slate-700 ">
			Oopsis, something went wrong
		</div>
	}
	const [selectedRoute, setSelectedRoute] = useState(slugArray[0].slice(0, 1).toUpperCase().concat(slugArray[0].slice(1)))
	return <div>
		<RelationNav setSelectedRoute={setSelectedRoute} selectedRoute={selectedRoute} />
		{selectedRoute === "Following" && <Following token={token} username={slugArray[1]} />}
		{selectedRoute === "Followers" && <Followers token={token} username={slugArray[1]} />}

	</div>
}
