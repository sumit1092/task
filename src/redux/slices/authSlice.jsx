import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import privateRequest from "../../api/axiosConfig/privateRequest.jsx";
import { LOGIN, LOGOUT } from "../../utility/apiEndpoint.jsx";
import {
  persistToken,
  clearToken,
  setUserData,
  clearUserData,
} from "../../utility/localStorageUtils.jsx";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await privateRequest.post(LOGIN, payload);

      if (!res.data.success || res.data.userDetail?.Status !== 200) {
        return rejectWithValue(
          res.data.userDetail?.Message || "Invalid credentials"
        );
      }

      const token = res.data.referralToken;
      if (!token) return rejectWithValue("No JWT returned from API");

      const user = res.data.userDetail?.data || null;

      persistToken(token);
      if (user) setUserData(user);

      return { token, user };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const logoutThunk = createAsyncThunk("auth/logout", async () => {
  try {
    await privateRequest.post(LOGOUT);
  } catch {}
  return true;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    user: JSON.parse(localStorage.getItem("userData")) || null,
  },
  reducers: {
    signOut: (s) => {
      s.token = null;
      s.user = null;
      clearToken();
      clearUserData();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user || null;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        clearToken();
        clearUserData();
      });
  },
});

export const { signOut } = authSlice.actions;
export default authSlice.reducer;
