import { cookies } from "next/headers";
import { getNotification } from "./getNotifications";
import NotificationItem from "./NotificationItem";

const page = async () => {
  const token = cookies().get("auth_token_x_clone")?.value ?? ""
  const data = await getNotification({ token })
  if (!data) {
    return <div className="flex items-center justify-center h-[100dvh] flex-col"> An unkown error occured!!</div>

  }
  return <div className="flex items-center justify-center flex-col w-[100vw] lg:w-auto">
    <h2 className="text-4xl uppercase text-slate-600 underline underline-offset-2 font-extrabold p-2">Notification</h2>
    {data.status === 200 && data.res && data.res.map((item) => <NotificationItem key={item.id} data={item} />)}
  </div>
}
export default page; 
