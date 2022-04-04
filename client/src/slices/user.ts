import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoggedInUser } from '../types';

interface User {
  user: LoggedInUser,
}

const initialState: User = { user: null };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<LoggedInUser>) => ({
      ...state,
      user: action.payload,
    }),
    logoutUser: (state) => ({
      ...state,
      user: null,
    }),
  },
});

export const { addUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
