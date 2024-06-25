import getCookie from "../actions/getCookies";
import SearchComponent from "./SearchComponent";

export default function page() {
  const cookie = getCookie()
  return <div>

    <SearchComponent cookie={cookie} />
  </div>
}
