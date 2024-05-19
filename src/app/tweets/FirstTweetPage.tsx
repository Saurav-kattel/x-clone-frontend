'use client'
import TweetComponent from './TweetComponent'
import { TweetRes } from '../actions/getTweetsData';
import { useEffect, useState } from 'react';

const FirstTweetPage = ({ cookie, data }: { cookie: string; data: TweetRes | undefined }) => {
  const [delay, setDelay] = useState(false);

  useEffect(() => {

    const tmId = setTimeout(() => {
      setDelay(true)
    }, 300)

    return () => {
      clearTimeout(tmId)
      setDelay(false)
    }
  }, [])
  return (
    <>
      {!delay && <section className='box-border  flex flex-col  gap-2 p-2 no-scroll-bar overflow-hidden'>
        {data && data.res.map((tweet) => <TweetComponent key={tweet.id} token={cookie} data={tweet} />)}
      </section>}
    </>
  )
}

export default FirstTweetPage
