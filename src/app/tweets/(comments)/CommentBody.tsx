"use client"

import { useState } from "react";
import { CommentData } from "../(ts)/getUserComments";

function CommentBody({ data }: { data: CommentData }) {
  const [comment, setComment] = useState(() => {
    if (data.comment.length <= 100) {
      return data.comment;
    }
    return data.comment.slice(0, 100).concat("...")
  })

  const [readMoreStatus, setReadMoreStatus] = useState<string>("Read More")
  return (
    <div className='ml-8  text-sm py-0 '>
      <p>{comment}</p>
      {data.comment.length > 100 && <button
        onClick={() => {
          setReadMoreStatus((state) => {
            if (state === "Read More") {
              setComment(data.comment)
              return "Read Less"
            }
            setComment(data.comment.slice(0, 100).concat("..."))
            return "Read More"
          })
        }}
        className='text-blue-500  text-sm hover:underline '
      >{readMoreStatus}</button>}
    </div>
  )
}


export default CommentBody;
