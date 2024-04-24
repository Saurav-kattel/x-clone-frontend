"use client"
import { faEllipsisV, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Tweets } from '../redux/features/tweetsSlice'
import { handleLike } from './handleLike'
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
  }, [likeState]);

  return (
    <div className='flex flex-col justify-center m-2 w-[58vw] relative rounded-md border-[0.2px] p-2 items-center '>

      <HeaderSection data={data} setShowModal={setShowModal} />
      <div className='flex w-[58vw] justify-end items-center p-2 '>
        <MoreInfoModal showModal={showModal} setShowModal={setShowModal} />
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
