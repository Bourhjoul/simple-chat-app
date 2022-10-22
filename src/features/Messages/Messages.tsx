import { Grid } from "@mui/material";
import { MessageList } from "./components/MessageList";
import { UsersList } from "./components/UsersList";

interface MessagesProps {}

export const Messages = ({}: MessagesProps) => {
  return (
    <>
      <UsersList />

      <Grid container>
        <Grid item width="100%">
          <MessageList />
        </Grid>
      </Grid>
    </>
  );
};
