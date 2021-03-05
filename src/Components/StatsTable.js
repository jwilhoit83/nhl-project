import { useState, useEffect, useContext } from "react";
import HockeyContext from "../context/hockey/hockeyContext";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import PositionTabs from "./PositionTabs";
import PlayerGameLog from "./PlayerGameLog";
import { sortingLegend, playerMap } from "../utils/stats";

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
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function StatsTable() {
  const hockeyContext = useContext(HockeyContext);
  const {
    players,
    currentInjury,
    setPlayers,
    sortPlayers,
    setCurrentPlayer,
    setCurrentInjury,
    clearCurrentInjury,
  } = hockeyContext;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);

  useEffect(() => {
    setPlayers();
    // eslint-disable-next-line
  }, []);

  function statsSorting(e) {
    sortPlayers(players.slice().sort(sortingLegend[e.target.innerText.toLowerCase()]));
  }

  function positionFilter(e) {
    if (e.target.innerText === "ALL") {
      setPlayers();
    } else if (e.target.innerText === "SK") {
      setPlayers("c,lw,rw,d");
    } else {
      setPlayers(e.target.innerText);
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDialogOpen = async (e) => {
    setDialogOpen(true);
    setCurrentInjury(e.target.parentElement.id);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    clearCurrentInjury();
  };

  const handleModalOpen = (e) => {
    setCurrentPlayer(e.target.parentElement.id);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  function getModalStyle() {
    const top = 50;
    const left = 50;
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
      outline: 0,
    };
  }

  const theme = useTheme();

  const useStyles = makeStyles({
    stickyCol: {
      minWidth: "100px",
      maxWidth: "50vw",
      left: 0,
      whiteSpace: "nowrap",
      overflow: "hidden",
      position: "sticky",
      zIndex: 2,
      backgroundColor: "#424242",
      color: "#eeeeee",
    },
    colHeadings: {
      cursor: "pointer",
      color: theme.secondaryText.color,
    },
    colStyles: {
      backgroundColor: "#616161",
      color: "#eeeeee",
    },
    stickyColHeader: {
      left: 0,
      zIndex: 3,
      color: theme.secondaryText.color,
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
      color: theme.secondaryText.color,
    },
    modal: {
      position: "absolute",
      maxWidth: "90%",
      maxHeight: "80%",
      backgroundColor: "#616161",
      padding: 20,
      overflow: "auto",
      borderRadius: 10,
    },
  });

  const classes = useStyles();

  return (
    <Container>
      <Paper elevation={3}>
        <PositionTabs onClick={positionFilter} />
        <TableContainer style={{ maxHeight: "75vh", width: "100%" }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell onClick={statsSorting} title="Name" className={classes.stickyColHeader}>
                  Player
                </TableCell>
                <TableCell onClick={statsSorting} className={classes.colHeadings} title="Team">
                  Team
                </TableCell>
                <TableCell onClick={statsSorting} className={classes.colHeadings} title="Position">
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
                <TableCell onClick={statsSorting} className={classes.colHeadings} title="Fights">
                  FIGHTS
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
                <TableCell onClick={statsSorting} className={classes.colHeadings} title="Shutouts">
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
                    <TableCell id={player.id} className={classes.stickyCol}>
                      <span style={{ cursor: "pointer" }} onClick={handleModalOpen}>
                        {player.name}
                      </span>
                      <Modal
                        open={modalOpen}
                        onClose={handleModalClose}
                        BackdropComponent={Backdrop}>
                        <Container style={modalStyle} className={classes.modal}>
                          <PlayerGameLog />
                        </Container>
                      </Modal>
                      {player.injury ? (
                        <>
                          <Chip
                            id={player.id}
                            size="small"
                            color="secondary"
                            label={player.injury}
                            className={classes.chipStyles}
                            title={player.injuryDescription}
                            onClick={handleDialogOpen}
                          />
                          {currentInjury && (
                            <Dialog
                              fullWidth={false}
                              maxWidth="sm"
                              open={dialogOpen}
                              onClose={handleDialogClose}
                              scroll="paper"
                              aria-labelledby="injury-dialog">
                              <DialogTitle id="injury-dialog">
                                {currentInjury.references.playerReferences[0].firstName +
                                  " " +
                                  currentInjury.references.playerReferences[0].lastName}
                              </DialogTitle>
                              <DialogContent>
                                {currentInjury.playerInjuries[0].injuryHistory
                                  .sort((a, b) => new Date(b.asOfDate) - new Date(a.asOfDate))
                                  .map((injury, idx) => {
                                    if (idx < 1)
                                      return (
                                        <DialogContentText key={idx}>
                                          {new Date(injury.asOfDate).toDateString() +
                                            " - " +
                                            injury.longDescription}
                                        </DialogContentText>
                                      );
                                    return null;
                                  })}
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={handleDialogClose} color="secondary">
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
                    <TableCell className={classes.colStyles}>{player.shorthandedPoints}</TableCell>
                    <TableCell className={classes.colStyles}>{player.overtimeGoals}</TableCell>
                    <TableCell className={classes.colStyles}>{player.shots}</TableCell>
                    <TableCell className={classes.colStyles}>{player.hits}</TableCell>
                    <TableCell className={classes.colStyles}>{player.timeOnIcePerGame}</TableCell>
                    <TableCell className={classes.colStyles}>{player.penaltyMinutes}</TableCell>
                    <TableCell className={classes.colStyles}>{player.fights}</TableCell>
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
    </Container>
  );
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
