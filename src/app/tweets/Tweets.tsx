"use client"
import React, { useCallback, useEffect, useState } from 'react'
import type { Tweets as TweetType, Tweets } from '../actions/getTweetsData'
import { useInView } from 'react-intersection-observer'
import { getTweetsData } from '../actions/getTweetsData'
import Spinner from '@/lib/Spinner'
import TweetComponent from './TweetComponent'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/app/store'

const Tweets = ({ cookie }: { cookie: string }) => {
  const [tweetsData, setTweetsData] = useState<TweetType[]>([])
  const [loadedPage, setLoadedPage] = useState(1)
  const [shouldFetchTweets, setShouldFetchTweets] = useState<boolean>(true)
  const [loading, setLoading] = useState(false)


  const { refresh } = useSelector((state: RootState) => state.tweets)

  const { ref, inView } = useInView({ threshold: 0 })

  const loadMoreTweets = useCallback(async () => {
    if (loading || !shouldFetchTweets) return;
    setLoading(true)
    const nextPage = loadedPage + 1;
    const newTweets = await getTweetsData({ pageSize: 8, pageNum: nextPage, token: cookie });

    if (newTweets?.res) {
      setTweetsData((currentData) => [...currentData, ...newTweets.res])
      setLoadedPage(nextPage);
    }

    if (newTweets?.res.length != 0 && newTweets?.res && newTweets.res.length % 8 === 0) {
      setShouldFetchTweets(true)
    } else {
      setShouldFetchTweets(false)
    }

    setLoading(false)
  }, [loadedPage, loading, shouldFetchTweets])

  useEffect(() => {
    if (inView && shouldFetchTweets) {
      loadMoreTweets();
    }
  }, [inView, shouldFetchTweets]);


  // to refetch data for the clinet component because revalidateTag isn't helping
  useEffect(() => {
    if (refresh) {
      setLoadedPage(1)
      setTweetsData([])
      setShouldFetchTweets(true)
      loadMoreTweets()
    }
  }, [refresh])

  return (
    <>
      <section className='flex flex-col no-scroll-bar'>
        {tweetsData && tweetsData.map((tweet) => <TweetComponent key={tweet.id} token={cookie} data={tweet} />)}
        <div className='flex justify-center items-center h-[3vh]' ref={ref}>
          {shouldFetchTweets && <Spinner />}
        </div>
      </section>
    </>
  )
}

export default Tweets
