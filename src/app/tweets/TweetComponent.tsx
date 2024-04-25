"use client"

import React, { useEffect, useState } from 'react'
import { Tweets } from '../redux/features/tweetsSlice'
import { getLikeCount } from './getLikeCount'
import { getLikedUsers } from './getLikedUser'
import { hasUserLiked } from './hasUserLiked'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/app/store'
import MoreInfoModal from './MoreInfoModal'
import HeaderSection from './HeaderSection'
import FooterSection from './FooterSection'
const TweetImage = React.lazy(() => import('./TweetImage'))

const TweetComponent = ({ data, token }: { data: Tweets, token: string }) => {
  const [likeState, setLikeState] = useState<boolean | undefined>(false);
  const [response, setResponse] = useState<{ status: number; res: number; }>()
  const { res: userData } = useSelector((state: RootState) => state.user)
  const [showModal, setShowModal] = useState<boolean>(false);
  const [clicked, setClicked] = useState(false)

  const update = () => {
    setClicked(state => !state)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const count = await getLikeCount(data.id);
        const users = await getLikedUsers({ tweetId: data.id, token });

        setResponse(count);
        setLikeState(hasUserLiked({ data: users?.res, userId: userData?.res.id }));
      }
      catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    setTimeout(() => {
      fetchData();
    }, 200)
  }, [likeState, clicked]);

  return (
    <div className='flex flex-col justify-center m-2 w-[58vw] relative rounded-md border-[0.2px] p-2 items-center '>

      <HeaderSection update={update} clicked={clicked} setClicked={setClicked} token={token} data={data} setShowModal={setShowModal} userId={userData?.res.id} />
      <div className='flex w-[58vw] justify-end items-center p-2 '>
        <MoreInfoModal
          token={token}
          tweetId={data.id}
          authorId={data.userId}
          userId={userData?.res.id}
          showModal={showModal}
          setShowModal={setShowModal} />
      </div>
      < div className='p-4 flex w-[58vw]  flex-col justify-center 1items-start text-wrap' >
        <p className='text-md text-start p-2'>
          {data.content}
        </p>
        <TweetImage imageId={data.imageId} />
      </div >
      <FooterSection response={response} tweetId={data.id} token={token} likeState={likeState} setLikeState={setLikeState} />
    </div >
  )
}

export default TweetComponent
