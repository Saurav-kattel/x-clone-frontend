import { UserDataRes } from "@/app/user/profile/general/ProfileComponent";
import { backendUrl } from "@/lib/exportEnvs";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: { loading: boolean; error: any; res: UserDataRes } = {
  loading: false,
  error: undefined,
  res: undefined,
};

const getUserData = createAsyncThunk(
  "getUserData",
  async ({ cookie }: { cookie: string }) => {
    const data = await fetch(backendUrl + "/api/v1/user/get", {
      method: "GET",
      headers: {
        auth_token_x_clone: cookie,
      },
    });
    return await data.json();
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    clear: (state) => {
      state.res = undefined
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = undefined;
        state.res = action.payload;
      })
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
        state.error = undefined;
        state.res = undefined;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
        state.res = undefined;
      });
  },
});

export { getUserData };
export const { clear } = userSlice.actions
export default userSlice.reducer;
