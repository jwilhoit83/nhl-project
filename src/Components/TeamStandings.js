import axios from "axios";
import { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import StandingsTabs from "./StandingsTabs";
import NHLStandings from "./NHLStandings";
import DivisionalStandings from "./DivisionalStandings";
import { Container, Paper } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function TeamStandings() {
  const standingsURL = "https://api.mysportsfeeds.com/v2.1/pull/nhl/current/standings.json";
  const apiToken = process.env.REACT_APP_API_KEY;

  const [allStandings, setAllStandings] = useState([]);
  const [divisionalStandings, setDivisionalStandings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);

      const res = await axios.get(standingsURL, {
        headers: {
          Authorization: "Basic " + btoa(`${apiToken}:MYSPORTSFEEDS`),
        },
      });

      setAllStandings(res.data.teams.slice().sort((a, b) => a.overallRank.rank - b.overallRank.rank));

      let westArr = res.data.teams
        .filter((item) => item.divisionRank.divisionName === "West")
        .sort((a, b) => a.divisionRank.rank - b.divisionRank.rank);
      let eastArr = res.data.teams
        .filter((item) => item.divisionRank.divisionName === "East")
        .sort((a, b) => a.divisionRank.rank - b.divisionRank.rank);
      let northArr = res.data.teams
        .filter((item) => item.divisionRank.divisionName === "North")
        .sort((a, b) => a.divisionRank.rank - b.divisionRank.rank);
      let centralArr = res.data.teams
        .filter((item) => item.divisionRank.divisionName === "Central")
        .sort((a, b) => a.divisionRank.rank - b.divisionRank.rank);
      setDivisionalStandings([westArr, eastArr, northArr, centralArr]);
      setIsLoading(false);
    };

    getData();
  }, [apiToken]);

  return (
    <Container>
      {isLoading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <Paper elevation={3}>
          <StandingsTabs />
          <Route path="/standings/nhl">
            <NHLStandings standings={allStandings} />
          </Route>
          <Route path="/standings/division">
            <DivisionalStandings standings={divisionalStandings} />
          </Route>
        </Paper>
      )}
    </Container>
  );
}
