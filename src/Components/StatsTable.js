import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import PositionTabs from "./PositionTabs";
import Container from "@material-ui/core/Container";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import CircularProgress from "@material-ui/core/CircularProgress";
import Hidden from "@material-ui/core/Hidden";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function StatsTable() {
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [current, setCurrent] = useState(null);

  const statsURL =
    "https://api.mysportsfeeds.com/v2.1/pull/nhl/2021-regular/player_stats_totals.json";
  const injuryURL = "https://api.mysportsfeeds.com/v2.1/pull/nhl/injury_history.json?player=";
  const apiToken = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);

      const statsRes = await axios.get(statsURL, {
        headers: {
          Authorization: "Basic " + btoa(`${apiToken}:MYSPORTSFEEDS`),
        },
      });
      console.log(statsRes.data.playerStatsTotals);
      setPlayers(statsRes.data.playerStatsTotals);
      setIsLoading(false);
    };
    getData();
  }, [apiToken]);

  function statsSorting(e) {
    const sortingLegend = {
      player: (a, b) => a.player.lastName.localeCompare(b.player.lastName),
      team: (a, b) => a.team.abbreviation.localeCompare(b.team.abbreviation),
      pos: (a, b) => a.player.primaryPosition.localeCompare(b.player.primaryPosition),
      gp: (a, b) => b.stats.gamesPlayed - a.stats.gamesPlayed,
      p: (a, b) => b.stats.scoring.points - a.stats.scoring.points,
      g: (a, b) => b.stats.scoring.goals - a.stats.scoring.goals,
      a: (a, b) => b.stats.scoring.assists - a.stats.scoring.assists,
      pa: (a, b) => b.stats.scoring.primaryAssists - a.stats.scoring.primaryAssists,
      ppg: (a, b) => b.stats.scoring.powerplayGoals - a.stats.scoring.powerplayGoals,
      ppp: (a, b) => b.stats.scoring.powerplayPoints - a.stats.scoring.powerplayPoints,
      shg: (a, b) => b.stats.scoring.shorthandedGoals - a.stats.scoring.shorthandedGoals,
      shp: (a, b) => b.stats.scoring.shorthandedPoints - a.stats.scoring.shorthandedPoints,
      otg: (a, b) => b.stats.scoring.overtimeGoals - a.stats.scoring.overtimeGoals,
      pim: (a, b) => b.stats.penalties.penaltyMinutes - a.stats.penalties.penaltyMinutes,
      s: (a, b) =>
        (b.stats.skating ? b.stats.skating.shots : -1) -
        (a.stats.skating ? a.stats.skating.shots : -1),
      h: (a, b) =>
        (b.stats.skating ? b.stats.skating.hits : -1) -
        (a.stats.skating ? a.stats.skating.hits : -1),
      toi: (a, b) =>
        b.stats.shifts.timeOnIceSeconds / b.stats.gamesPlayed -
        a.stats.shifts.timeOnIceSeconds / a.stats.gamesPlayed,
      blk: (a, b) =>
        (b.stats.skating ? b.stats.skating.blockedShots : -1) -
        (a.stats.skating ? a.stats.skating.blockedShots : -1),
      sv: (a, b) =>
        (b.stats.goaltending ? b.stats.goaltending.saves : -1) -
        (a.stats.goaltending ? a.stats.goaltending.saves : -1),
      gaa: (a, b) =>
        (a.stats.goaltending && a.stats.goaltending.saves !== 0
          ? a.stats.goaltending.goalsAgainstAverage
          : 50) -
        (b.stats.goaltending && b.stats.goaltending.saves !== 0
          ? b.stats.goaltending.goalsAgainstAverage
          : 50),
      "sv%": (a, b) =>
        (b.stats.goaltending ? b.stats.goaltending.savePercentage : -1) -
        (a.stats.goaltending ? a.stats.goaltending.savePercentage : -1),
      gs: (a, b) =>
        (b.stats.goaltending ? b.stats.goaltending.gamesStarted : -1) -
        (a.stats.goaltending ? a.stats.goaltending.gamesStarted : -1),
      w: (a, b) =>
        (b.stats.goaltending ? b.stats.goaltending.wins : -1) -
        (a.stats.goaltending ? a.stats.goaltending.wins : -1),
      l: (a, b) =>
        (b.stats.goaltending ? b.stats.goaltending.losses : -1) -
        (a.stats.goaltending ? a.stats.goaltending.losses : -1),
      so: (a, b) =>
        (b.stats.goaltending ? b.stats.goaltending.shutouts : -1) -
        (a.stats.goaltending ? a.stats.goaltending.shutouts : -1),
      ga: (a, b) =>
        (a.stats.goaltending && a.stats.goaltending.saves !== 0
          ? a.stats.goaltending.goalsAgainst
          : 50) -
        (b.stats.goaltending && b.stats.goaltending.saves !== 0
          ? b.stats.goaltending.goalsAgainst
          : 50),
    };

    let sortedArr = players.slice();

    setPlayers(sortedArr.sort(sortingLegend[e.target.innerText.toLowerCase()]));
  }

  function positionFilter(e) {
    if (e.target.innerText === "ALL") {
      axios
        .get(statsURL, {
          headers: {
            Authorization: "Basic " + btoa(`${apiToken}:MYSPORTSFEEDS`),
          },
        })
        .then((res) => {
          setPlayers(res.data.playerStatsTotals);
        });
    } else if (e.target.innerText === "SK") {
      axios
        .get(`${statsURL}?position=c,lw,rw,d`, {
          headers: {
            Authorization: "Basic " + btoa(`${apiToken}:MYSPORTSFEEDS`),
          },
        })
        .then((res) => {
          setPlayers(res.data.playerStatsTotals);
        });
    } else {
      axios
        .get(`${statsURL}?position=${e.target.innerText}`, {
          headers: {
            Authorization: "Basic " + btoa(`${apiToken}:MYSPORTSFEEDS`),
          },
        })
        .then((res) => {
          setPlayers(res.data.playerStatsTotals);
        });
    }
  }

  function playerMap(players) {
    let newPlayers = players.map((player) => {
      let fullName = player.player.firstName + " " + player.player.lastName;
      let injury = player.player.currentInjury
        ? player.player.currentInjury.playingProbability.slice(0, 5)
        : "";
      let scoring = player.stats.scoring;
      let skating = player.stats.skating;
      let goaltending = player.stats.goaltending;
      return {
        id: player.player.id,
        name: fullName,
        injury: injury,
        injuryDescription: injury ? player.player.currentInjury.description.toUpperCase() : "",
        team: player.team.abbreviation,
        position: player.player.primaryPosition,
        gamesPlayed: player.stats.gamesPlayed,
        points: scoring.points,
        goals: scoring.goals,
        assists: scoring.assists,
        primaryAssists: scoring.primaryAssists,
        powerplayGoals: scoring.powerplayGoals,
        powerplayPoints: scoring.powerplayPoints,
        shorthandedGoals: scoring.shorthandedGoals,
        shorthandedPoints: scoring.shorthandedPoints,
        overtimeGoals: scoring.overtimeGoals,
        shots: skating ? skating.shots : "",
        hits: skating ? skating.hits : "",
        timeOnIcePerGame: toiConverter(player),
        penaltyMinutes: player.stats.penalties.penaltyMinutes,
        blockedShots: skating ? skating.blockedShots : "",
        saves: goaltending ? goaltending.saves : "",
        goalsAgainst: goaltending ? goaltending.goalsAgainst : "",
        goalsAgainstAverage: goaltending ? goaltending.goalsAgainstAverage.toFixed(3) : "",
        savePercentage: goaltending ? goaltending.savePercentage.toFixed(3) : "",
        gamesStarted: goaltending ? goaltending.gamesStarted : "",
        wins: goaltending ? goaltending.wins : "",
        losses: goaltending ? goaltending.losses : "",
        shutouts: goaltending ? goaltending.shutouts : "",
      };
    });
    return newPlayers;
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpen = async (e) => {
    const injuryRes = await axios.get(`${injuryURL}${e.target.parentElement.id}`, {
      headers: {
        Authorization: "Basic " + btoa(`${apiToken}:MYSPORTSFEEDS`),
      },
    });
    console.log(injuryRes.data);
    setCurrent(injuryRes.data);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setCurrent(null);
    setDialogOpen(false);
  };

  const useStyles = makeStyles({
    stickyCol: {
      minWidth: "100px",
      maxWidth: "50vw",
      left: 0,
      whiteSpace: "nowrap",
      overflow: "hidden",
      position: "sticky",
      zIndex: 5,
      backgroundColor: "#424242",
      color: "#eeeeee",
    },
    colHeadings: {
      cursor: "pointer",
      color: "#FBC02D",
    },
    colStyles: {
      backgroundColor: "#616161",
      color: "#eeeeee",
    },
    stickyColHeader: {
      left: 0,
      zIndex: 6,
      color: "#FBC02D",
      cursor: "pointer",
    },
    chipStyles: {
      marginLeft: 5,
      paddingTop: 1,
      fontSize: 10,
      fontWeight: 600,
      height: 15,
    },
    standingsHeaders: {
      color: "#FBC02D",
    },
  });

  const classes = useStyles();

  return (
    <Container>
      {isLoading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <Paper elevation={3}>
          <PositionTabs onClick={positionFilter} />
          <TableContainer style={{ maxHeight: "80vh", width: "100%" }}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell
                    onClick={statsSorting}
                    title="Name"
                    className={classes.stickyColHeader}>
                    Player
                  </TableCell>
                  <TableCell onClick={statsSorting} className={classes.colHeadings} title="Team">
                    Team
                  </TableCell>
                  <TableCell
                    onClick={statsSorting}
                    className={classes.colHeadings}
                    title="Position">
                    Pos
                  </TableCell>
                  <TableCell
                    onClick={statsSorting}
                    className={classes.colHeadings}
                    title="Games Played">
                    GP
                  </TableCell>
                  <TableCell onClick={statsSorting} className={classes.colHeadings} title="Points">
                    P
                  </TableCell>
                  <TableCell onClick={statsSorting} className={classes.colHeadings} title="Goals">
                    G
                  </TableCell>
                  <TableCell onClick={statsSorting} className={classes.colHeadings} title="Assists">
                    A
                  </TableCell>
                  <TableCell
                    onClick={statsSorting}
                    className={classes.colHeadings}
                    title="Primary Assists">
                    PA
                  </TableCell>
                  <TableCell
                    onClick={statsSorting}
                    className={classes.colHeadings}
                    title="Powerplay Goals">
                    PPG
                  </TableCell>
                  <TableCell
                    onClick={statsSorting}
                    className={classes.colHeadings}
                    title="Powerplay Points">
                    PPP
                  </TableCell>
                  <TableCell
                    onClick={statsSorting}
                    className={classes.colHeadings}
                    title="Shorthanded Goals">
                    SHG
                  </TableCell>
                  <TableCell
                    onClick={statsSorting}
                    className={classes.colHeadings}
                    title="Shorthanded Points">
                    SHP
                  </TableCell>
                  <TableCell
                    onClick={statsSorting}
                    className={classes.colHeadings}
                    title="Overtime Goals">
                    OTG
                  </TableCell>
                  <TableCell onClick={statsSorting} className={classes.colHeadings} title="Shots">
                    S
                  </TableCell>
                  <TableCell onClick={statsSorting} className={classes.colHeadings} title="Hits">
                    H
                  </TableCell>
                  <TableCell
                    onClick={statsSorting}
                    className={classes.colHeadings}
                    title="Time on Ice/Game">
                    TOI
                  </TableCell>
                  <TableCell
                    onClick={statsSorting}
                    className={classes.colHeadings}
                    title="Penalty Minutes">
                    PIM
                  </TableCell>
                  <TableCell
                    onClick={statsSorting}
                    className={classes.colHeadings}
                    title="Blocked Shots">
                    BLK
                  </TableCell>
                  <TableCell onClick={statsSorting} className={classes.colHeadings} title="Saves">
                    SV
                  </TableCell>
                  <TableCell
                    onClick={statsSorting}
                    className={classes.colHeadings}
                    title="Goals Against">
                    GA
                  </TableCell>
                  <TableCell
                    onClick={statsSorting}
                    className={classes.colHeadings}
                    title="Goals Against Average">
                    GAA
                  </TableCell>
                  <TableCell
                    onClick={statsSorting}
                    className={classes.colHeadings}
                    title="Save Percentage">
                    SV%
                  </TableCell>
                  <TableCell
                    onClick={statsSorting}
                    className={classes.colHeadings}
                    title="Games Started">
                    GS
                  </TableCell>
                  <TableCell onClick={statsSorting} className={classes.colHeadings} title="Wins">
                    W
                  </TableCell>
                  <TableCell onClick={statsSorting} className={classes.colHeadings} title="Losses">
                    L
                  </TableCell>
                  <TableCell
                    onClick={statsSorting}
                    className={classes.colHeadings}
                    title="Shutouts">
                    SO
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? playerMap(players).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : playerMap(players)
                ).map((player) => {
                  return (
                    <TableRow key={player.id * Math.random()} className={classes.rowStyles}>
                      <TableCell className={classes.stickyCol}>
                        {player.name}
                        {player.injury ? (
                          <>
                            <Chip
                              id={player.id}
                              size="small"
                              color="secondary"
                              label={player.injury}
                              className={classes.chipStyles}
                              title={player.injuryDescription}
                              onClick={handleOpen}
                            />
                            {current && (
                              <Dialog
                                maxWidth="md"
                                open={dialogOpen}
                                onClose={handleClose}
                                aria-labelledby="injury-dialog">
                                <DialogTitle id="injury-dialog">
                                  {current.references.playerReferences[0].firstName +
                                    " " +
                                    current.references.playerReferences[0].lastName +
                                    " - #" +
                                    current.references.playerReferences[0].jerseyNumber}
                                </DialogTitle>
                                <DialogContent>
                                  <DialogContentText>
                                    {new Date(
                                      current.playerInjuries[0].injuryHistory.reverse()[0].asOfDate
                                    ).toDateString() +
                                      " - " +
                                      current.playerInjuries[0].injuryHistory.reverse()[0]
                                        .longDescription}
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={handleClose} color="secondary">
                                    Close
                                  </Button>
                                </DialogActions>
                              </Dialog>
                            )}
                          </>
                        ) : (
                          ""
                        )}
                      </TableCell>
                      <TableCell className={classes.colStyles}>{player.team}</TableCell>
                      <TableCell className={classes.colStyles}>{player.position}</TableCell>
                      <TableCell className={classes.colStyles}>{player.gamesPlayed}</TableCell>
                      <TableCell className={classes.colStyles}>{player.points}</TableCell>
                      <TableCell className={classes.colStyles}>{player.goals}</TableCell>
                      <TableCell className={classes.colStyles}>{player.assists}</TableCell>
                      <TableCell className={classes.colStyles}>{player.primaryAssists}</TableCell>
                      <TableCell className={classes.colStyles}>{player.powerplayGoals}</TableCell>
                      <TableCell className={classes.colStyles}>{player.powerplayPoints}</TableCell>
                      <TableCell className={classes.colStyles}>{player.shorthandedGoals}</TableCell>
                      <TableCell className={classes.colStyles}>
                        {player.shorthandedPoints}
                      </TableCell>
                      <TableCell className={classes.colStyles}>{player.overtimeGoals}</TableCell>
                      <TableCell className={classes.colStyles}>{player.shots}</TableCell>
                      <TableCell className={classes.colStyles}>{player.hits}</TableCell>
                      <TableCell className={classes.colStyles}>{player.timeOnIcePerGame}</TableCell>
                      <TableCell className={classes.colStyles}>{player.penaltyMinutes}</TableCell>
                      <TableCell className={classes.colStyles}>{player.blockedShots}</TableCell>
                      <TableCell className={classes.colStyles}>{player.saves}</TableCell>
                      <TableCell className={classes.colStyles}>{player.goalsAgainst}</TableCell>
                      <TableCell className={classes.colStyles}>
                        {player.goalsAgainstAverage}
                      </TableCell>
                      <TableCell className={classes.colStyles}>{player.savePercentage}</TableCell>
                      <TableCell className={classes.colStyles}>{player.gamesStarted}</TableCell>
                      <TableCell className={classes.colStyles}>{player.wins}</TableCell>
                      <TableCell className={classes.colStyles}>{player.losses}</TableCell>
                      <TableCell className={classes.colStyles}>{player.shutouts}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TablePagination
                    style={{
                      color: "#eeeeee",
                      fontWeight: 600,
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                    className={classes.stickyColHeader}
                    labelRowsPerPage="Rows: "
                    rowsPerPageOptions={[10, 20, 50, 75]}
                    colSpan={1}
                    count={players.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { "aria-label": "rows per page" },
                      native: true,
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Container>
  );
}

function toiConverter(sec) {
  let minutes = Math.floor(sec.stats.shifts.timeOnIceSeconds / 60 / sec.stats.gamesPlayed);
  let seconds = (sec.stats.shifts.timeOnIceSeconds / sec.stats.gamesPlayed - minutes * 60).toFixed(
    0
  );
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

function TablePaginationActions({ count, page, rowsPerPage, onChangePage }) {
  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div style={{ minWidth: 500, color: "#eeeeee", fontWeight: 600 }}>
      <Hidden mdDown>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page">
          <FirstPageIcon />
        </IconButton>
      </Hidden>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page">
        <KeyboardArrowRight />
      </IconButton>
      <Hidden mdDown>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page">
          <LastPageIcon />
        </IconButton>
      </Hidden>
    </div>
  );
}
