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

const getCoverImage = createAsyncThunk(
  "getCoverImage",
  async ({ username }: { username: string }) => {
    const res = await fetch(backendUrl + "/api/v1/user/cover/image/get?u_name=" + username, {
      credentials: "include",
    });

    let data = await res.json();
    return data;
  }
);

const coverImageSlice = createSlice({
  name: "coverImageSlice",
  initialState,
  reducers: {
    resetCoverImage: (state) => {
      state.res = undefined
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getCoverImage.fulfilled, (state, action) => {
        state.loading = false;
        state.error = undefined;
        state.res = action.payload;
      })
      .addCase(getCoverImage.pending, (state) => {
        state.loading = true;
        state.error = undefined;
        state.res = undefined;
      })
      .addCase(getCoverImage.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
        state.res = undefined;
      });
  },
});

export { getCoverImage };
export const { resetCoverImage } = coverImageSlice.actions
export default coverImageSlice.reducer;
