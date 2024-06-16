import React, { Suspense } from 'react'
import Tweets from './Tweets'
import { cookies } from 'next/headers'
import { getTweetsData } from '../actions/getTweetsData'
import Spinner from '@/lib/Spinner'
import FirstTweetPage from './FirstTweetPage'


const page = async () => {
  const cookie = cookies().get("auth_token_x_clone")?.value ?? ""
  const data = await getTweetsData({ pageSize: 8, pageNum: 1 })
  return (
    <section className='no-scroll-bar flex flex-col m-0 p-0 items-center justify-center'>
      <Suspense fallback={<Spinner />} >
        <FirstTweetPage cookie={cookie} data={data} />
      </Suspense>
      <Tweets
        cookie={cookie} />

    </section>
  )
}

export default page
