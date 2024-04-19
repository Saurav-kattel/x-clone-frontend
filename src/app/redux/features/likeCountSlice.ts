import { backendUrl } from "@/lib/exportEnvs";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type TweetLike =
  | {
    status: number;
    res: number;
  }
  | undefined;

const initialState: {
  loading: boolean;
  error: any;
  res: TweetLike;
} = {
  loading: false,
  error: undefined,
  res: undefined,
};

const getTweetLike = createAsyncThunk(
  "getTweetLike",
  async ({ tweetId }: { tweetId: string }) => {

    const res = await fetch(backendUrl + "/api/v1/tweet/like/count?t_id=" + tweetId);
    return await res.json();
  }
);

const tweetLikeCountSlice = createSlice({
  name: "tweetLikeCountSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTweetLike.fulfilled, (state, action) => {
        state.loading = false;
        state.error = undefined;
        state.res = action.payload;
      })
      .addCase(getTweetLike.pending, (state) => {
        state.loading = true;
        state.error = undefined;
        state.res = undefined;
      })
      .addCase(getTweetLike.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
        state.res = undefined;
      });
  },
});

export { getTweetLike };
export default tweetLikeCountSlice.reducer;
