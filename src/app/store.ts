import { configureStore } from '@reduxjs/toolkit';
import resumeReducer from '../features/resumeSlice';
// ...

export const store = configureStore({
  reducer: {
    resume: resumeReducer,
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
