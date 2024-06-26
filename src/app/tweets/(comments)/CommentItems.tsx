import React from 'react'
import { CommentData } from '../(ts)/getUserComments';
import CommentFooter from './CommentFooter';
import CommentBody from './CommentBody';
import CommentHeader from './CommentHeader';

const CommentItems = ({ data, token, tweetOwnerId }: {
  data: CommentData, token: string; tweetOwnerId: string;
}) => {
  return (
    <div className='lg:ml-6 ml-3  py-3 flex transition-all duration-75 flex-col px-2 rounded-md lg:w-[30vw] w-[85vw] items-start justify-end'>
      <CommentHeader data={data} cookie={token} tweetOwnerID={tweetOwnerId} />
      <CommentBody data={data} />
      <CommentFooter
        tweetOwnerId={tweetOwnerId}
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
