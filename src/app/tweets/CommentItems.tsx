import React, { SetStateAction, useState } from 'react'
import { CommentData } from './getUserComments'
import AuthorImage from './AuthorImage'
import CommentInputBox from './CommentInputBox';
import ReplyBox from './ReplyBox';

type Params = {
  token: string;
  tweetId: string;
  parentCommentId: string | null
  showInputModal: boolean;
  setShowInputModal: React.Dispatch<SetStateAction<boolean>>
  setRefresh: React.Dispatch<SetStateAction<boolean>>
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
    <div className='ml-8 text-slate-400 text-md '>
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

function Footer({ tweetId, token, authorId, commentId, parentCommentId, showInputModal, setShowInputModal, setRefresh }: Params) {
  const [showReplyBox, setShowReplyBox] = useState(!showInputModal)
  const [showReplyData, setShowReplyData] = useState(false)
  return <div>
    <div className='flex justify-between items-center'>
      <button
        onClick={() => {
          setShowInputModal(st => !st)
          setRefresh((st => !st))
          setShowReplyBox((st) => !st)
        }}
        className='flex ml-4 rounded-md px-2 py-1 text-sm  hover:border-slate-400 border border-transparent'>Reply</button>
      <button
        onClick={() => {
          setShowReplyData(st => !st)
        }}
        className='text-sm text-blue-600 hover:underline'>view replies</button>
    </div>
    {showReplyData && <ReplyBox
      tweetId={tweetId}
      cookie={token}
      parentCommentId={parentCommentId}
      commentId={commentId}
    />}
    {showReplyBox && <CommentInputBox
      authorId={authorId}
      setRefresh={setRefresh}
      tweetId={tweetId}
      commentId={commentId}
      cookie={token}
      parentCommentId={parentCommentId} />}
  </div>
}

const CommentItems = ({ data, token, showInputModal, setShowInputModal, setRefresh }: {
  data: CommentData, token: string; showInputModal: boolean;
  setShowInputModal: React.Dispatch<SetStateAction<boolean>>
  setRefresh: React.Dispatch<SetStateAction<boolean>>

}) => {

  return (

    <div className='ml-6 flex flex-col shadow shadow-slate-800 p-2 rounded-md w-[30vw] items-start justify-center'>
      <div className='py-4 px-2 flex items-start justify-center'>
        <AuthorImage userId={data.userId} author='' />
        <p className='text-slate-400 font-bold text-xl p-2'>{data.username}</p>
      </div>

      <CommentBody data={data} />
      <Footer
        tweetId={data.tweet_id}
        authorId={data.userId}
        setRefresh={setRefresh}
        showInputModal={showInputModal}
        token={token}
        setShowInputModal={setShowInputModal}
        parentCommentId={data.id}
        commentId={data.id}
      />
    </div>
  )
}

export default CommentItems
