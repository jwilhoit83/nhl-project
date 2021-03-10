import { useState, useEffect, useContext } from "react";
import HockeyContext from "../context/hockey/hockeyContext";
import PositionTabs from "./PositionTabs";
import { sortingLegend, playerMap } from "../utils/stats";
import M from "materialize-css/dist/js/materialize.min.js";

const StatsTable = () => {
  const hockeyContext = useContext(HockeyContext);
  const { players, setPlayers, sortPlayers, setCurrentPlayer, setCurrentInjury } = hockeyContext;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const count = players.length;
  const lastPage = Math.ceil(count / rowsPerPage);

  useEffect(() => {
    setPlayers();
    const select = document.querySelector("select");
    M.FormSelect.init(select);
    // eslint-disable-next-line
  }, []);

  function statsSorting(e) {
    sortPlayers(players.slice().sort(sortingLegend[e.target.innerText.toLowerCase()]));
  }

  // function positionFilter(e) {
  //   if (e.target.innerText === "ALL") {
  //     setPlayers();
  //   } else if (e.target.innerText === "SK") {
  //     setPlayers("c,lw,rw,d");
  //   } else {
  //     setPlayers(e.target.innerText);
  //   }
  // }

  // Pagination helper functions

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFirstPageButtonClick = (event) => {
    handleChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    handleChangePage(event, page > 0 ? page - 1 : 0);
  };

  const handleNextButtonClick = (event) => {
    handleChangePage(event, page < lastPage - 1 ? page + 1 : page);
  };

  const handleLastPageButtonClick = (event) => {
    handleChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  const openInjuryModal = (e) => {
    setCurrentInjury(e.target.id);
  };

  return (
    <div className="container z-depth-3">
      <PositionTabs />
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
                    <span
                      data-target="gamelog-modal"
                      className="modal-trigger pointer"
                      onClick={() => setCurrentPlayer(player.id)}>
                        <span className="hide-on-small-only">{player.firstName + ' '}</span>
                        <span className="hide-on-med-and-up">{player.firstName.slice(0, 1) + '. '}</span>
                        <span>{player.lastName}</span>
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
      <div className="pagination-wrapper mx-10">
        <div className="input-field col">
          <select onChange={handleChangeRowsPerPage} defaultValue="rows">
            <option value="rows" disabled>
              Number of Rows
            </option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="75">75</option>
          </select>
        </div>
        <div>
          <a
            href="#!"
            className="blue-grey-text text-lighten-2 waves-effect waves-light"
            onClick={handleFirstPageButtonClick}>
            <i className="small material-icons">first_page</i>
          </a>
          <a
            href="#!"
            className="blue-grey-text text-lighten-2 waves-effect waves-light"
            onClick={handleBackButtonClick}>
            <i className="small material-icons">keyboard_arrow_left</i>
          </a>
          <a
            href="#!"
            className="blue-grey-text text-lighten-2 waves-effect waves-light"
            onClick={handleNextButtonClick}>
            <i className="small material-icons">keyboard_arrow_right</i>
          </a>
          <a
            href="#!"
            className="blue-grey-text text-lighten-2 waves-effect waves-light"
            onClick={handleLastPageButtonClick}>
            <i className="small material-icons">last_page</i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default StatsTable;
