import { useReducer } from "react";
import axios from "axios";
import HockeyContext from "./hockeyContext";
import HockeyReducer from "./hockeyReducer";
import {
  SET_LOADING,
  SET_TEAMS,
  SET_SCHEDULE,
  SET_PLAYERS,
  SET_STANDINGS,
  SORT_PLAYERS,
  SET_CURRENT_INJURY,
  CLEAR_CURRENT_INJURY,
} from "../types";

import React from "react";

const HockeyState = (props) => {
  const initialState = {
    loading: false,
    teams: [],
    schedule: [],
    players: [],
    nhlStandings: [],
    divisionalStandings: [],
    currentInjury: null,
  };

  const apiToken = process.env.REACT_APP_API_KEY;
  const standingsURL =
    "https://api.mysportsfeeds.com/v2.1/pull/nhl/current/standings.json?force=false";
  const statsURL =
    "https://api.mysportsfeeds.com/v2.1/pull/nhl/2021-regular/player_stats_totals.json?force=false";
  const injuryURL = "https://api.mysportsfeeds.com/v2.1/pull/nhl/injury_history.json";

  const [state, dispatch] = useReducer(HockeyReducer, initialState);

  // get player stats from API
  const setPlayers = async (filter = "") => {
    const res = await axios.get(statsURL, {
      headers: {
        Authorization: "Basic " + btoa(`${apiToken}:MYSPORTSFEEDS`),
      },
      params: {
        position: filter,
      },
    });

    dispatch({ type: SET_PLAYERS, payload: res.data.playerStatsTotals });
  };

  // sort players for stats table
  const sortPlayers = (array) => {
    dispatch({ type: SORT_PLAYERS, payload: array });
  };

  // set current injured player info from API
  const setCurrentInjury = async (id) => {
    const res = await axios.get(injuryURL, {
      headers: {
        Authorization: "Basic " + btoa(`${apiToken}:MYSPORTSFEEDS`),
      },
      params: {
        player: id,
      },
    });

    dispatch({ type: SET_CURRENT_INJURY, payload: res.data });
  };

  // get teams from API
  const setTeams = async () => {
    setLoading();

    const res = await axios.get(standingsURL, {
      headers: {
        Authorization: "Basic " + btoa(`${apiToken}:MYSPORTSFEEDS`),
      },
    });

    dispatch({ type: SET_TEAMS, payload: res.data.teams });
  };

  // get schedule from API
  const setSchedule = async (date) => {
    setLoading();

    const res = await axios.get(
      `https://api.mysportsfeeds.com/v2.1/pull/nhl/current/date/${date}/games.json?force=false`,
      {
        headers: {
          Authorization: "Basic " + btoa(`${apiToken}:MYSPORTSFEEDS`),
        },
      }
    );

    dispatch({ type: SET_SCHEDULE, payload: res.data.games });
  };

  // get team standings and sort
  const setStandings = async () => {
    setLoading();

    const res = await axios.get(standingsURL, {
      headers: {
        Authorization: "Basic " + btoa(`${apiToken}:MYSPORTSFEEDS`),
      },
    });

    const nhlArr = res.data.teams.slice().sort((a, b) => a.overallRank.rank - b.overallRank.rank);

    let divisionalArr = [[], [], [], []];

    res.data.teams.forEach((team) => {
      if (team.divisionRank.divisionName === "West") {
        divisionalArr[0].push(team);
      } else if (team.divisionRank.divisionName === "East") {
        divisionalArr[1].push(team);
      } else if (team.divisionRank.divisionName === "North") {
        divisionalArr[2].push(team);
      } else {
        divisionalArr[3].push(team);
      }
    });

    divisionalArr.forEach((division) => {
      division.sort((a, b) => a.divisionRank.rank - b.divisionRank.rank);
    });

    dispatch({ type: SET_STANDINGS, payload: [nhlArr, divisionalArr] });
  };

  // clear current injury
  const clearCurrentInjury = () => {
    dispatch({ type: CLEAR_CURRENT_INJURY });
  };

  // set loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <HockeyContext.Provider
      value={{
        loading: state.loading,
        teams: state.teams,
        schedule: state.schedule,
        players: state.players,
        nhlStandings: state.nhlStandings,
        divisionalStandings: state.divisionalStandings,
        currentInjury: state.currentInjury,
        setTeams,
        setSchedule,
        setPlayers,
        setStandings,
        sortPlayers,
        setCurrentInjury,
        clearCurrentInjury,
        setLoading,
      }}>
      {props.children}
    </HockeyContext.Provider>
  );
};

export default HockeyState;
