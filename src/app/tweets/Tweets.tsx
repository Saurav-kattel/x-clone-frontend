"use client"
import React, { useEffect, useState } from 'react'
import TweetComponent from './TweetComponent'
import type { Tweets as TweetType } from '../actions/getTweetsData'
import { useInView } from 'react-intersection-observer'
import { getTweetsData } from '../actions/getTweetsData'

const Tweets = ({ cookie }: { cookie: string }) => {

  const [tweetsData, setTweetsData] = useState<TweetType[]>([])
  const [loadedPage] = useState(1)

  const { ref, inView } = useInView()

  const loadMoreTweets = async () => {
    const nextPage = loadedPage + 1;
    const newTweets = await getTweetsData({ pageSize: 8, pageNum: nextPage });

    if (newTweets?.res) {
      setTweetsData((currentData) => [...currentData, ...newTweets?.res])
    }

  }


  useEffect(() => {
    if (inView && tweetsData.length % 8 === 0) {
      loadMoreTweets();
    }
  }, [inView]);

  return (
    <>
      {
        <section ref={ref} className='box-border  flex flex-col  gap-2 p-2 no-scroll-bar overflow-hidden'>
          {tweetsData && tweetsData.map((tweet) => <TweetComponent key={tweet.id} token={cookie} data={tweet} />)}
        </section>
      }
    </>
  )
}

export default Tweets
