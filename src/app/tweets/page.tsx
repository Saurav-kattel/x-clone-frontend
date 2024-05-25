import { Suspense } from 'react'
import Tweets from './Tweets'
import { cookies } from 'next/headers'
import { getTweetsData } from '../actions/getTweetsData'
import Spinner from '@/lib/Spinner'
import FirstTweetPage from './FirstTweetPage'


const page = async () => {
  const cookie = cookies().get("auth_token_x_clone")?.value ?? ""
  const data = await getTweetsData({ pageSize: 8, pageNum: 1 })
  console.log(data)
  return (
    <Suspense fallback={<Spinner />} >
      <section className='no-scroll-bar'>
        <FirstTweetPage cookie={cookie} data={data} />
        <Tweets
          cookie={cookie} />

      </section>
    </Suspense>
  )
}

export default page
