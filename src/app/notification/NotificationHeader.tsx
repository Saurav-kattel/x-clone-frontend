import SpentTimeComponent from "../tweets/(comments)/SpentTimeComponent";
import AuthorImage from "../tweets/AuthorImage";
import { NotificationData } from "./getNotifications";

const NotificationHeader = ({ data }: { data: NotificationData }) => {
  let authorFullName = data.recipient_id ? data.recipient_first_name.concat(" ").concat(data.recipient_last_name) : null
  return <>
    <div className="flex gap-2 items-center py-2 px-4 lg:w-[40dvw] w-[90dvw]">
      {data.recipient_id && <AuthorImage link={true} width={50} height={50} userId={data.recipient_id} author={data.recipient_username} />}
      {data.type === "login" && <AuthorImage link={false} userId="" author="" width={50} height={50} />}
      <span className="lg:text-xl text-md text-slate-700 p-2 capitalize">{authorFullName}</span>
      <SpentTimeComponent pgTime={data.created_at.toString()} />
    </div>
  </>
}

export default NotificationHeader;
