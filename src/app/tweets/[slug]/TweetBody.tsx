import { Tweets } from '@/app/actions/getTweetsData'
import React from 'react'
import TweetImage from '../TweetImage'

interface ArgDataType {
  status: number;
  res: Tweets
}


const TweetBody = ({ data }: { data: ArgDataType }) => {
  return (
    <div className='flex flex-col justify-center items-center'>

      <div className='flex items-center  p-2 w-[35dvw]    justify-start'>
        <p className='text-md'> {data.res.content} </p>
      </div>

      <div className='flex justify-center items-center w-[35dvw]'>
        <TweetImage imageId={data.res.imageId} />
      </div>

    </div>
  )
}

export default TweetBody
