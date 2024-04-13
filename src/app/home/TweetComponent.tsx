import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const TweetComponent = () => {
  return (
    <div className='flex flex-col justify-center  w-[58vw] rounded-md border-[0.2px] p-2 items-center '>
      { /* Header users or author details*/}
      <div className='flex justify-start items-center p-2 w-[58vw]'>
        <span>
          <div className="rounded-[50%] flex justify-center items-center text-center w-[50px] bg-gray-200 h-[50px]">
            <span className="text-4xl text-slate-600 font-bold ">
              S
            </span>
          </div>

        </span>
        <span className='text-white font-bold text-md px-2 py-1'>
          Saurav kattel
        </span>
      </div>

      { /* Image and text content */}
      <div className='p-4 flex w-[58vw]  flex-col justify-center items-start text-wrap'>
        <div>
          <p className='text-md text-start'>
            Test 3
          </p>
        </div>

        <div>
          <img alt='tweet image' />
        </div>
      </div>

      { /* footers */}
      <div className='flex gap-2 w-[58vw] border-t-[1px] border-t-slate-700 justify-between items-center'>
        <div className='p-2 text-2xl'>
          <FontAwesomeIcon icon={faHeart} />
        </div>
        <div className='p-2 text-2xl'>
          <FontAwesomeIcon icon={faHeart} />
        </div>
        <div className='p-2 text-2xl'>
          <FontAwesomeIcon icon={faHeart} />
        </div>
      </div>
    </div>
  )
}

export default TweetComponent
