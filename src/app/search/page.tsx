import getCookie from "../actions/getCookies";
import SearchComponent from "./SearchComponent";

export default function page() {
  const cookie = getCookie()
  return <div className="lg:h-auto h-[90dvh] overflow-scroll lg:overflow-auto">

    <SearchComponent cookie={cookie} />
  </div>
}
