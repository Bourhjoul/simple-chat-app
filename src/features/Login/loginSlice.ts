import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  activeUserId?: number;
  activeUserName?: string;
  activeUserChat?: number;
}

const initialState: UserState = {};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      const oldUsers = localStorage.getItem("Users")
        ? JSON.parse(localStorage.getItem("Users") || "")
        : [];

      state.activeUserId = oldUsers.length + 1;
      state.activeUserName = action.payload;
      if (oldUsers.length <= 0)
        localStorage.setItem(
          "Users",
          JSON.stringify([{ name: action.payload, id: 1 }])
        );
      else {
        const newUsers = [
          ...oldUsers,
          { name: action.payload, id: oldUsers.length + 1 },
        ];
        localStorage.setItem("Users", JSON.stringify(newUsers));
      }
    },
    updateActiveUserChat: (state, action: PayloadAction<number>) => {
      state.activeUserChat = action.payload;
    },
  },
});

export const { login, updateActiveUserChat } = loginSlice.actions;

export default loginSlice.reducer;
