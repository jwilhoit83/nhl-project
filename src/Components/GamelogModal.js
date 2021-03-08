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
                    <tr>
                      {gameLogs[0].position !== "G" ? (
                        <>
                          <th>DATE</th>
                          <th>OPP</th>
                          <th>P</th>
                          <th>G</th>
                          <th>A</th>
                          <th>PPG</th>
                          <th>S</th>
                          <th>HIT</th>
                          <th>BLK</th>
                        </>
                      ) : (
                        <>
                          <th>DATE</th>
                          <th>OPP</th>
                          <th>GS</th>
                          <th>W</th>
                          <th>L</th>
                          <th>SV</th>
                          <th>SV%</th>
                          <th>GA</th>
                          <th>SO</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {gameLogs[0].position !== "G"
                      ? gameLogs.slice(0, 10).map((game) => (
                          <tr key={game.id}>
                            <td>{game.date}</td>
                            <td>{game.opp}</td>
                            <td>{game.points}</td>
                            <td>{game.goals}</td>
                            <td>{game.assists}</td>
                            <td>{game.ppg}</td>
                            <td>{game.shots}</td>
                            <td>{game.hits}</td>
                            <td>{game.blocks}</td>
                          </tr>
                        ))
                      : gameLogs.slice(0, 10).map((game) => (
                          <tr key={game.id}>
                            <td>{game.date}</td>
                            <td>{game.opp}</td>
                            <td>{game.gameStarted}</td>
                            <td>{game.win}</td>
                            <td>{game.loss}</td>
                            <td>{game.saves}</td>
                            <td>{game.savePerc}</td>
                            <td>{game.goalsAgainst}</td>
                            <td>{game.shutout}</td>
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
