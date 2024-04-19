"use client"
import React, { useEffect } from 'react'
import TweetComponent from './TweetComponent'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/app/store'
import { getTweets } from '../redux/features/tweetsSlice'

const Tweets = ({ cookie }: { cookie: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { tweets, loading } = useSelector((state: RootState) => state.tweets)
  useEffect(() => {
    if (tweets === undefined || tweets === null) {
      dispatch(getTweets({ pageNum: 1, pageSize: 8 }))
    }
  }, [])
  return (
    <>
      {
        loading ? <span>Loading...</span> : <div className='box-border  flex flex-col  gap-2 p-2 overflow-hidden'>
          {tweets?.status === 200 && tweets.res.map((tweet) => <TweetComponent key={tweet.id} token={cookie} data={tweet} />)}
        </div>
      }
    </>
  )
}

export default Tweets
