import { backendUrl } from "@/lib/exportEnvs";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: {
  loading: boolean; error: any; res: {
    status: number;
    res: {
      user_id: string,
      username: string
    }[]
  } | undefined
}
  = {
  loading: false,
  error: undefined,
  res: undefined,
};

const getFolloweeData = createAsyncThunk(
  "getFollowing", // wasted 2 hour just because this argument was getFollowers 

  async ({ username }: { username: string; }) => {
    console.log(username)
    const res = await fetch(backendUrl + "/api/v1/user/following?u_name=" + username)
    const data = await res.json()
    return data;
  }
);
const followeeSlice = createSlice({
  name: "followeeSlice",
  initialState,
  reducers: {
    clear: (state) => {
      state.res = undefined
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getFolloweeData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = undefined;
        state.res = action.payload;
      })
      .addCase(getFolloweeData.pending, (state) => {
        state.loading = true;
        state.error = undefined;
        state.res = undefined;
      })
      .addCase(getFolloweeData.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
        state.res = undefined;
      });
  },
});

export { getFolloweeData };
export const { clear } = followeeSlice.actions
export default followeeSlice.reducer;
