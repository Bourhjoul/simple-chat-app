import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  activeUserId?: number;
  activeUserName?: string;
  users: {
    name: string;
    id: number;
  }[];
}

const initialState: UserState = {
  users: [],
};

export const loginSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.users.push({
        id: state.users.length + 1,
        name: action.payload,
      });
      state.activeUserId = state.users.length + 1;
      state.activeUserName = action.payload;
    },
  },
});

export const { login } = loginSlice.actions;

export default loginSlice.reducer;
