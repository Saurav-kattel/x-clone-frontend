import SpentTimeComponent from "../tweets/(comments)/SpentTimeComponent";
import AuthorImage from "../tweets/AuthorImage";
import { NotificationData } from "./getNotifications";

const NotificationHeader = ({ data }: { data: NotificationData }) => {
  let authorFullName = data.recipient_first_name.concat(" ").concat(data.recipient_last_name)
  return <>
    <div className="flex gap-2 items-center p-2 w-[40dvw]">
      <AuthorImage link={true} width={50} height={50} userId={data.recipient_id} author={data.recipient_username} />
      <span className="text-xl text-slate-700 p-2 capitalize">{authorFullName}</span>
      <SpentTimeComponent pgTime={data.created_at.toString()} />
    </div>
  </>
}

export default NotificationHeader;
