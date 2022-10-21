import { Button, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "./loginSlice";

interface LoginProps {}

export const Login = ({}: LoginProps) => {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = (data: { username: string }) => {
    dispatch(login(data.username));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography margin={5} variant="h4" fontWeight="600">
        To start please enter an username :{" "}
      </Typography>

      <TextField
        error={!!errors.username}
        sx={{
          width: "60%",
        }}
        id="outlined-basic"
        label="Username"
        variant="outlined"
        {...register("username", {
          required: {
            message: "username is required to start",
            value: true,
          },
        })}
        helperText={!!errors.username ? errors.username.message : ""}
      />
      <br />
      <Button
        variant="contained"
        sx={{
          width: "60%",
          marginTop: 2,
        }}
        type="submit"
      >
        Start
      </Button>
    </form>
  );
};
