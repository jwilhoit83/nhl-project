import { useState, useEffect, useContext } from "react";
import HockeyContext from "../context/hockey/hockeyContext";
import { scheduleMap, setNewDate, formatDate } from "../utils/schedule";
import LoadingAnimation from "./LoadingAnimation";

export default function ScheduleMat() {
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

  const gamesList = schedArr.map((game) => (
    <div key={game.gameID} className="row mx-a">
      <div className="col s12 m6 offset-m3">
        <div className="card horizontal grey darken-3 p-20">
          <div className="card-image m-a s4">
            <img className="team-logo" alt={game.homeTeamName + " Logo"} src={game.homeLogo} />
          </div>
          <div className="card-content center">
            <p className="flow-text blue-grey-text text-lighten-2">
              {new Date(game.gameTime).toDateString().slice(0, 10)}
            </p>
            {game.homeScore === null ? <p>{new Date(game.gameTime).toLocaleTimeString()}</p> : ""}
            {game.homeScore !== null ? <p>{game.homeScore + " - " + game.awayScore}</p> : ""}
            {game.currentPeriod !== null && game.playedStatus.slice(0, 9) !== "COMPLETED" ? (
              <>
                <p>{"Period: " + game.currentPeriod}</p>
                <p>{game.currentPeriodTimeRemaining}</p>
              </>
            ) : (
              ""
            )}
            {game.currentIntermission !== null && game.playedStatus.slice(0, 9) !== "COMPLETED" ? (
              <p>{"Intermission: " + game.currentIntermission}</p>
            ) : (
              ""
            )}
            {game.playedStatus.slice(0, 9) === "COMPLETED" ? <p>Final</p> : ""}
            {game.scheduleStatus === "POSTPONED" ? (
              <>
                <p>{game.scheduleStatus}</p>
                <p>{game.delayedOrPostponedReason}</p>
              </>
            ) : (
              ""
            )}
          </div>
          <div className="card-image m-a s4">
            <img className="team-logo" alt={game.awayTeamName + " Logo"} src={game.awayLogo} />
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="container">
      {loading ? (
        <LoadingAnimation />
      ) : (
        <>
          <div className="row">
            <form className="col s12 m6 offset-m3">
              <input
                id="date"
                type="date"
                className="grey-text text-lighten-4"
                value={displayDate}
                onChange={(e) => {
                  setDisplayDate(e.target.value);
                  setSchedDate(formatDate(e.target.value));
                }}
              />
            </form>
          </div>
          {gamesList}
        </>
      )}
    </div>
  );
}
