import { backendUrl } from "@/lib/exportEnvs";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type UserProfileImage =
  | {
    status: number;
    res: { image: string; id: string; message: string | undefined };
  }
  | undefined;

const initialState: {
  loading: boolean;
  error: any;
  res: UserProfileImage;
} = {
  loading: false,
  error: undefined,
  res: undefined,
};

const getProfileImage = createAsyncThunk(
  "getProfileImage",
  async ({ cookie }: { cookie: string }) => {
    const res = await fetch(backendUrl + "/api/v1/user/account/get-image", {
      credentials: "include",
      headers: {
        auth_token_x_clone: cookie,
      },
    });
    return await res.json();
  }
);

const profileImageSlice = createSlice({
  name: "profileImageSlice",
  initialState,
  reducers: {
    resetProfileImage: (state) => {
      state.res = undefined
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getProfileImage.fulfilled, (state, action) => {
        state.loading = false;
        state.error = undefined;
        state.res = action.payload;
      })
      .addCase(getProfileImage.pending, (state) => {
        state.loading = true;
        state.error = undefined;
        state.res = undefined;
      })
      .addCase(getProfileImage.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
        state.res = undefined;
      });
  },
});

export { getProfileImage };
export const { resetProfileImage } = profileImageSlice.actions
export default profileImageSlice.reducer;
