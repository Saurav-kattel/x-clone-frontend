import { backendUrl } from "@/lib/exportEnvs";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const getAuthorImage = createAsyncThunk("getAuthorImage", async ({ userId }: { userId: string }) => {

  const res = await fetch(`${backendUrl}/api/v1/tweet/author/image?userId=${userId}`);
  return await res.json();

})


type AuthorImage = {
  status: number;
  res: {
    image?: string;
    message?: string;
  }
}

const initialState: {
  loading: boolean;
  error: any;
  image: AuthorImage | undefined
} = {
  loading: false,
  error: undefined,
  image: undefined
}



const authorImageSlice = createSlice({
  name: "auhtorImageSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getAuthorImage.fulfilled, (state, action) => {
        state.loading = false;
        state.error = undefined;
        state.image = action.payload;
      })
      .addCase(getAuthorImage.pending, (state) => {
        state.loading = true;
        state.error = undefined;
        state.image = undefined;
      })
      .addCase(getAuthorImage.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
        state.image = undefined;
      })
})

export default authorImageSlice.reducer
export { getAuthorImage }
