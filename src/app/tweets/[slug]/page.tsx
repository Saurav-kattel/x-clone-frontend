import { TweetRes, Tweets, getTweetsData } from '@/app/actions/getTweetsData'
import React from 'react'
import { cookies } from 'next/headers'
import TweetHeader from "./TweetHeader"
import TweetBody from './TweetBody'
import TweetFooter from './TweetFooter'

const page = async ({ params }: { params: { slug: string } }) => {
  const data = await getTweetsData({ pageNum: 1, pageSize: 1, tweetId: params.slug })
  const cookie = cookies().get("auth_token_x_clone")?.value ?? ""
  if (!data?.res) {
    return <div>
      Invalid Tweet
    </div>
  }
  return (
    <div>
      < TweetHeader data={data} />
      <TweetBody data={data} />
      <TweetFooter
        tweetId={data.res.id}
        userId={data.res.userId}
        token={cookie} />
    </div>
  )
}

export default page
