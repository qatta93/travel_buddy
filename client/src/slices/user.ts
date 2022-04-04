import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserInfo {
  id: number,
  username: string,
}
interface User {
  user: UserInfo | null,
}

const initialState: User = { user: null };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserInfo | null>) => ({
      ...state,
      user: action.payload,
    }),
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
