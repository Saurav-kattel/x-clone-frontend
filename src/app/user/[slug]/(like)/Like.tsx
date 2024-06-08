"use client"

import { TweetRes, Tweets } from "@/app/actions/getTweetsData";
import TweetComponent from "@/app/tweets/TweetComponent";
import Spinner from "@/lib/Spinner";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getUserLikedTweets } from "./getUserLikedTweets";

type PropsType = {
	cookie: string;
	userId: string;
}
const Like = ({ cookie, userId }: PropsType) => {

	const [data, setData] = useState<TweetRes["res"]>([]);
	const [shouldFetchTweets, setShouldFetchTweets] = useState(true)
	const [pageNumber, setPageNumber] = useState(1)
	const { inView, ref } = useInView();

	async function loadMore({ setData, token, pageNumber }: { pageNumber: number; setData: React.Dispatch<React.SetStateAction<Tweets[]>>; token: string }) {
		let data = await getUserLikedTweets({ userId, pageNumber, pageSize: 8 })

		if (data?.status == 200) {
			setData(previousData => [...previousData, ...data.res])
		}
		if (data && data?.res.length % 8 === 0 && data.res.length > 0) {
			setShouldFetchTweets(true)
		} else {
			setShouldFetchTweets(false)
		}

	}

	useEffect(() => {
		if (inView && shouldFetchTweets) {
			loadMore({ setData, token: cookie, pageNumber })
			setPageNumber((nu) => nu + 1)
		}
	}, [inView, shouldFetchTweets])
	return (
		<div>
			{data && data.map((item) => <TweetComponent commentVis="USER" token={cookie} data={item} key={item.id} />)}
			<div ref={ref} className='flex items-center justify-center'>
				{shouldFetchTweets && <Spinner />}
			</div>
		</div>
	)
}

export default Like;
