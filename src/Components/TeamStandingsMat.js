import { useEffect, useContext } from "react";
import HockeyContext from "../context/hockey/hockeyContext";
import { Route } from "react-router-dom";
import StandingsTabsMat from "./StandingsTabsMat";
import NHLStandingsMat from "./NHLStandingsMat";
import DivisionalStandingsMat from "./DivisionalStandingsMat";
import LoadingAnimation from "./LoadingAnimation";

export default function TeamStandingsMat() {
  const hockeyContext = useContext(HockeyContext);
  const { setStandings, nhlStandings, divisionalStandings, loading } = hockeyContext;

  useEffect(() => {
    setStandings();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container z-depth-3">
      {loading ? (
        <LoadingAnimation />
      ) : (
        <>
          <StandingsTabsMat />
          <div className="stats-table">
            <Route path="/standings/division">
              <DivisionalStandingsMat standings={divisionalStandings} />
            </Route>
            <Route path="/standings/nhl">
              <NHLStandingsMat standings={nhlStandings} />
            </Route>
          </div>
        </>
      )}
    </div>
  );
}
