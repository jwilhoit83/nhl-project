import { useState, useEffect, useContext } from "react";
import HockeyContext from "../context/hockey/hockeyContext";
import { scheduleMap, setNewDate, formatDate } from "../utils/schedule";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import TextField from "@material-ui/core/TextField";

export default function Schedule() {
  const [schedDate, setSchedDate] = useState(formatDate(setNewDate(Date.now())));
  const [displayDate, setDisplayDate] = useState(setNewDate(Date.now()));

  const hockeyContext = useContext(HockeyContext);
  const { schedule, teams, loading, setSchedule, setTeams } = hockeyContext;

  useEffect(() => {
    setSchedule(schedDate);
    setTeams();
    // eslint-disable-next-line
  }, [schedDate]);

  const schedArr = scheduleMap(schedule, teams);

  const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%",
    },
    paper: {
      padding: 5,
      margin: "auto",
      maxWidth: 500,
      marginBottom: 10,
      textAlign: "center",
      color: "#eeeeee",
      fontWeight: 600,
    },
  }));

  const classes = useStyles();

  const gamesList = schedArr.map((game) => (
    <div key={game.gameID}>
      <Paper className={classes.paper}>
        <Grid container alignItems="center" justify="center" spacing={1}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt={game.homeTeamName + " Logo"} src={game.homeLogo} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container alignContent="center" alignItems="center">
            <Grid
              item
              xs
              container
              direction="column"
              spacing={2}
              alignContent="center"
              alignItems="center">
              <Grid item xs>
                <Typography variant="subtitle1">
                  {new Date(game.gameTime).toDateString().slice(0, 10)}
                </Typography>
                {game.homeScore === null ? (
                  <Typography variant="subtitle1">
                    {new Date(game.gameTime).toLocaleTimeString()}
                  </Typography>
                ) : (
                  ""
                )}
                {game.homeScore !== null ? (
                  <Typography variant="h6">{game.homeScore + " - " + game.awayScore}</Typography>
                ) : (
                  ""
                )}
                {game.currentPeriod !== null && game.playedStatus.slice(0, 9) !== "COMPLETED" ? (
                  <>
                    <Typography variant="body2">{"Period: " + game.currentPeriod}</Typography>
                    <Typography variant="body2">{game.currentPeriodTimeRemaining}</Typography>
                  </>
                ) : (
                  ""
                )}
                {game.currentIntermission !== null &&
                game.playedStatus.slice(0, 9) !== "COMPLETED" ? (
                  <Typography variant="body2">
                    {"Intermission: " + game.currentIntermission}
                  </Typography>
                ) : (
                  ""
                )}
                {game.playedStatus.slice(0, 9) === "COMPLETED" ? (
                  <Typography variant="h6">Final</Typography>
                ) : (
                  ""
                )}
                {game.scheduleStatus === "POSTPONED" ? (
                  <>
                    <Typography variant="body2">{game.scheduleStatus}</Typography>
                    <Typography variant="body2">{game.delayedOrPostponedReason}</Typography>
                  </>
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt={game.awayTeamName + " Logo"} src={game.awayLogo} />
            </ButtonBase>
          </Grid>
        </Grid>
      </Paper>
    </div>
  ));

  return (
    <Container>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <>
          <Paper className={classes.paper}>
            <form noValidate>
              <TextField
                color="secondary"
                id="date"
                type="date"
                value={displayDate}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  setDisplayDate(e.target.value);
                  setSchedDate(formatDate(e.target.value));
                }}
              />
            </form>
          </Paper>
          {gamesList}
        </>
      )}
    </Container>
  );
}
