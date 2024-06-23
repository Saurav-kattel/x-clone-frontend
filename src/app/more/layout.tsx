import { ReactNode } from "react";
import MoreNavigation from "./MoreNavigation";

export default function MoreLayout({ children }: { children: ReactNode }) {
  return <div className="flex">
    <MoreNavigation />
    <div className="z-20 right-0 bg-[radial-gradient(#000010,#000008)] absolute h-[100%] overflow-scroll w-[55dvw]">{children}</div>
  </div>
}
