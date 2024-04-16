import React from 'react'
import TweetComponent from './TweetComponent'
import { getTweets } from './getTweets'

const Tweets = async ({ cookie }: { cookie: string }) => {
  let data = await getTweets();
  return (
    <div className='box-border  flex flex-col  gap-2 p-2 overflow-hidden'>
      {data?.status === 200 && data.res.map((tweet) => <TweetComponent key={tweet.id} data={tweet} />)}
    </div>
  )
}

export default Tweets
