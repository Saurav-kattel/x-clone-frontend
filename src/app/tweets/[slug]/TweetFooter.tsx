"use client"
import { faComment, faHeart, faRetweet } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback, useEffect, useState } from 'react'
import { handleLike } from '../handleLike'
import { useHasLiked } from '@/app/hooks/useHasLiked'
import { useTweetLikeCount } from '@/app/hooks/useTweetLike'

const TweetFooter = ({ tweetId, token, userId }: { tweetId: string; token: string; userId: string }) => {
  const [count, setCount] = useState(0)
  const [like, setLike] = useState(false)
  const [click, setClick] = useState(false)


  useEffect(() => {
    const fetchData = async () => {
      const { like: hasLiked } = await useHasLiked({ tweetId, token, userId })
      const { count: likeCount } = await useTweetLikeCount({ tweetId })
      setLike(hasLiked)
      setCount(likeCount)
    }

    fetchData()
  }, [click])


  const handleLikeClicked = ({ token, tweetId }: { token: string; tweetId: string }) => {
    setTimeout(() => {
      handleLike({ token, tweetId })
      setClick(!click)
    })
  }
  return (
    <div className='flex w-[40dvw] justify-center items-center p-2'>
      <div className='flex text-2xl w-[35dvw] px-4  border-y-[1px] border-y-slate-500 py-2 items-center justify-between'>
        <div className='flex gap-2 items-center justify-center'>
          <div onClick={() => { handleLikeClicked({ tweetId, token }) }}>
            {like ? <FontAwesomeIcon
              icon={faHeart} className='cursor-pointer text-red-500' /> : <FontAwesomeIcon icon={faHeart} className='cursor-pointer' />}
          </div>
          {count}
        </div>
        <FontAwesomeIcon icon={faComment} className='cursor-pointer' />
        <FontAwesomeIcon icon={faRetweet} className='cursor-pointer' />
      </div>
    </div>
  )
}

export default TweetFooter
