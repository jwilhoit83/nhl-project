import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import TextField from "@material-ui/core/TextField";

export default function Schedule() {
  const [schedule, setSchedule] = useState([]);
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [schedDate, setSchedDate] = useState(formatDate(setNewDate(Date.now())));
  const [displayDate, setDisplayDate] = useState(setNewDate(Date.now()));
  const classes = useStyles();

  const scheduleURL = `https://api.mysportsfeeds.com/v2.1/pull/nhl/current/date/${schedDate}/games.json`;
  const standingsURL = "https://api.mysportsfeeds.com/v2.1/pull/nhl/current/standings.json";

  const apiToken = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);

      const teamsRes = await axios.get(standingsURL, {
        headers: {
          Authorization: "Basic " + btoa(`${apiToken}:MYSPORTSFEEDS`),
        },
      });

      const schedRes = await axios.get(scheduleURL, {
        headers: {
          Authorization: "Basic " + btoa(`${apiToken}:MYSPORTSFEEDS`),
        },
      });

      setTeams(teamsRes.data.teams);
      setSchedule(schedRes.data.games);
      setIsLoading(false);
    };
    getData();
  }, [scheduleURL, apiToken]);

  let schedArr = schedule.slice().map((game) => {
    let homeIdx = teams.findIndex((team) => team.team.id === game.schedule.homeTeam.id);
    let awayIdx = teams.findIndex((team) => team.team.id === game.schedule.awayTeam.id);
    return {
      gameID: game.schedule.id,
      gameTime: new Date(game.schedule.startTime).toString().slice(0, 21),
      homeTeamCity: teams[homeIdx].team.city || "",
      homeTeamName: teams[homeIdx].team.name || "",
      homeLogo: teams[homeIdx].team.officialLogoImageSrc || "",
      homeScore: game.score.homeScoreTotal,
      homeShots: game.score.homeShotsTotal,
      awayTeamCity: teams[awayIdx].team.city || "",
      awayTeamName: teams[awayIdx].team.name || "",
      awayLogo: teams[awayIdx].team.officialLogoImageSrc || "",
      awayScore: game.score.awayScoreTotal,
      awayShots: game.score.awayShotsTotal,
      currentPeriod: game.score.currentPeriod,
      currentIntermission: game.score.currentIntermission,
      currentPeriodTimeRemaining: secondsConverter(game.score.currentPeriodSecondsRemaining),
      playedStatus: game.schedule.playedStatus,
      scheduleStatus: game.schedule.scheduleStatus,
      delayedOrPostponedReason: game.schedule.delayedOrPostponedReason,
    };
  });

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
            <Grid item xs container direction="column" spacing={2} alignContent="center" alignItems="center">
              <Grid item xs>
                <Typography variant="subtitle1">{new Date(game.gameTime).toDateString().slice(0, 10)}</Typography>
                {game.homeScore === null ? <Typography variant="subtitle1">{new Date(game.gameTime).toLocaleTimeString()}</Typography> : ""}
                {game.homeScore !== null ? <Typography variant="h6">{game.homeScore + " - " + game.awayScore}</Typography> : ""}
                {game.currentPeriod !== null && game.playedStatus.slice(0, 9) !== "COMPLETED" ? (
                  <>
                    <Typography variant="body2">{"Period: " + game.currentPeriod}</Typography>
                    <Typography variant="body2">{game.currentPeriodTimeRemaining}</Typography>
                  </>
                ) : (
                  ""
                )}
                {game.currentIntermission !== null && game.playedStatus.slice(0, 9) !== "COMPLETED" ? (
                  <Typography variant="body2">{"Intermission: " + game.currentIntermission}</Typography>
                ) : (
                  ""
                )}
                {game.playedStatus.slice(0, 9) === "COMPLETED" ? <Typography variant="h6">Final</Typography> : ""}
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
      {isLoading ? (
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

function secondsConverter(sec) {
  let minutes = Math.floor(Number(sec) / 60);
  let seconds = Number(sec) - minutes * 60;
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

function setNewDate(date) {
  const tzOffset = new Date().getTimezoneOffset() * 60000;

  return new Date(date - tzOffset).toISOString().slice(0, 10);
}

function formatDate(date) {
  return date.replace(/-/g, "");
}

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
