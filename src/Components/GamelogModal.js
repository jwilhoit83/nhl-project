import { useContext, useEffect } from "react";
import HockeyContext from "../context/hockey/hockeyContext";
import LoadingAnimation from "./LoadingAnimation";
import M from "materialize-css/dist/js/materialize.min.js";

const GamelogModal = () => {
  const hockeyContext = useContext(HockeyContext);
  const { currentPlayer, clearCurrentPlayer, loading } = hockeyContext;

  useEffect(() => {
    const gamelogModal = document.querySelector("#gamelog-modal");
    M.Modal.init(gamelogModal, {
      onCloseEnd: clearCurrentPlayer,
    });
    // eslint-disable-next-line
  }, []);

  let gameLogs = [];

  if (currentPlayer) {
    gameLogs = currentPlayer.gamelogs.slice().map((game) => {
      if (game.player.position !== "G") {
        return {
          id: game.game.id,
          position: game.player.position,
          date: game.game.startTime.split("T")[0].slice(5).replace('-', '/'),
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
          date: game.game.startTime.split("T")[0].slice(5).replace('-', '/'),
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

  return (
    <div className="modal grey darken-3" id="gamelog-modal">
      <div className="row modal-content">
        {loading || !currentPlayer ? (
          <LoadingAnimation />
        ) : (
          <>
            <div className="col s12 m4">
              {currentPlayer.references.playerReferences[0].officialImageSrc ? (
                <img
                  alt={
                    currentPlayer.references.playerReferences[0].firstName +
                    " " +
                    currentPlayer.references.playerReferences[0].lastName
                  }
                  src={currentPlayer.references.playerReferences[0].officialImageSrc}
                  className="player-pic circle mt-5"
                />
              ) : (
                ""
              )}
              <h5 className="secondary-text">
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
            <div className="s12 m8">
              <div className="gamelog-table z-depth-3">
                <table className="grey darken-3">
                  <thead>
                    <tr className='py-2'>
                      {gameLogs[0].position !== "G" ? (
                        <>
                          <th className='py-2'>DATE</th>
                          <th className='py-2'>OPP</th>
                          <th className='py-2'>P</th>
                          <th className='py-2'>G</th>
                          <th className='py-2'>A</th>
                          <th className='py-2'>PPG</th>
                          <th className='py-2'>S</th>
                          <th className='py-2'>H</th>
                          <th className='py-2'>BLK</th>
                        </>
                      ) : (
                        <>
                          <th className='py-2'>DATE</th>
                          <th className='py-2'>OPP</th>
                          <th className='py-2'>GS</th>
                          <th className='py-2'>W</th>
                          <th className='py-2'>L</th>
                          <th className='py-2'>SV</th>
                          <th className='py-2'>SV%</th>
                          <th className='py-2'>GA</th>
                          <th className='py-2'>SO</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {gameLogs[0].position !== "G"
                      ? gameLogs.slice(0, 10).map((game) => (
                          <tr key={game.id}>
                            <td className='py-2'>{game.date}</td>
                            <td className='py-2'>{game.opp}</td>
                            <td className='py-2'>{game.points}</td>
                            <td className='py-2'>{game.goals}</td>
                            <td className='py-2'>{game.assists}</td>
                            <td className='py-2'>{game.ppg}</td>
                            <td className='py-2'>{game.shots}</td>
                            <td className='py-2'>{game.hits}</td>
                            <td className='py-2'>{game.blocks}</td>
                          </tr>
                        ))
                      : gameLogs.slice(0, 10).map((game) => (
                          <tr key={game.id}>
                            <td className='py-2'>{game.date}</td>
                            <td className='py-2'>{game.opp}</td>
                            <td className='py-2'>{game.gameStarted}</td>
                            <td className='py-2'>{game.win}</td>
                            <td className='py-2'>{game.loss}</td>
                            <td className='py-2'>{game.saves}</td>
                            <td className='py-2'>{game.savePerc}</td>
                            <td className='py-2'>{game.goalsAgainst}</td>
                            <td className='py-2'>{game.shutout}</td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="modal-footer grey darken-3 sticky-bottom">
        <button className="btn-floating blue-grey waves-effect waves-light modal-close">
          <i className="small material-icons">close</i>
        </button>
      </div>
    </div>
  );
};

export default GamelogModal;
