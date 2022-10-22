import {
  Button,
  IconButton,
  TextField,
  Box,
  Avatar,
  Grid,
} from "@mui/material";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { sendMessage } from "../MessagesSlice";
import SendIcon from "@mui/icons-material/Send";

interface MessageListProps {}

export const MessageList = ({}: MessageListProps) => {
  const activeUserChat = useAppSelector((state) => state.users.activeUserChat);
  const activeUserId = useAppSelector((state) => state.users.activeUserId);
  const messages = useAppSelector((state) => state.messages.messages);

  const messagesRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();
  const [currentMessages, setCurrentMessages] = useState<any[]>([]);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      message: "",
    },
  });

  useEffect(() => {
    const newCurrentMessages = messages
      .filter(
        (msg) =>
          (msg.senderId === activeUserId &&
            msg.receiverId === activeUserChat) ||
          (msg.receiverId === activeUserId && msg.senderId === activeUserChat)
      )
      .slice(0, 10);
    setCurrentMessages(newCurrentMessages);
  }, [messages, activeUserChat, activeUserId]);

  const submitMessage = async (data: { message: string }) => {
    if (activeUserChat && activeUserId)
      await dispatch(
        sendMessage({
          receiverId: activeUserChat,
          senderId: activeUserId,
          text: data.message,
        })
      );
    reset();
    messagesRef.current?.scrollIntoView();
  };

  //   const onScroll =async (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
  //     const element = e.currentTarget;
  //     if (element.scrollTop === 0) {
  // const newCurrentMessages = messages
  //   .filter(
  //     (msg) =>
  //       (msg.senderId === activeUserId && msg.receiverId === activeUserChat) ||
  //       (msg.receiverId === activeUserId && msg.senderId === activeUserChat)
  //   )
  //   .slice(0, 10);
  //       await  setTimeout(() => {
  //          setCurrentMessages();
  //        }, 1000);
  //     }
  //   };
  return activeUserChat ? (
    <>
      <Box maxHeight="400px" onScroll={(e) => {}} overflow="auto">
        {currentMessages.map((msg) => (
          <Grid container alignItems="flex-end" gap={1}>
            {msg.senderId !== activeUserId && <Grid item component={Avatar} />}
            <Grid
              item
              sx={{
                background:
                  msg.senderId === activeUserId ? "#a51ab7" : "#8a8a8a",
                color: "white",
              }}
              borderRadius={1.5}
              width="fit-content"
              padding={1.5}
              marginLeft={msg.senderId === activeUserId ? "auto" : ""}
              marginTop={1.3}
            >
              {msg.text}
            </Grid>
            {msg.senderId === activeUserId && <Grid item component={Avatar} />}
          </Grid>
        ))}
        <div style={{ float: "left", clear: "both" }} ref={messagesRef} />
      </Box>
      <Box
        marginTop={5}
        component="form"
        onSubmit={handleSubmit(submitMessage)}
        width="100%"
      >
        <TextField
          error={!!errors.message}
          sx={{
            width: "80%",
          }}
          id="outlined-basic"
          label="Write your message here"
          variant="outlined"
          {...register("message", {
            required: {
              message: "message is required to send",
              value: true,
            },
          })}
          helperText={!!errors.message ? errors.message.message : ""}
        />{" "}
        <IconButton
          color="primary"
          component="button"
          disabled={!!errors.message}
          type="submit"
        >
          <SendIcon />
        </IconButton>
      </Box>
    </>
  ) : (
    <>No Conversation Selected yet!</>
  );
};
