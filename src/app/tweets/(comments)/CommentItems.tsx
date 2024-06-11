import React, { useState } from 'react'
import AuthorImage from '../AuthorImage'
import CommentInputBox from './CommentInputBox';
import { CommentData } from '../(ts)/getUserComments';
import ReplyBox from '../(reply)/ReplyBox';
import SpentTimeComponent from './SpentTimeComponent';

type Params = {
  token: string;
  tweetId: string;
  parentCommentId: string | null
  authorId: string
  commentId: string
}

function CommentBody({ data }: { data: CommentData }) {
  const [comment, setComment] = useState(() => {
    if (data.comment.length <= 100) {
      return data.comment;
    }
    return data.comment.slice(0, 100).concat("...")
  })

  const [readMoreStatus, setReadMoreStatus] = useState<string>("Read More")
  return (
    <div className='ml-8  text-sm py-0 '>
      <p>{comment}</p>
      {data.comment.length > 100 && <button
        onClick={() => {
          setReadMoreStatus((state) => {
            if (state === "Read More") {
              setComment(data.comment)
              return "Read Less"
            }
            setComment(data.comment.slice(0, 100).concat("..."))
            return "Read More"
          })
        }}
        className='text-blue-500  text-sm hover:underline '
      >{readMoreStatus}</button>}
    </div>
  )
}

function Footer({ tweetId, token, authorId, commentId, parentCommentId, }: Params) {
  const [showRelpies, setShowRelpies] = useState(false)
  const [showInputModal, setShowInputModal] = useState(false)
  return <div>
    <div className='flex justify-between  w-[26dvw] items-center'>
      <button
        onClick={() => {
          setShowInputModal(st => !st)
        }}
        className='flex ml-4 rounded-md px-2 py-1 text-sm  hover:border-slate-400 border border-transparent'>
        Reply
      </button>

      <button
        onClick={() => {
          setShowRelpies(st => !st)
        }}
        className='text-sm text-blue-600 hover:underline'>
        {!showRelpies ? "view reply" : "hide reply"}
      </button>
    </div>

    {showInputModal && <CommentInputBox
      authorId={authorId}
      tweetId={tweetId}
      commentId={commentId}
      cookie={token}
      parentCommentId={commentId} />
    }


    {
      showRelpies && <ReplyBox
        cookie={token}
        tweetId={tweetId}
        commentId={commentId}
        parentCommentId={parentCommentId}
      />

    }

  </div>
}

const CommentItems = ({ data, token }: {
  data: CommentData, token: string;
}) => {
  return (

    <div className='ml-6 py-3 flex flex-col px-2 rounded-md w-[30vw] items-start justify-center'>
      <div className=' px-2 flex items-center justify-center'>
        <AuthorImage width={50} height={50} userId={data.userId} author={data.username} />
        <p className='text-slate-400 font-bold text-md p-2'>{data.username}</p>
        <SpentTimeComponent pgTime={data.createdAt} />
      </div>
      <CommentBody data={data} />

      <Footer
        tweetId={data.tweet_id}
        authorId={data.userId}
        token={token}
        parentCommentId={null}
        commentId={data.id}
      />
    </div>
  )
}

export default CommentItems
