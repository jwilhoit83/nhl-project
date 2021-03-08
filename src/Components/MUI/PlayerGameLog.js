import { useContext } from "react";
import HockeyContext from "../context/hockey/hockeyContext";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const PlayerGameLog = () => {
  const hockeyContext = useContext(HockeyContext);
  const { currentPlayer, loading } = hockeyContext;

  const theme = useTheme();

  let gameLogs = [];

  if (currentPlayer) {
    gameLogs = currentPlayer.gamelogs.slice().map((game) => {
      if (game.player.position !== "G") {
        return {
          id: game.game.id,
          position: game.player.position,
          date: game.game.startTime.split("T")[0].slice(5),
          opp:
            game.team.abbreviation === game.game.awayTeamAbbreviation
              ? game.game.homeTeamAbbreviation
              : game.game.awayTeamAbbreviation,
          points: game.stats.scoring.points,
          goals: game.stats.scoring.goals,
          assists: game.stats.scoring.assists,
          shots: game.stats.skating.shots,
          ppg: game.stats.scoring.powerplayGoals,
          hits: game.stats.skating.hits,
          blocks: game.stats.skating.blockedShots,
        };
      } else {
        return {
          id: game.game.id,
          position: game.player.position,
          date: game.game.startTime.split("T")[0].slice(5),
          opp:
            game.team.abbreviation === game.game.awayTeamAbbreviation
              ? game.game.homeTeamAbbreviation
              : game.game.awayTeamAbbreviation,
          gameStarted: game.stats.goaltending.gamesStarted,
          win: game.stats.goaltending.wins,
          loss: game.stats.goaltending.losses,
          saves: game.stats.goaltending.saves,
          savePerc: game.stats.goaltending.savePercentage.toFixed(3),
          goalsAgainst: game.stats.goaltending.goalsAgainst,
          shutout: game.stats.goaltending.shutouts,
        };
      }
    });
  }

  const useStyles = makeStyles(() => ({
    flex: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      width: "100%",
      padding: 10,
    },
    avatar: {
      height: 75,
      width: 75,
      fontSize: 40,
    },
    noWrap: {
      whiteSpace: "nowrap",
    },
    secondaryText: {
      color: theme.secondaryText.color,
    },
  }));

  const classes = useStyles();

  return (
    <div>
      {loading ? (
        <div className={classes.flex}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <Grid container spacing={2}>
          <Grid item sm={12} md={4}>
            <div className={classes.flex}>
              <div style={{ margin: 10 }}>
                {currentPlayer.references.playerReferences[0].officialImageSrc ? (
                  <Avatar
                    alt={
                      currentPlayer.references.playerReferences[0].firstName +
                      " " +
                      currentPlayer.references.playerReferences[0].lastName
                    }
                    src={currentPlayer.references.playerReferences[0].officialImageSrc}
                    className={classes.avatar}
                  />
                ) : (
                  <Avatar
                    alt={
                      currentPlayer.references.playerReferences[0].firstName +
                      " " +
                      currentPlayer.references.playerReferences[0].lastName
                    }
                    className={classes.avatar}>
                    {currentPlayer.references.playerReferences[0].firstName.slice(0, 1) +
                      currentPlayer.references.playerReferences[0].lastName.slice(0, 1)}
                  </Avatar>
                )}
              </div>
              <div style={{ margin: 10 }}>
                <h5 className={classes.secondaryText}>
                  {currentPlayer.references.playerReferences[0].firstName +
                    " " +
                    currentPlayer.references.playerReferences[0].lastName +
                    " #" +
                    currentPlayer.references.playerReferences[0].jerseyNumber}
                </h5>
                <p>
                  {"Team: " +
                    currentPlayer.references.playerReferences[0].currentTeam.abbreviation +
                    " Position: " +
                    currentPlayer.references.playerReferences[0].primaryPosition}
                  <span>
                    {currentPlayer.references.playerReferences[0].primaryPosition !== "G"
                      ? " Shoots: " + currentPlayer.references.playerReferences[0].handedness.shoots
                      : " Catches: " +
                        currentPlayer.references.playerReferences[0].handedness.catches}
                  </span>
                </p>
                <p>
                  {"Age: " +
                    currentPlayer.references.playerReferences[0].age +
                    " Height: " +
                    currentPlayer.references.playerReferences[0].height +
                    "  Weight: " +
                    currentPlayer.references.playerReferences[0].weight}
                </p>
              </div>
            </div>
          </Grid>
          <Grid item sm={12} md={8}>
            <TableContainer
              style={{ maxHeight: "90%", width: "100%"}}
              component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {gameLogs[0].position !== "G" ? (
                      <>
                        <TableCell>DATE</TableCell>
                        <TableCell>OPP</TableCell>
                        <TableCell>P</TableCell>
                        <TableCell>G</TableCell>
                        <TableCell>A</TableCell>
                        <TableCell>PPG</TableCell>
                        <TableCell>S</TableCell>
                        <TableCell>HIT</TableCell>
                        <TableCell>BLK</TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>DATE</TableCell>
                        <TableCell>OPP</TableCell>
                        <TableCell>GS</TableCell>
                        <TableCell>W</TableCell>
                        <TableCell>L</TableCell>
                        <TableCell>SV</TableCell>
                        <TableCell>SV%</TableCell>
                        <TableCell>GA</TableCell>
                        <TableCell>SO</TableCell>
                      </>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {gameLogs[0].position !== "G"
                    ? gameLogs.slice(0, 10).map((game) => (
                        <TableRow key={game.id}>
                          <TableCell className={classes.noWrap}>{game.date}</TableCell>
                          <TableCell>{game.opp}</TableCell>
                          <TableCell>{game.points}</TableCell>
                          <TableCell>{game.goals}</TableCell>
                          <TableCell>{game.assists}</TableCell>
                          <TableCell>{game.ppg}</TableCell>
                          <TableCell>{game.shots}</TableCell>
                          <TableCell>{game.hits}</TableCell>
                          <TableCell>{game.blocks}</TableCell>
                        </TableRow>
                      ))
                    : gameLogs.slice(0, 10).map((game) => (
                        <TableRow key={game.id}>
                          <TableCell className={classes.noWrap}>{game.date}</TableCell>
                          <TableCell>{game.opp}</TableCell>
                          <TableCell>{game.gameStarted}</TableCell>
                          <TableCell>{game.win}</TableCell>
                          <TableCell>{game.loss}</TableCell>
                          <TableCell>{game.saves}</TableCell>
                          <TableCell>{game.savePerc}</TableCell>
                          <TableCell>{game.goalsAgainst}</TableCell>
                          <TableCell>{game.shutout}</TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default PlayerGameLog;
