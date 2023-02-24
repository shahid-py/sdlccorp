import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils";

// fetchAllUsers
export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async () => {
    const response = await axios.get(`${API_URL}/users`);
    return response.data.users;
  }
);

// user lookup
export const getUser = createAsyncThunk(
  "users/getUser",
  async ({ username }) => {
    const response = await axios.get(`${API_URL}/users/${username}`);

    return response.data.user;
  }
);



const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    fetchedUser: null,
    status: "idle",
    error: null,
  },
  reducers: {
    changeUserStatus: (state) => {
      state.status = "idle";
      state.users = [];
    }
  },
  extraReducers: {
    [fetchAllUsers.pending]: (state, action) => {
      state.status = "pending";
    },
    [fetchAllUsers.fulfilled]: (state, action) => {
      state.status = "success";
      state.users = state.users.concat(action.payload);
    },
    [fetchAllUsers.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [getUser.pending]: (state) => {
      state.status = "pending";
    },
    [getUser.fulfilled]: (state, action) => {
      state.status = "success";
      state.fetchedUser = action.payload;
    },
    [getUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    
    
   
  },
});

export const { changeUserStatus } = usersSlice.actions

export default usersSlice.reducer;

export const selectAllUsers = (state) => state.users.users;
export const selectUserStatus = (state) => state.users.status;
export const selectUserByUsername = (state, username) =>
  state.users.users.find((user) => user?.username === username);
export const selectFetchedUser = (state) => state.users.fetchedUser;