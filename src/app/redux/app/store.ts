import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import profileImageSlice from "../features/profileImageSlice";
import tweetImageSlice from "../features/tweetImageSlice";
//import autorImageSlice from "../features/autorImageSlice";
import likeCountSlice from "../features/likeCountSlice";
import followerSlice from "../features/followerSlice";
import followeeSlice from "../features/followeeSlice";
import commentSlice from "../features/commentSlice";
import tweetSlice from "../features/tweetSlice";
import coverImageSlice from "../features/coverImageSlice";

export const store = configureStore({
  reducer: {
    tweets: tweetSlice,
    user: userSlice,
    profileImg: profileImageSlice,
    tweetImg: tweetImageSlice,
    likes: likeCountSlice,
    follower: followerSlice,
    following: followeeSlice,
    comment: commentSlice,
    cover: coverImageSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
