import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Suspense } from 'react'
import { Tweets } from './getTweets'
const AuthorImage = React.lazy(() => import('./AuthorImage'))
const TweetImage = React.lazy(() => import('./TweetImage'))

const TweetComponent = async ({ data }: { data: Tweets }) => {
  return (
    <div className='flex flex-col justify-center m-2 w-[58vw] rounded-md border-[0.2px] p-2 items-center '>
      <div className='flex w-[58vw] justify-start items-center'>
        <Suspense fallback={"Waiting..."}>
          <AuthorImage userId={data.userid} author={data.author} />
        </Suspense>
        <div className='text-white font-bold text-md px-2 py-1'>
          {data.author}
        </div>
      </div>

      { /* Image and text content */}
      < div className='p-4 flex w-[58vw]  flex-col justify-center items-start text-wrap' >
        <div>
          <p className='text-md text-start'>
            {data.content}
          </p>
        </div>

        <Suspense fallback={"Loading.."}>
          <TweetImage imageId={data.imageId} />
        </Suspense>
      </div >

      { /* footers */}
      < div className='flex gap-2 w-[58vw] border-t-[1px] border-t-slate-700 justify-between items-center' >
        <div className='p-2 text-2xl'>
          <FontAwesomeIcon icon={faHeart} />
        </div>
        <div className='p-2 text-2xl'>
          <FontAwesomeIcon icon={faHeart} />
        </div>
        <div className='p-2 text-2xl'>
          <FontAwesomeIcon icon={faHeart} />
        </div>
      </div >
    </div >
  )
}

export default TweetComponent
