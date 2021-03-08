import { useState, useEffect, useContext } from "react";
import HockeyContext from "../context/hockey/hockeyContext";
import { makeStyles } from "@material-ui/core/styles";
import PositionTabsMat from "./PositionTabsMat";
import { sortingLegend, playerMap } from "../utils/stats";

import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import Hidden from "@material-ui/core/Hidden";

export default function StatsTableMat() {
  const hockeyContext = useContext(HockeyContext);
  const {
    players,
    setPlayers,
    sortPlayers,
    setCurrentPlayer,
    setCurrentInjury,
  } = hockeyContext;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

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

  const openInjuryModal = (e) => {
    setCurrentInjury(e.target.id);
  };

  const useStyles = makeStyles({
    modal: {
      position: "absolute",
      maxWidth: "90%",
      maxHeight: "80%",
      backgroundColor: "#616161",
      padding: 20,
      overflowX: "auto",
      overflowY: "auto",
      borderRadius: 10,
    },
  });

  const classes = useStyles();

  return (
    <div className="container z-depth-2">
      <PositionTabsMat onClick={positionFilter} />
      <div className="stats-table">
        <table className="grey darken-3">
          <thead>
            <tr>
              <td onClick={statsSorting} className="stickyColHeader secondary-dark" title="Name">
                Player
              </td>
              <td onClick={statsSorting} className="colHeadings secondary-dark" title="Team">
                Team
              </td>
              <td onClick={statsSorting} className="colHeadings secondary-dark" title="Position">
                Pos
              </td>
              <td
                onClick={statsSorting}
                className="colHeadings secondary-dark"
                title="Games Played">
                GP
              </td>
              <td onClick={statsSorting} className="colHeadings secondary-dark" title="Points">
                P
              </td>
              <td onClick={statsSorting} className="colHeadings secondary-dark" title="Goals">
                G
              </td>
              <td onClick={statsSorting} className="colHeadings secondary-dark" title="Assists">
                A
              </td>
              <td
                onClick={statsSorting}
                className="colHeadings secondary-dark"
                title="Primary Assists">
                PA
              </td>
              <td
                onClick={statsSorting}
                className="colHeadings secondary-dark"
                title="Powerplay Goals">
                PPG
              </td>
              <td
                onClick={statsSorting}
                className="colHeadings secondary-dark"
                title="Powerplay Points">
                PPP
              </td>
              <td
                onClick={statsSorting}
                className="colHeadings secondary-dark"
                title="Shorthanded Goals">
                SHG
              </td>
              <td
                onClick={statsSorting}
                className="colHeadings secondary-dark"
                title="Shorthanded Points">
                SHP
              </td>
              <td
                onClick={statsSorting}
                className="colHeadings secondary-dark"
                title="Overtime Goals">
                OTG
              </td>
              <td onClick={statsSorting} className="colHeadings secondary-dark" title="Shots">
                S
              </td>
              <td onClick={statsSorting} className="colHeadings secondary-dark" title="Hits">
                H
              </td>
              <td
                onClick={statsSorting}
                className="colHeadings secondary-dark"
                title="Time on Ice/Game">
                TOI
              </td>
              <td
                onClick={statsSorting}
                className="colHeadings secondary-dark"
                title="Penalty Minutes">
                PIM
              </td>
              <td onClick={statsSorting} className="colHeadings secondary-dark" title="Fights">
                FIGHTS
              </td>
              <td
                onClick={statsSorting}
                className="colHeadings secondary-dark"
                title="Blocked Shots">
                BLK
              </td>
              <td onClick={statsSorting} className="colHeadings secondary-dark" title="Saves">
                SV
              </td>
              <td
                onClick={statsSorting}
                className="colHeadings secondary-dark"
                title="Goals Against">
                GA
              </td>
              <td
                onClick={statsSorting}
                className="colHeadings secondary-dark"
                title="Goals Against Average">
                GAA
              </td>
              <td
                onClick={statsSorting}
                className="colHeadings secondary-dark"
                title="Save Percentage">
                SV%
              </td>
              <td
                onClick={statsSorting}
                className="colHeadings secondary-dark"
                title="Games Started">
                GS
              </td>
              <td onClick={statsSorting} className="colHeadings secondary-dark" title="Wins">
                W
              </td>
              <td onClick={statsSorting} className="colHeadings secondary-dark" title="Losses">
                L
              </td>
              <td onClick={statsSorting} className="colHeadings secondary-dark" title="Shutouts">
                SO
              </td>
            </tr>
          </thead>
          <tbody>
            {(rowsPerPage > 0
              ? playerMap(players).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : playerMap(players)
            ).map((player) => {
              return (
                <tr key={player.id * Math.random()}>
                  <td id={player.id} className="rowStyles stickyCol primary-bg">
                    <span data-target='gamelog-modal' className='modal-trigger' onClick={() => setCurrentPlayer(player.id)} style={{ cursor: "pointer" }}>
                      {player.name}
                    </span>                    
                    {player.injury ? (
                      <>
                        <a
                          href="#injury-modal"
                          className="modal-trigger chipStyles"
                          title={player.injuryDescription}
                          onClick={openInjuryModal}
                          id={player.id}>
                          {player.injury}
                        </a>
                      </>
                    ) : (
                      ""
                    )}
                  </td>
                  <td className="rowStyles">{player.team}</td>
                  <td className="rowStyles">{player.position}</td>
                  <td className="rowStyles">{player.gamesPlayed}</td>
                  <td className="rowStyles">{player.points}</td>
                  <td className="rowStyles">{player.goals}</td>
                  <td className="rowStyles">{player.assists}</td>
                  <td className="rowStyles">{player.primaryAssists}</td>
                  <td className="rowStyles">{player.powerplayGoals}</td>
                  <td className="rowStyles">{player.powerplayPoints}</td>
                  <td className="rowStyles">{player.shorthandedGoals}</td>
                  <td className="rowStyles">{player.shorthandedPoints}</td>
                  <td className="rowStyles">{player.overtimeGoals}</td>
                  <td className="rowStyles">{player.shots}</td>
                  <td className="rowStyles">{player.hits}</td>
                  <td className="rowStyles">{player.timeOnIcePerGame}</td>
                  <td className="rowStyles">{player.penaltyMinutes}</td>
                  <td className="rowStyles">{player.fights}</td>
                  <td className="rowStyles">{player.blockedShots}</td>
                  <td className="rowStyles">{player.saves}</td>
                  <td className="rowStyles">{player.goalsAgainst}</td>
                  <td className="rowStyles">{player.goalsAgainstAverage}</td>
                  <td className="rowStyles">{player.savePercentage}</td>
                  <td className="rowStyles">{player.gamesStarted}</td>
                  <td className="rowStyles">{player.wins}</td>
                  <td className="rowStyles">{player.losses}</td>
                  <td className="rowStyles">{player.shutouts}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <TableContainer>
        <table>
          <thead>
            <tr>
              <TablePagination
                style={{
                  color: "#eeeeee",
                  fontWeight: 600,
                  display: "flex",
                  justifyContent: "flex-start",
                }}
                className={classes.stickyColHeader + "browser-default"}
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
            </tr>
          </thead>
        </table>
      </TableContainer>
    </div>
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