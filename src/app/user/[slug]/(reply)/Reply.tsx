"use client"
import React, { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer";
import { getUserRepliedTweets } from "./getUserRepliedTweets";
import { TweetRes, Tweets } from "@/app/actions/getTweetsData";
import TweetComponent from "@/app/tweets/TweetComponent";
import Spinner from "@/lib/Spinner";
const Reply = ({ userId, cookie }: { userId: string; cookie: string }) => {
	const [data, setData] = useState<TweetRes["res"]>([]);
	const [shouldFetchTweets, setShouldFetchTweets] = useState(true)
	const [pageNumber, setPageNumber] = useState(1)
	const { inView, ref } = useInView();

	async function loadMore({ setData, pageNumber }: { pageNumber: number; setData: React.Dispatch<React.SetStateAction<Tweets[]>>; }) {
		let data = await getUserRepliedTweets({ userId, pageNumber, pageSize: 8 })

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
			loadMore({ setData, pageNumber })
			setPageNumber((nu) => nu + 1)
		}
	}, [inView, shouldFetchTweets])
	return (
		<div>
			{data && data.map((item) => <TweetComponent
				commentVis="ALL"
				key={item.id} token={cookie} data={item} />)}
			<div ref={ref} className='flex items-center justify-center'>
				{shouldFetchTweets && <Spinner />}
			</div>
		</div>
	)
}

export default Reply;
