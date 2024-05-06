'use client'
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { SetStateAction, useState } from 'react'
import { handleLike } from './handleLike';
import CommentBox from './CommentBox';

const FooterSection = ({ likeState, setLikeState, token, tweetId, response }: { response: { status: number; res: number; } | undefined; tweetId: string; token: string; likeState: boolean | undefined; setLikeState: React.Dispatch<SetStateAction<typeof likeState>> }) => {
  const [showComment, setShowComment] = useState(false)
  return (
    < div className='w-[40vw] flex items-center justify-center border-b-[1px] border-t-slate-700'>
      <div className='flex gap-2 w-[35vw] justify-between items-center'>
        <div className='p-2 text-2xl' onClick={() => {
          handleLike({ tweetId: tweetId, token })
          setLikeState((state) => !state)

        }} >
          {likeState ? <FontAwesomeIcon className='text-red-500 hover:cursor-pointer' icon={faHeart} /> : <FontAwesomeIcon icon={faHeart} />}
          <span className='text-xl p-2 text-white'>{response?.res.toString()}</span>
        </div>
        <div className='overflow-scroll' onClick={() => setShowComment(state => !state)}>
          <FontAwesomeIcon icon={faComment} className='hover:cursor-pointer p-2 text-2xl' />
          {showComment && <CommentBox setShowComment={setShowComment} />}
        </div>
        <div className='p-2 text-2xl'>
          <FontAwesomeIcon icon={faHeart} />
        </div>
      </div>
    </div >
  )
}

export default FooterSection
