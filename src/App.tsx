import { Grid, Paper } from "@mui/material";
import { Container } from "@mui/system";
import "./App.css";
import { Login } from "./features/Login/Login";
import { Messages } from "./features/Messages/Messages";
import { useAppSelector } from "./hooks/hooks";

function App() {
  const activeUser = useAppSelector((state) => state.users.activeUserId);
  return (
    <div className="App">
      <Grid container alignItems="center" height="100%" justifyContent="center">
        <Grid
          item
          component={Paper}
          sx={{
            width: "40%",
            padding: 5,
          }}
          elevation={2}
        >
          {!activeUser ? <Login /> : <Messages />}
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
