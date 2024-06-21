"use client"
import { VisType } from "@/app/home/Header";
import Tweets from "@/app/tweets/Tweets";
import { getUserPost } from "./getUserPost";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { TweetRes } from "@/app/actions/getTweetsData";
import Spinner from "@/lib/Spinner";
import TweetComponent from "@/app/tweets/TweetComponent";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/app/store";

export default function UserTweets({ cookie, vis }: { cookie: string, vis: VisType }) {
  const [data, setData] = useState<TweetRes["res"]>([]);
  const [shouldFetchTweets, setShouldFetchTweets] = useState(true)
  const [pageNumber, setPageNumber] = useState(1)
  const { inView, ref } = useInView();
  const { res: userData } = useSelector((state: RootState) => state.user)

  async function loadMore({ setData, pageNumber, vis = "public" }: { pageNumber: number; setData: React.Dispatch<React.SetStateAction<Tweets[]>>; vis: VisType; }) {
    let response = await getUserPost({ username: userData?.res.username ?? "", pageNumber, pageSize: 8, cookie, vis })

    if (response?.status == 200) {
      setData(previousData => [...previousData, ...response.res])
    }
    if (response && response.res.length % 8 === 0 && response.res.length > 0) {
      setShouldFetchTweets(true)
    } else {
      setShouldFetchTweets(false)
    }
  }


  useEffect(() => {
    if (inView && shouldFetchTweets) {
      loadMore({ setData, pageNumber, vis: vis })
      setPageNumber((nu) => nu + 1)
    }
  }, [inView, shouldFetchTweets])

  useEffect(() => {
    setShouldFetchTweets(true);
    setData([]);
    setPageNumber(1)
    if (shouldFetchTweets) {
      loadMore({ setData, pageNumber, vis: vis })
      setPageNumber((nu) => nu + 1)
    }
  }, [vis])
  return (
    <div>
      {data && data.map((item) => <TweetComponent token={cookie} data={item} key={item.id} />)}
      <div ref={ref} className='flex items-center justify-center'>
        {shouldFetchTweets && <Spinner />}
      </div>
    </div>

  )
}
