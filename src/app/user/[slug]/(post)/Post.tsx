"use client"
import React, { useEffect, useState } from 'react'
import { getUserPost } from './getUserPost'
import TweetComponent from '@/app/tweets/TweetComponent';
import type { TweetRes, Tweets } from '@/app/actions/getTweetsData';
import { useInView } from 'react-intersection-observer';
import Spinner from '@/lib/Spinner';




const Post = ({ username, cookie }: { cookie: string; username: string }) => {

  const [data, setData] = useState<TweetRes["res"]>([]);
  const [shouldFetchTweets, setShouldFetchTweets] = useState(true)
  const [pageNumber, setPageNumber] = useState(1)
  const { inView, ref } = useInView();

  async function loadMore({ setData, token, pageNumber }: { pageNumber: number; setData: React.Dispatch<React.SetStateAction<Tweets[]>>; token: string }) {
    let data = await getUserPost({ username, pageNumber, pageSize: 8, cookie })

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
      {data && data.map((item) => <TweetComponent token={cookie} data={item} key={item.id} />)}
      <div ref={ref} className='flex items-center justify-center'>
        {shouldFetchTweets && <Spinner />}
      </div>
    </div>
  )
}

export default Post
