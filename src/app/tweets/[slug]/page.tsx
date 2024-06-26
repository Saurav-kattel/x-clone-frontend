import { getTweetsData } from "@/app/actions/getTweetsData";
import React from "react";
import TweetHeader from "./TweetHeader";
import TweetBody from "./TweetBody";
import TweetFooter from "./TweetFooter";
import getCookie from "@/app/actions/getCookies";

const page = async ({ params }: { params: { slug: string } }) => {
  const cookie = getCookie();

  const data = await getTweetsData({
    pageNum: 1,
    pageSize: 1,
    tweetId: params.slug,
    token: cookie,
  });
  if (data?.res.message) {
    return <div>invalid tweet id provided</div>;
  }
  return (
    <div>
      <TweetHeader data={data} />
      <TweetBody data={data} />
      <TweetFooter
        tweetId={data.res.id}
        userId={data.res.userId}
        token={cookie}
      />
    </div>
  );
};

export default page;
