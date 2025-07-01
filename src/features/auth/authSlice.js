import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, checkUser, updateUser} from "./authAPI";

const initialState = {
  loggedInUser: null,
  error:null,
  status: "idle",
};


export const createUserAsync = createAsyncThunk(
  "auth/createUser",
  async (userData) => {
    const user = await createUser(userData);
    return user;
  }
);

export const checkUserAsync = createAsyncThunk(
  "auth/checkUser",
  async (loginInfo) => {
  const user = await checkUser(loginInfo);
  return user;
});

export const updateUserAsync = createAsyncThunk(
  "auth/updateUser",
  async (update) => {
    const user = await updateUser(update);
    return user;
  }
);


export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
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
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      });
  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;
export default userSlice.reducer;