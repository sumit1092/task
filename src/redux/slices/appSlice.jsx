import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    loadingCount: 0,
    error: null,
  },
  reducers: {
    startLoading: (s) => { s.loadingCount += 1; },
    stopLoading: (s) => { s.loadingCount = Math.max(0, s.loadingCount - 1); },
    setGlobalError: (s, a) => { s.error = a.payload; },
    clearGlobalError: (s) => { s.error = null; },
  },
});

export const { startLoading, stopLoading, setGlobalError, clearGlobalError } = appSlice.actions;
export default appSlice.reducer;
