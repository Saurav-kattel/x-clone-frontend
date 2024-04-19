import { backendUrl } from "@/lib/exportEnvs";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export type TweetImage = {
  image: string
}

export type TweetImgRes = {
  status: number;
  res: TweetImage;
}


const getTweetImage = createAsyncThunk("getTweetImage", async ({ imageId }: { imageId: string }) => {
  const image = await fetch(`${backendUrl}/api/v1/tweet/image?id=${imageId}`, {
    method: "GET",
  })

  return await image.json();
})

const initialState: {
  loading: boolean;
  error: any;
  image: TweetImgRes | undefined
} = {
  loading: false,
  error: undefined,
  image: undefined
}



const tweetImageSlice = createSlice({
  name: "tweetImageSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getTweetImage.fulfilled, (state, action) => {
        state.loading = false;
        state.error = undefined;
        state.image = action.payload;
      })
      .addCase(getTweetImage.pending, (state) => {
        state.loading = true;
        state.error = undefined;
        state.image = undefined;
      })
      .addCase(getTweetImage.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
        state.image = undefined;
      })
})

export default tweetImageSlice.reducer
export { getTweetImage }
