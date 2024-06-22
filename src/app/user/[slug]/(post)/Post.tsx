"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { getUserPost } from './getUserPost'
import TweetComponent from '@/app/tweets/TweetComponent';
import type { TweetRes, Tweets } from '@/app/actions/getTweetsData';
import { useInView } from 'react-intersection-observer';
import Spinner from '@/lib/Spinner';
import { VisType } from '@/app/home/Header';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/app/store';
import { refreshTweets } from '@/app/redux/features/tweetSlice';




const Post = ({ username, cookie }: { cookie: string; username: string }) => {

  const [data, setData] = useState<TweetRes["res"]>([]);
  const [shouldFetchTweets, setShouldFetchTweets] = useState(true)
  const [pageNumber, setPageNumber] = useState(0)
  const [selectedVis, setSelectedVis] = useState<VisType>("public")
  const [prevSelectedVis, setPrevSelectedVis] = useState<VisType>("public")
  const { inView, ref } = useInView();
  const { res: userData } = useSelector((state: RootState) => state.user)
  const loggedInUser = username === userData?.res.username;
  const { refresh } = useSelector((state: RootState) => state.tweets)


  const dispatch = useDispatch<AppDispatch>()

  const loadMore = useCallback(async () => {
    if (!shouldFetchTweets) return;
    const nextPage = pageNumber + 1;
    const newTweets = await getUserPost({ pageSize: 8, pageNumber: nextPage, vis: selectedVis, username, cookie: cookie });

    if (newTweets?.res) {
      setData((currentData) => [...currentData, ...newTweets.res])
      setPageNumber(nextPage);
    }

    if (newTweets?.res.length != 0 && newTweets?.res && newTweets.res.length % 8 === 0) {
      setShouldFetchTweets(true)
    } else {
      setShouldFetchTweets(false)
    }

  }, [pageNumber, shouldFetchTweets])



  useEffect(() => {
    if ((inView && shouldFetchTweets) || (selectedVis !== prevSelectedVis)) {
      if (selectedVis !== prevSelectedVis) {
        setData([])
        setPageNumber(0)
        setShouldFetchTweets(true)
        setPrevSelectedVis(selectedVis)
        loadMore()
      }
      else {
        loadMore()
      }
    }
  }, [inView, shouldFetchTweets, selectedVis])

  useEffect(() => {
    if (refresh) {
      setData([])
      setShouldFetchTweets(true)
      setPageNumber(0)
      loadMore()
      dispatch(refreshTweets())
    }
  }, [refresh])

  const PostNavItem = [{ name: "Public" }, { name: "Private" }, { name: "Followers" }]

  return (
    <div>
      {loggedInUser && <nav className='px-2 py-4'>
        <ul className='flex items-center uppercase text-md text-slate-600 font-semibold justify-between'>
          {PostNavItem.map((item) => <li key={item.name}
            className={`cursor-pointer transition-all hover:text-white underline-offset-1 ${selectedVis === item.name.toLowerCase() && "text-white"} hover:underline`}
            onClick={() => {
              setPrevSelectedVis(selectedVis)
              setSelectedVis(item.name.toLowerCase() as VisType)
            }
            }>{item.name}</li>)}
        </ul>
      </nav>
      }
      {data && data.map((item) => <TweetComponent token={cookie} data={item} key={item.id} />)}
      <div ref={ref} className='flex items-center justify-center'>
        {shouldFetchTweets && <Spinner />}
      </div>
    </div >
  )
}

export default Post
