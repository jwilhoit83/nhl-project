import { useEffect, useContext } from "react";
import HockeyContext from "../context/hockey/hockeyContext";
import { Route } from "react-router-dom";
import StandingsTabs from "./StandingsTabs";
import NHLStandings from "./NHLStandings";
import DivisionalStandings from "./DivisionalStandings";
import LoadingAnimation from "./LoadingAnimation";

const TeamStandings = () => {
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
          <StandingsTabs />
          <div className="stats-table">
            <Route path="/standings/division">
              <DivisionalStandings standings={divisionalStandings} />
            </Route>
            <Route path="/standings/nhl">
              <NHLStandings standings={nhlStandings} />
            </Route>
          </div>
        </>
      )}
    </div>
  );
};

export default TeamStandings;
