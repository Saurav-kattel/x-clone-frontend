"use client"
import { faTrash, faUserMinus, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { SetStateAction, useEffect, useMemo, useState } from 'react'
import { deleteTweet } from './(ts)/deleteTweet';
import { Tweets } from '../actions/getTweetsData';
import { handleFollow } from './(ts)/handleFollow';
import { checkIsFollowing } from './(ts)/checkIsFollowing';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/app/store';
import { refreshTweets } from '../redux/features/tweetSlice';
import { deleteFromImageChache } from './filterCache';
import { updatePostVis } from './updatePostVis';


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
  const dispatch = useDispatch<AppDispatch>();

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


  const visOptions = useMemo(() => ["public", "private", "followers"].filter((item) => item != data.visibility), [data.visibility])
  function handleVisChange({ vis }: { vis: string }) {
    updatePostVis({ tweet_id: data.id, cookie: token, vis: vis })
  }
  return (
    <>
      <div className='flex flex-col w-[20vw] shadow shadow-green-300 bg-[#000]  absolute border-[0.4px] border-[#000010]  rounded-xl p-4 box-border'>
        <div className='hover:cursor-pointer'>
          <span onClick={() => setShowModal(state => !state)}>X</span>
        </div>
        <div className='shadow p-4 flex flex-col flex-shrink justify-center items-center gap-2'>
          {showDeleteOption ? <div className='flex justify-center items-center flex-col'>
            <div onClick={deleteClicked}
              className='flex gap-2 px-4 py-1 justify-center  rounded-md border border-transparent items-center hover:border-red-600 hover:cursor-pointer hover:scale-110 transition-transform '>
              <FontAwesomeIcon className='text-red-500' icon={faTrash} /> <span className='px-2 py-1 text-md font-semibold text-red-500 rounded-lg '>delete</span>
            </div>
            <div className='border-[1px] border-slate-950 p-2 rounded-md hover:bg-[#000010]'>
              <h2 className='text-md text-slate-700 p-1 text-center font-semibold'>Change Post Visbility</h2>
              <div className='flex justify-center items-center flex-col gap-2'>
                {visOptions.map((item) => <span
                  onClick={() => handleVisChange({ vis: item })}
                  className='p-2 cursor-pointer border border-transparent hover:border-slate-600 hover:text-white text-slate-400 font-semibold rounded-lg text-md' key={item}>{item}</span>)}
              </div>
            </div>
          </div>
            : null}

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


          </div>}

        </div>
      </div>

    </>)
}

export default MoreInfoModal
