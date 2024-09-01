import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser } from './authActions';

const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null;

const userInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  user: userInfo,
  error: null,
  token: userToken,
  isLoading: false,
  updated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userToken'); // deletes token from storage
      localStorage.removeItem('userInfo'); // deletes token from storage
      state.user = null;
      state.token = null;
      state.isLoading = false;
    },
    resetErrors: (state) => {
      state.error = null;
      state.isLoading = false;
      state.updated = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
        state.token = action.payload.data.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
        state.token = action.payload.data.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
// export actions
export const { logout, resetErrors } = authSlice.actions;
export default authSlice.reducer;
