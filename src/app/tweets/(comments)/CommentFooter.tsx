"use client"

import { useState } from "react"
import CommentInputBox from "./CommentInputBox";
import ReplyBox from "../(reply)/ReplyBox";

type Params = {
  token: string;
  tweetId: string;
  parentCommentId: string | null;
  authorId: string;
  commentId: string;
  tweetOwnerId: string;
}


function CommentFooter({ tweetId, token, authorId, commentId, parentCommentId, tweetOwnerId }: Params) {
  const [showRelpies, setShowRelpies] = useState(false)
  const [showInputModal, setShowInputModal] = useState(false)
  return <div>
    <div className='flex justify-between  lg:w-[26dvw] w-[80vw] items-center'>
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
        className='text-sm text-blue-600 w-[80vw] hover:underline'>
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
        tweetOwnerId={tweetOwnerId}
        tweetId={tweetId}
        commentId={commentId}
        parentCommentId={parentCommentId}
      />

    }

  </div>
}


export default CommentFooter;
