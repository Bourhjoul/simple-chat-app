import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface message {
  text: string;
  id: number;
}

export interface MessagesState {
  messages: message[];
}

const initialState: MessagesState = {
  messages: [],
};

interface messageToSend {
  senderId: number;
  text: string;
  receiverId: number;
}

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    sendMessage: (state, action: PayloadAction<messageToSend>) => {},
  },
});

export const { sendMessage } = messagesSlice.actions;
