"use client"
import { faComment, faHeart, faRetweet } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { useHasLiked } from '@/app/hooks/useHasLiked'
import { useTweetLikeCount } from '@/app/hooks/useTweetLike'
import { handleLike } from '../(ts)/handleLike'
import CommentBox from '../(comments)/CommentBox'
import { getCommetCount } from '../(ts)/getCommentCount'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/redux/app/store'

const TweetFooter = ({ tweetId, token, userId }: { tweetId: string; token: string; userId: string }) => {
  const [count, setCount] = useState(0)
  const [like, setLike] = useState(false)
  const [click, setClick] = useState(false)
  const [commentCount, setCommentCount] = useState(0)
  const { refresh } = useSelector((state: RootState) => state.comment)
  const [showComments, setShowComments] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const { like: hasLiked } = await useHasLiked({ tweetId, token, userId })
      const { count: likeCount } = await useTweetLikeCount({ tweetId })
      const { res } = await getCommetCount({ tweetId })

      setCommentCount(() => {
        if (!res) return 0;
        return res
      })
      setLike(hasLiked)
      setCount(likeCount)
    }
    fetchData()
  }, [click, refresh])


  const handleLikeClicked = ({ token, tweetId }: { token: string; tweetId: string }) => {
    setTimeout(() => {
      handleLike({ token, tweetId })
      setClick(!click)
    })
  }

  return (
    <>
      <div className='flex w-[90vw] lg:w-[40dvw] flex-col justify-center items-center p-2'>
        <div className='flex text-2xl w-[90vw] lg:w-[35dvw]  px-4  border-y-[1px] border-y-slate-500 py-2 items-center justify-between'>
          <div className='flex gap-2 items-center justify-center'>
            <div onClick={() => { handleLikeClicked({ tweetId, token }) }}>
              {like ? <FontAwesomeIcon
                icon={faHeart} className='cursor-pointer text-red-500' /> : <FontAwesomeIcon icon={faHeart} className='cursor-pointer' />}
            </div>
            {count}
          </div>
          <div className='flex gap-2 items-center'>

            <FontAwesomeIcon icon={faComment} className='cursor-pointer' onClick={() => setShowComments(!showComments)} />
            <span>{commentCount}</span>
          </div>

          <FontAwesomeIcon icon={faRetweet} className='cursor-pointer' />
        </div>

        <CommentBox showExit={false} tweetOwnerId={userId} setShowComment={setShowComments} tweetId={tweetId} cookie={token} visibility='ALL' />
      </div>
    </>
  )
}

export default TweetFooter
