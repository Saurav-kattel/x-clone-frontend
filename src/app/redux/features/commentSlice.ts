import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  refresh: false
}

const commentSlice = createSlice({
  name: "commentSlice",
  initialState,
  reducers: {
    refreshFunc: (state) => {
      state.refresh = !state.refresh
    }
  }

})




export default commentSlice.reducer
export const { refreshFunc } = commentSlice.actions 
