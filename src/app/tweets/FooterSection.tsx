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
  token: string; like: boolean | undefined;
  userId: string;

}


const LikeSection = ({ tweetId, click, token, userId }: {
  tweetId: string;
  token: string; like: boolean | undefined;
  userId: string;
  click: boolean;
}
) => {

  const [count, setCount] = useState(0)
  const [like, setLike] = useState(false)


  useEffect(() => {
    const fetchData = async () => {
      const { like: hasLiked } = await useHasLiked({ tweetId, token, userId })
      const { count: likeCount } = await useTweetLikeCount({ tweetId })
      setLike(hasLiked)
      setCount(likeCount)

    }
    fetchData()
  }, [click, userId])
  return <>
    {like ? <FontAwesomeIcon className='text-red-500 hover:cursor-pointer' icon={faHeart} /> : <FontAwesomeIcon className='cursor-pointer' icon={faHeart} />}
    <span className='text-xl p-2 text-white'>{count}</span>
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

const FooterSection = ({ token, tweetId, userId }: PropType) => {
  const [click, setClick] = useState(false)

  const [showComment, setShowComment] = useState(false)
  const handleLikeClicked = ({ token, tweetId }: { token: string; tweetId: string }) => {
    setTimeout(() => {
      handleLike({ token, tweetId })
      setClick(!click)
    }, 100)
  }


  return (
    <div className='border-b-[1px] flex flex-col w-[40vw] items-center justify-center  border-t-slate-700'>
      < div className='w-[40vw] flex items-center justify-center '>
        <div className='flex gap-2 w-[35vw] justify-between items-center'>
          <div className='p-2 text-2xl' onClick={() => {
            handleLikeClicked({ token, tweetId })
          }} >
            <LikeSection token={token} click={click} tweetId={tweetId} userId={userId} />
          </div>
          <CommentSectionWrapper tweetId={tweetId} setShowComment={setShowComment} />
          <div className='p-2 text-2xl'>
            <FontAwesomeIcon icon={faHeart} />
          </div>
        </div>
      </div>
      <div className='flex p-2 justify-center w-[40vw] items-center '>
        {showComment && <CommentBox visibility='USER' cookie={token} tweetId={tweetId} setShowComment={setShowComment} />}
      </div>
    </div>
  )
}

export default FooterSection
