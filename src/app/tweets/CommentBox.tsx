
import CommentInputBox from './CommentInputBox'
import React, { SetStateAction, useEffect, useState } from 'react'
import ExitButton from './ExitButton'
import { getUserComment, ResponseData } from './getUserComments';
import CommentItems from './CommentItems';

const CommentBox = ({ cookie, setShowComment, tweetId }: { cookie: string; tweetId: string; setShowComment: React.Dispatch<SetStateAction<boolean>> }) => {

  const [data, setData] = useState < ResponseData > ()
  const [showInputModal, setShowInputModal] = useState < boolean > (true)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      getUserComment({ tweetId, token: cookie, pageNumber: 1, pageSize: 6 })
        .then((res) => {
          setData(res)
        })
        .catch((err) => {
          console.log(err)
        })
    }, 200)
  }, [refresh])

  return (
    <div className='p-4 w-[38vw] shadow shadow-slate-800 flex flex-col items-start justify-center  rounded-md' >
      <ExitButton setShowComment={setShowComment} />
      {data && data.res?.map((comment) => <CommentItems setRefresh={setRefresh} showInputModal={showInputModal} setShowInputModal={setShowInputModal} token={cookie} key={comment.id} data={comment} />)}
      {showInputModal && <CommentInputBox setRefresh={setRefresh} tweetId={tweetId} cookie={cookie} />}
    </div>
  )
}

export default CommentBox
