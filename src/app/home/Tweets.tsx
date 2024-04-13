import React from 'react'
import TweetComponent from './TweetComponent'

const Tweets = ({ cookie }: { cookie: string }) => {
  return (
    <div className='box-border  flex p-2 overflow-hidden'>
      <TweetComponent />
    </div>
  )
}

export default Tweets
