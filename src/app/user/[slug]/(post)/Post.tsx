"use client"
import React, { useEffect, useState } from 'react'
import { getUserPost } from './getUserPost'
import TweetComponent from '@/app/tweets/TweetComponent';
import type { TweetRes } from '@/app/actions/getTweetsData';

const Post = ({ username, cookie }: { cookie: string; username: string }) => {
  const [data, setData] = useState < TweetRes > ();
  useEffect(() => {
    getUserPost({ username, pageNumber: 1, pageSize: 8, cookie }).then((res) => {
      setData(res)
    })
  }, [])
  return (
    <div>
      {data && data.res && data.res.map((item) => <TweetComponent token={cookie} data={item} />)}
    </div>
  )
}

export default Post
