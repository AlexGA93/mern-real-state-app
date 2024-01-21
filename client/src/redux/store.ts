import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userSlice from './user/userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// combina all the reducers
 const rootReducer = combineReducers(
  {user: userSlice},
  );

// Once recuers are combined we can create the persisted reducer
const persistConfig = {
  key: 'root',
  storage,
  version: 1
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// create a redux store with our persistedReducer
export const store = configureStore({
  reducer: persistedReducer,
  // get the serializable check
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})

// export persisted redux store
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
