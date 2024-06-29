"use client"
import { IconDefinition, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";


function MoreItems({ item }: { item: { name: string; path: string; icon: IconDefinition } }) {
  const pathname = usePathname();
  return <Link href={item.path} className={`flex  font-semibold text-white text-xl py-2 justify-center items-center gap-4  ${pathname === item.path && "opacity-95 bg-gray-900"}`}>
    <FontAwesomeIcon icon={item.icon} />
    <span className="font-extrabold hidden lg:block" >{item.name}</span>
  </Link>
}

export default function MoreNavigation() {

  const items = [{
    name: "Account",
    path: "/more/account",
    icon: faUser
  }]


  return <div className="flex h-[100dvh] py-2 border-r-[1px] border-r-slate-700  w-[15vw] gap-2 flex-col ">
    <h2 className="font-bold text-3xl p-2  hidden lg:block text-white text-center">Settings</h2>
    {items.map((item) => <MoreItems key={item.name} item={item} />)}
  </div>

}
