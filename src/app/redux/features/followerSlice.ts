
import { backendUrl } from "@/lib/exportEnvs";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: { loading: boolean; error: any; res: any } = {
  loading: false,
  error: undefined,
  res: undefined,
};

const getFollowerData = createAsyncThunk(
  "getFollowers",
  async ({ cookie }: { cookie: string }) => {
    const res = await fetch(backendUrl + "/api/v1/user/followers", {
      method: "GET",
      headers: {
        auth_token_x_clone: cookie
      }
    })
    const data = await res.json()
    return data;
  }
);

const followerSlice = createSlice({
  name: "  followerSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getFollowerData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = undefined;
        state.res = action.payload;
      })
      .addCase(getFollowerData.pending, (state) => {
        state.loading = true;
        state.error = undefined;
        state.res = undefined;
      })
      .addCase(getFollowerData.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
        state.res = undefined;
      });
  },
});

export { getFollowerData };
export default followerSlice.reducer;
