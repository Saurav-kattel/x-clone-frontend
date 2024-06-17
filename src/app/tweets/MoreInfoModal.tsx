"use client"
import { faTrash, faUserMinus, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { SetStateAction, useEffect, useState } from 'react'
import { deleteTweet } from './(ts)/deleteTweet';
import { Tweets } from '../actions/getTweetsData';
import { handleFollow } from './(ts)/handleFollow';
import { checkIsFollowing } from './(ts)/checkIsFollowing';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/app/store';
import { refreshTweets } from '../redux/features/tweetSlice';
import { deleteFromImageChache } from './filterCache';


const MoreInfoModal = ({ update, setShowModal, clicked, authorId, tweetId, userId, token, data }: {
  data: Tweets;
  clicked: boolean;
  update: VoidFunction;
  tweetId: string;
  token: string;
  authorId: string | undefined;
  userId: string | undefined;
  setShowModal: React.Dispatch<SetStateAction<boolean>>
}) => {
  const showDeleteOption = authorId === userId;
  const [followState, setFollowState] = useState<string>("");
  const [pending, setPending] = useState<boolean>(false)

  useEffect(() => {
    setPending(true)
    const timeOutId = setTimeout(() => {
      checkIsFollowing({ token, followeeId: data?.userId }).then((res) => {
        setFollowState(res.res)
        setPending(false)
      }).catch(err => {
        setPending(false)
        console.log(err)
      })
    }, 200)

    return () => {
      clearTimeout(timeOutId)
    }

  }, [clicked])


  function deleteClicked() {
    deleteTweet({ pId: tweetId })
    deleteFromImageChache({ imageId: data.imageId })
    dispatch(refreshTweets())
  }

  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <div className='flex flex-col w-[20vw] shadow shadow-green-300 bg-[#000]  absolute border-[0.4px] border-[#000010]  rounded-xl p-4 box-border'>
        <div className='hover:cursor-pointer'>
          <span onClick={() => setShowModal(state => !state)}>X</span>
        </div>
        <div className='shadow p-4 '>
          {showDeleteOption && <div onClick={deleteClicked} className='flex gap-2 px-4 py-1 rounded-md items-center hover:bg-gray-800 hover:cursor-pointer hover:scale-110 transition-transform '>
            <FontAwesomeIcon icon={faTrash} /> <span className='px-2 py-1 text-md rounded-lg text-white'>delete</span>
          </div>}

          {data?.userId != userId && <div>
            <div
              onClick={() => {
                handleFollow({ token, followeeId: data?.userId }).then(() => {
                  update();
                })
              }}
              className='text-white w-[10vw] p-2  hover:bg-[#000010] 
            hover:cursor-pointer font-bold flex justify-center rounded-md  items-center gap-2 text-md '>
              {followState ? <FontAwesomeIcon icon={faUserMinus} /> : <FontAwesomeIcon icon={faUserPlus} />}
              <span className=" px-2 py-1 font-semibold rounded-2xl">{pending ? "....." : followState ? "unfollow" : "follow"}</span>
            </div>

            <div >

            </div>
          </div>}

        </div>
      </div>

    </>)
}

export default MoreInfoModal
