import Reat, { Suspense } from 'react'
import Tweets from './Tweets'
import { cookies } from 'next/headers'

const page = () => {
  const cookie = cookies().get("auth_token_x_clone")?.value ?? ""
  return (
    <Suspense fallback={"Loading..."} >
      <div className='no-scroll-bar'>
        <Tweets cookie={cookie} />
      </div>
    </Suspense>
  )
}

export default page
