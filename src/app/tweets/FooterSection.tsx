import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { SetStateAction } from 'react'
import { handleLike } from './handleLike';

const FooterSection = ({ likeState, setLikeState, token, tweetId, response }: { response: { status: number; res: number; } | undefined; tweetId: string; token: string; likeState: boolean | undefined; setLikeState: React.Dispatch<SetStateAction<typeof likeState>> }) => {

  return (
    < div className='flex gap-2 w-[58vw] border-t-[1px] border-t-slate-700 justify-between items-center' >
      <div className='p-2 text-2xl' onClick={() => {
        handleLike({ tweetId: tweetId, token })
        setLikeState((state) => !state)

      }} >
        {likeState ? <FontAwesomeIcon className='text-red-500' icon={faHeart} /> : <FontAwesomeIcon icon={faHeart} />}
        <span className='text-xl p-2 text-white'>{response?.res.toString()}</span>
      </div>
      <div className='p-2 text-2xl'>
        <FontAwesomeIcon icon={faHeart} />
      </div>
      <div className='p-2 text-2xl'>
        <FontAwesomeIcon icon={faHeart} />
      </div>
    </div >
  )
}

export default FooterSection
