import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
const { REACT_APP_API_URL } = process.env;

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/api/login`,
        payload
      );
      localStorage.setItem('userToken', response.data.token);
      localStorage.setItem('userInfo', JSON.stringify(response.data.user));
      return response;
    } catch (e) {
      return rejectWithValue(e.response?.data?.error || e.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/api/register`,
        payload
      );
      localStorage.setItem('userToken', response.data.token);
      localStorage.setItem('userInfo', JSON.stringify(response.data.user));
      return response;
    } catch (e) {
      return rejectWithValue(e.response?.data?.error || e.message);
    }
  }
);
