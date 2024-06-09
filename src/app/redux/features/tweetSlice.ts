import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  refresh: false
}

const tweetSlice = createSlice({
  name: "tweetSlice",
  initialState,
  reducers: {
    refreshTweets: (state) => {
      state.refresh = !state.refresh
    }
  }

})




export default tweetSlice.reducer
export const { refreshTweets } = tweetSlice.actions 
