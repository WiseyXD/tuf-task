import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { submissionApi } from "./api/submissionApi";
import currentCodeReducer from "./slices/currentCode";
import { judge0Api } from "./api/judge0api";

const store = configureStore({
    reducer: {
        currentCode: currentCodeReducer,
        [submissionApi.reducerPath]: submissionApi.reducer,
        [judge0Api.reducerPath]: judge0Api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            submissionApi.middleware,
            judge0Api.middleware
        ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
export { store };
