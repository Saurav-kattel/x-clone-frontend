"use client";
import CommentInputBox from './CommentInputBox';
import React, { SetStateAction, useEffect, useState } from 'react';
import ExitButton from '../ExitButton';
import CommentItems from './CommentItems';
import { useInView } from 'react-intersection-observer';
import Spinner from '@/lib/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/app/store';
import { refreshFunc } from '@/app/redux/features/commentSlice';
import { fetchComments } from './fetchComments';
import { CommentResponseData } from '../(ts)/getUserComments';

const CommentBox = ({ cookie, setShowComment, tweetOwnerId, tweetId, visibility }: { visibility: "ALL" | "USER"; cookie: string; tweetId: string; setShowComment: React.Dispatch<SetStateAction<boolean>>; tweetOwnerId: string; }) => {
  const [data, setData] = useState<CommentResponseData['res']>([]);
  const { refresh } = useSelector((state: RootState) => state.comment);
  const [ref, inView] = useInView();
  const [shouldFetch, setShouldFetch] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const [pageNumber, setPageNumber] = useState(1)


  useEffect(() => {
    if (inView && shouldFetch) {
      fetchComments({ pageNumber: pageNumber, setPageNumber, tweetId, token: cookie, refresh, setData, setShouldFetch, visibility });
    }
  }, [shouldFetch, inView]);

  useEffect(() => {
    if (refresh) {
      setPageNumber(1)
      setShouldFetch(true);
      setTimeout(() => {
        fetchComments({ pageNumber: 1, tweetId, setPageNumber, token: cookie, refresh, setData, setShouldFetch, visibility })
          .then(() => dispatch(refreshFunc()));
      }, 100)
    }
  }, [refresh, dispatch, tweetId, cookie]);

  return (
    <div className='p-4 w-[38vw] shadow shadow-slate-800 flex flex-col items-start justify-center rounded-md'>
      <div className='flex items-center gap-4'>
        <ExitButton setShowComment={setShowComment} />
        <h3 className='flex p-2 font-bold text-2xl text-slate-600'>Comments</h3>
      </div>
      <div className='flex gap-2 flex-col'>
        <CommentInputBox commentId={null} tweetId={tweetId} cookie={cookie} />
        {data && data.map((comment) => (
          <CommentItems
            tweetOwnerId={tweetOwnerId}
            token={cookie}
            key={comment.id}
            data={comment}
          />
        ))
        }
      </div>
      <div className='flex items-center justify-center' ref={ref}>
        {shouldFetch && <Spinner />}
      </div>
    </div>
  );
};

export default CommentBox;
