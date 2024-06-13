import { NotificationData } from "./getNotifications";

const NotificationBody = ({ data }: { data: NotificationData }) => {
  return <div className="w-[30dvw] flex justify-start items-center">
    <p className="text-md text-slate-300 ">{data.message}</p>
  </div>
}

export default NotificationBody;
