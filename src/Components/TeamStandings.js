import { useEffect, useContext } from "react";
import HockeyContext from "../context/hockey/hockeyContext";
import { Route } from "react-router-dom";
import StandingsTabs from "./StandingsTabs";
import NHLStandings from "./NHLStandings";
import DivisionalStandings from "./DivisionalStandings";
import { Container, Paper } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function TeamStandings() {
  const hockeyContext = useContext(HockeyContext);
  const { setStandings, nhlStandings, divisionalStandings, loading } = hockeyContext;

  useEffect(() => {
    setStandings();
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <Paper elevation={3}>
          <StandingsTabs />
          <Route path="/standings/division">
            <DivisionalStandings standings={divisionalStandings} />
          </Route>
          <Route path="/standings/nhl">
            <NHLStandings standings={nhlStandings} />
          </Route>
        </Paper>
      )}
    </Container>
  );
}
