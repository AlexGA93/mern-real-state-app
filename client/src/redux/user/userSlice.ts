import { createSlice } from "@reduxjs/toolkit";
import { UserStoreType } from "../../types/types";

const initialState: UserStoreType = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      // when user signs in loading starts
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      //  when proccess has finished successfully...
      state.currentUser = action.payload; // ... update state user info
      state.loading = false; // ... stop loading process
      state.error = null; // ...no error
    },
    signInFailure: (state, action) => {
      // when proccess has an error ...
      state.error = action.payload; // ...update error state
      state.loading = false; // ... stop loading process
    },
    //  UPDATE
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      //  when proccess has finished successfully...
      state.currentUser = action.payload; // ... update state user info
      state.loading = false; // ... stop loading process
      state.error = null; // ...no error
    },
    updateUserFailure: (state, action) => {
      // when proccess has an error ...
      state.error = action.payload; // ...update error state
      state.loading = false; // ... stop loading process
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} = userSlice.actions;
export default userSlice.reducer;
