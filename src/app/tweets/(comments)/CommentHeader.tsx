"use client"

import AuthorImage from "../AuthorImage";
import SpentTimeComponent from "./SpentTimeComponent";
import SideModal from "./SideModal";
import { CommentData } from "../(ts)/getUserComments";

interface Params {
  cookie: string;
  data: CommentData;
  tweetOwnerID: string;
}
const CommentHeader = ({ data, cookie, tweetOwnerID }: Params) => {

  return <div className='flex gap-4 justify-center items-center'>
    <div className=' px-2 flex items-center justify-center'>
      <AuthorImage width={50} height={50} userId={data.userId} author={data.username} />
      <p className='text-slate-400 font-bold text-md p-2'>{data.username}</p>
      <SpentTimeComponent pgTime={data.createdAt} />
      <SideModal commenterId={data.userId} tweetOwnerId={tweetOwnerID} token={cookie} commentId={data.id} />
    </div>
  </div>
}


export default CommentHeader;
