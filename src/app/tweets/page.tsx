import { Suspense } from 'react'
import Tweets from './Tweets'
import { cookies } from 'next/headers'
import { getTweetsData } from '../actions/getTweetsData'
import TweetComponent from './TweetComponent'
import Spinner from '@/lib/Spinner'


const page = async () => {
  const cookie = cookies().get("auth_token_x_clone")?.value ?? ""
  const data = await getTweetsData({ pageSize: 8, pageNum: 1 })
  return (
    <Suspense fallback={<Spinner />} >
      <section className='no-scroll-bar'>
        <section className='box-border  flex flex-col  gap-2 p-2 no-scroll-bar overflow-hidden'>
          {data && data.res.map((tweet) => <TweetComponent key={tweet.id} token={cookie} data={tweet} />)}
        </section>
        <Tweets
          cookie={cookie} />

      </section>
    </Suspense>
  )
}

export default page
