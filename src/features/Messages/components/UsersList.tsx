import { Avatar, Grid } from "@mui/material";
import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { stringAvatar } from "../../../utils/AvatarGenerators";
import { updateActiveUserChat } from "../../Login/loginSlice";

export const UsersList = () => {
  const dispatch = useAppDispatch();

  const rawUsers = localStorage.getItem("Users") || "";

  const users = useMemo(() => JSON.parse(rawUsers) || "", [rawUsers]);
  const activeUser = useAppSelector((state) => state.users.activeUserId);
  return (
    <Grid container gap={1}>
      {users.map(
        (user: any) =>
          activeUser !== user.id && (
            <Grid
              sx={{
                cursor: "pointer",
              }}
              item
              key={user.id}
              onClick={() => {
                dispatch(updateActiveUserChat(user.id));
              }}
            >
              <Avatar {...stringAvatar(user.name)} />
              {user.name}
            </Grid>
          )
      )}
    </Grid>
  );
};
