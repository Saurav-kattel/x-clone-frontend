"use client"
import CommentInputBox from './CommentInputBox'
import React, { SetStateAction, useEffect, useState } from 'react'
import ExitButton from '../ExitButton'
import { getUserComment, CommentResponseData } from '../(ts)/getUserComments';
import CommentItems from './CommentItems';
import { getAllComments } from '../(ts)/getAllComments';
import { useInView } from 'react-intersection-observer';
import Spinner from '@/lib/Spinner';

const CommentBox = ({ cookie, setShowComment, tweetId, visibility }: { visibility: "ALL" | "USER"; cookie: string; tweetId: string; setShowComment: React.Dispatch<SetStateAction<boolean>> }) => {

  const [data, setData] = useState<CommentResponseData['res']>([])
  const [showInputModal, setShowInputModal] = useState<boolean>(true)
  const [refresh, setRefresh] = useState(false)
  const [ref, inView] = useInView();
  const [shouldFetch, setShouldFetch] = useState(true)
  const [pageNumber, setPageNumber] = useState(1)

  async function fetchComments({ pageNumber, setPageNumber, tweetId, token }: { tweetId: string; token: string; pageNumber: number, setPageNumber: React.Dispatch<SetStateAction<number>> }) {
    try {
      if (visibility === "USER") {
        let res = await getUserComment({ tweetId, token: token, pageNumber: pageNumber, pageSize: 6 });
        if (!res?.res) {
          setShouldFetch(false);
          return;
        }

        setPageNumber((pn) => pn + 1);
        if (res.res && res.res.length < 6) {
          setShouldFetch(false);
        }
        setData((prev) => [...prev, ...res.res]);
      } else {
        let res = await getAllComments({ tweetId, pageNumber: pageNumber, pageSize: 6 });
        if (!res?.res) {
          setShouldFetch(false);
          return;
        }

        setData((prev) => [...prev, ...res.res]);
        if (res.res && res.res.length < 6) {
          setShouldFetch(false);
        }
        setPageNumber((pn) => pn + 1);
      }
    } catch (e: any) {
      console.error(e.message);
    }
  }
  useEffect(() => {
    if (inView && shouldFetch) {
      fetchComments({ pageNumber, setPageNumber, tweetId, token: cookie })
    }
  }, [refresh, inView])

  return (
    <div className='p-4 w-[38vw] shadow shadow-slate-800 flex flex-col items-start justify-center  rounded-md' >
      <div className='flex items-center gap-4'>
        <ExitButton setShowComment={setShowComment} />
        <h3 className='flex p-2 font-bold text-2xl text-slate-600'>Comments</h3>
      </div>
      <div className='flex gap-2 flex-col'>
        {data && data.map((comment) => <CommentItems setRefresh={setRefresh} showInputModal={showInputModal} setShowInputModal={setShowInputModal} token={cookie} key={comment.id} data={comment} />)}
        {showInputModal && <CommentInputBox setRefresh={setRefresh} commentId={null} tweetId={tweetId} cookie={cookie} />}
      </div>
      <div className='flex items-center justify-center' ref={ref}>
        {shouldFetch && <Spinner />}
      </div>
    </div>
  )
}

export default CommentBox
