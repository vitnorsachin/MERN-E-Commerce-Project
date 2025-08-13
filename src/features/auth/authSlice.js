import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, loginUser, checkAuth, signOut } from "./authAPI";

const initialState = {
  loggedInUserToken: null, // this should only contain user identity => "id", "role"  
  error:null,
  status: "idle",
  userChecked: false,
};


export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    const user = await createUser(userData);
    return user;
  }
);


export const loginUserAsync = createAsyncThunk(
  "user/loginUser",
  async (loginInfo) => {
  const user = await loginUser(loginInfo);
  return user;
});


export const checkAuthAsync = createAsyncThunk("user/checkAuth",async () => {
  try {    
    const user = await checkAuth();
    return user;
  } catch (error) {
    console.log(error)
  }
});


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
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
        state.error = null;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
        // state.loggedInUserToken = null;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = null;
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
        state.userChecked = true;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = "idle";
        state.userChecked = true;
      });
  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error;
export const selectUserChecked = (state) => state.auth.userChecked;
export default authSlice.reducer;
export const { signOutP } = authSlice.actions;