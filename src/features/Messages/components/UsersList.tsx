import { Avatar, Grid } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { stringAvatar } from "../../../utils/AvatarGenerators";
import { updateActiveUserChat } from "../../Login/loginSlice";

export const UsersList = () => {
  const dispatch = useAppDispatch();

  const [users, setUsers] = useState([]);

  const activeUser = useAppSelector((state) => state.users.activeUserId);

  const storageEventHandler = useCallback(() => {
    const rawUsers = localStorage.getItem("Users") || "";
    setUsers(JSON.parse(rawUsers || ""));
  }, []);
  useEffect(() => {
    storageEventHandler();
  }, [storageEventHandler]);

  useEffect(() => {
    window.addEventListener("storage", storageEventHandler, false);

    return () => {
      window.removeEventListener("storage", storageEventHandler);
    };
  }, [storageEventHandler]);

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
