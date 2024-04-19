import { backendUrl } from "@/lib/exportEnvs";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export type Tweets = {
  id: string;
  content: string;
  userId: string;
  imageId: string;
  createdAt: Date;
  author: string;
  updatedAt: Date;
}

export type TweetRes = {
  status: number;
  res: Tweets[];
}


const getTweets = createAsyncThunk("getTweets", async ({ pageNum, pageSize }: { pageNum: number; pageSize: number }) => {
  const tweets = await fetch(`${backendUrl}/api/v1/tweet/get?n=${pageNum}&s=${pageSize}`, {
    method: "GET",
    credentials: "include"
  })

  return await tweets.json();
})

const initialState: {
  loading: boolean;
  error: any;
  tweets: TweetRes | undefined
} = {
  loading: false,
  error: undefined,
  tweets: undefined
}



const tweetSlice = createSlice({
  name: "tweetSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getTweets.fulfilled, (state, action) => {
        state.loading = false;
        state.error = undefined;
        state.tweets = action.payload;
      })
      .addCase(getTweets.pending, (state) => {
        state.loading = true;
        state.error = undefined;
        state.tweets = undefined;
      })
      .addCase(getTweets.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
        state.tweets = undefined;
      })
})

export default tweetSlice.reducer
export { getTweets }
