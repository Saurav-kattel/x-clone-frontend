import React from 'react'
import { getAuthorImage } from './getAuthorImage';

const AuthorImage = async ({ userId, author }: { userId: string, author: string }) => {
  const image = await getAuthorImage({ userId });
  return (
    <>
      { /* Header users or author details*/}
      <div className='flex justify-start items-center p-2'>
        {!image && < div className="rounded-[50%] flex justify-center items-center text-center w-[50px] bg-gray-200 h-[50px]">
          <span className="text-4xl text-slate-600 font-bold ">
            {author.slice(0, 1).toUpperCase()}
          </span>
        </div>
        }

        {image?.status != 200 && <div className="rounded-[50%] flex justify-center items-center text-center w-[50px] bg-gray-200 h-[50px]">
          <span className="text-4xl text-slate-600 font-bold ">
            {author.slice(0, 1).toUpperCase()}
          </span>
        </div>
        }
        {image && image.status == 200 && <div className="flex items-center justify-start ">
          <img
            height={50}
            width={50}
            className="w-[50px] h-[50px] rounded-full bg-contain object-fit"
            src={`data:image/jpeg;base64,${image.res.image}`}
          />
        </div>
        }
      </div>
    </>
  )
}

export default AuthorImage
