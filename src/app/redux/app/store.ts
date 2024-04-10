import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import profileImageSlice from "../features/profileImageSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    profileImg: profileImageSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
