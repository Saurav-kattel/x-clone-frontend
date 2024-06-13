'use client'
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { SetStateAction, useEffect, useState } from 'react'
import { handleLike } from './(ts)/handleLike';
import CommentBox from './(comments)/CommentBox';
import { getCommetCount } from './(ts)/getCommentCount';
import { useHasLiked } from '../hooks/useHasLiked';
import { useTweetLikeCount } from '../hooks/useTweetLike';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/app/store';

interface PropType {
  tweetId: string;
  token: string;
  userId: string;
  authorId: string;
  commentVis?: "USER" | "ALL";
  tweetOwnerId: string;
}


const LikeSection = ({ tweetId, token, userId }: {
  tweetId: string;
  token: string;
  userId: string;
}
) => {

  const [count, setCount] = useState(0)
  const [like, setLike] = useState(false)
  const [click, setClick] = useState(false)

  function handleLikeClick() {
    setClick(!click)
    setTimeout(() => {
      handleLike({ token, tweetId })
    }, 100)
  }

  useEffect(() => {
    const fetchData = () => {
      setTimeout(async () => {
        const { like: hasLiked } = await useHasLiked({ tweetId, token, userId })
        const { count: likeCount } = await useTweetLikeCount({ tweetId })
        setLike(hasLiked)
        setCount(likeCount)
      }, 200)
    }
    fetchData()
  }, [click, userId])

  return <>
    <div onClick={handleLikeClick} className='text-2xl '>
      {like ? <FontAwesomeIcon className='text-red-500 hover:cursor-pointer' icon={faHeart} /> : <FontAwesomeIcon className='cursor-pointer' icon={faHeart} />}
      <span className='text-xl p-2 text-white'>{count}</span>
    </div>
  </>
}

const CommentSectionWrapper = ({ tweetId, setShowComment }: {
  tweetId: string,
  setShowComment: React.Dispatch<SetStateAction<boolean>>
}) => {
  const [commentCount, setCommentCount] = useState(0)
  const { refresh } = useSelector((state: RootState) => state.comment)
  useEffect(() => {
    getCommetCount({ tweetId }).then((res) => {
      setCommentCount(res.res)
    }).catch(() => {
      setCommentCount(0)
    })
  }, [refresh])


  return <div className='overflow-scroll flex gap-1 items-center justify-center' onClick={() => setShowComment(state => !state)}>
    <FontAwesomeIcon icon={faComment}

      className='hover:cursor-pointer p-2 text-2xl' />
    <span className='font-semibold text-xl'> {commentCount}</span>
  </div>
}

const FooterSection = ({ token, tweetOwnerId, tweetId, userId, authorId, commentVis = "USER" }: PropType) => {
  const [showComment, setShowComment] = useState(false)
  return (
    <div className='border-b-[1px] flex flex-col w-[40vw] items-center justify-center  border-t-slate-700'>
      < div className='w-[40vw] flex items-center justify-center '>
        <div className='flex gap-2 w-[35vw] justify-between items-center'>
          <LikeSection tweetId={tweetId} token={token} userId={userId} />
          <CommentSectionWrapper tweetId={tweetId} setShowComment={setShowComment} />
          <div className='p-2 text-2xl'>
            <FontAwesomeIcon icon={faHeart} />
          </div>
        </div>
      </div>
      <div className='flex p-2 justify-center w-[40vw] items-center '>
        {showComment && <CommentBox authorId={authorId} tweetOwnerId={tweetOwnerId} visibility={commentVis} cookie={token} tweetId={tweetId} setShowComment={setShowComment} />}
      </div>
    </div>
  )
}

export default FooterSection
