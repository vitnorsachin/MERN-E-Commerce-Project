import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, checkUser, signOut } from "./authAPI";
// import { updateUser } from "../user/userAPI";

const initialState = {
  loggedInUser: null, // this should only contain user identity => "id", "role"
  error:null,
  status: "idle",
};


export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    const user = await createUser(userData);
    return user;
  }
);

export const checkUserAsync = createAsyncThunk(
  "user/checkUser",
  async (loginInfo) => {
  const user = await checkUser(loginInfo);
  return user;
});

// export const updateUserAsync = createAsyncThunk(
//   "user/updateUser",
//   async (update) => {
//     const user = await updateUser(update);
//     return user;
//   }
// );

export const signOutAsync = createAsyncThunk(
  "user/signOut",
  async () => {
  const user = await signOut();
  return user;
});


export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    // signOutP: (state) => {
    //   state.loggedInUser = null;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
        state.error = null;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
        state.loggedInUser = null;
      })
      // .addCase(updateUserAsync.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(updateUserAsync.fulfilled, (state, action) => {
      //   state.status = "idle";
      //   state.loggedInUser = action.payload;
      // })
      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = null;
      });
  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;
export default authSlice.reducer;
export const { signOutP } = authSlice.actions;