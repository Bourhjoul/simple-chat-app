import SendIcon from "@mui/icons-material/Send";
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { sendMessage } from "../MessagesSlice";

export const MessageList = () => {
  const activeUserChat = useAppSelector((state) => state.users.activeUserChat);
  const activeUserId = useAppSelector((state) => state.users.activeUserId);
  const messages = useAppSelector((state) => state.messages.messages);

  const messagesRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();
  const [currentMessages, setCurrentMessages] = useState<any[]>([]);
  const [currentSize, setCurrentSize] = useState<number>(8);
  const [loading, setLoading] = useState<boolean>(false);
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

  const rawUsers = localStorage.getItem("Users") || "";

  const users = useMemo(() => JSON.parse(rawUsers) || "", [rawUsers]);

  useEffect(() => {
    const newCurrentMessages = messages
      .filter(
        (msg) =>
          (msg.senderId === activeUserId &&
            msg.receiverId === activeUserChat) ||
          (msg.receiverId === activeUserId && msg.senderId === activeUserChat)
      )
      .slice(currentSize, messages.length - 1);
    setCurrentMessages(newCurrentMessages);
  }, [messages, activeUserChat, activeUserId, currentSize]);

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
    setTimeout(() => {
      messagesRef.current?.scrollIntoView({
        block: "end",
        behavior: "smooth",
      });
    }, 100);
  };

  const onScroll = async (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const element = e.currentTarget;
    if (element.scrollTop === 0) {
      const newSize = currentSize - 4 < 0 ? 0 : currentSize - 4;
      const newCurrentMessages = messages
        .filter(
          (msg) =>
            (msg.senderId === activeUserId &&
              msg.receiverId === activeUserChat) ||
            (msg.receiverId === activeUserId && msg.senderId === activeUserChat)
        )
        .slice(newSize, messages.length - 1);
      setLoading(true);
      setTimeout(() => {
        setCurrentMessages(newCurrentMessages);
        setCurrentSize(newSize);
        setLoading(false);
      }, 1000);
    }
  };
  return activeUserChat ? (
    <>
      <Box maxHeight="400px" onScroll={onScroll} overflow="auto" padding={1}>
        {loading && <LinearProgress />}{" "}
        {currentMessages.length <= 0 && (
          <Typography marginTop={5}>
            No Messages yet between you the person selected.
          </Typography>
        )}
        {currentMessages.map((msg) => (
          <Grid container alignItems="flex-end" gap={1}>
            {msg.senderId !== activeUserId && <Grid item component={Avatar} />}
            <Grid
              marginTop={1.3}
              item
              marginLeft={msg.senderId === activeUserId ? "auto" : ""}
            >
              <Typography
                fontSize="8px"
                textAlign={msg.senderId === activeUserId ? "right" : "left"}
              >
                {msg.senderId === activeUserId
                  ? "you"
                  : users.find((user: any) => user.id === activeUserChat).name}
              </Typography>
              <Box
                sx={{
                  background:
                    msg.senderId === activeUserId ? "#a51ab7" : "#8a8a8a",
                  color: "white",
                }}
                borderRadius={1.5}
                width="fit-content"
                padding={1.5}
              >
                {msg.text}
              </Box>
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
