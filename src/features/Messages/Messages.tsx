import { Grid } from "@mui/material";
import { MessageList } from "./components/MessageList";

interface MessagesProps {}

export const Messages = ({}: MessagesProps) => {
  return (
    <Grid container>
      <Grid item>
        <MessageList />
      </Grid>
    </Grid>
  );
};
