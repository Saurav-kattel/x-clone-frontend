"use client"
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Tweets } from '../redux/features/tweetsSlice'
import { handleLike } from './handleLike'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/app/store'
import { getTweetLike } from '../redux/features/likeCountSlice'
const AuthorImage = React.lazy(() => import('./AuthorImage'))
const TweetImage = React.lazy(() => import('./TweetImage'))

const TweetComponent = ({ data, token }: { data: Tweets, token: string }) => {
  const [likeState, setLikeState] = useState<"like" | "unlike">("like");
  const { res, loading } = useSelector((state: RootState) => state.likes)
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(getTweetLike({ tweetId: data.id }))
  }, [likeState])
  return (
    <div className='flex flex-col justify-center m-2 w-[58vw] rounded-md border-[0.2px] p-2 items-center '>
      <div className='flex w-[58vw] justify-start items-center'>
        <AuthorImage userId={data.userId} author={data.author} />
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
        <TweetImage imageId={data.imageId} />
      </div >

      { /* footers */}
      < div className='flex gap-2 w-[58vw] border-t-[1px] border-t-slate-700 justify-between items-center' >
        <div className='p-2 text-2xl' onClick={() => {
          handleLike({ tweetId: data.id, action: likeState, token })
          setLikeState((state) => state === "like" ? "unlike" : "like")
        }} >
          {likeState === "like" ? <FontAwesomeIcon className='text-red-500' icon={faHeart} /> : <FontAwesomeIcon icon={faHeart} />}
          <span className='text-xl p-2 text-white'>{loading ? "loading" : res?.res.toString()}</span>
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
