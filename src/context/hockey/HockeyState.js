import { useReducer } from "react";
import axios from "axios";
import HockeyContext from "./hockeyContext";
import HockeyReducer from "./hockeyReducer";
import {
  SET_LOADING,
  SET_TEAMS,
  SET_SCHEDULE,
  SET_SCHEDULE_DATE,
  SET_DISPLAY_DATE,
} from "../types";

import React from "react";

const HockeyState = (props) => {
  const initialState = {
    loading: false,
    teams: [],
    schedule: [],
    schedDate: formatDate(setNewDate(Date.now())),
    displayDate: setNewDate(Date.now),
  };

  const apiToken = process.env.REACT_APP_API_KEY;
  //   const scheduleURL = `https://api.mysportsfeeds.com/v2.1/pull/nhl/current/date/${schedDate}/games.json?force=false`;
  const standingsURL =
    "https://api.mysportsfeeds.com/v2.1/pull/nhl/current/standings.json?force=false";
  const statsURL =
    "https://api.mysportsfeeds.com/v2.1/pull/nhl/2021-regular/player_stats_totals.json?force=false";
  const injuryURL = "https://api.mysportsfeeds.com/v2.1/pull/nhl/injury_history.json?player=";

  const [state, dispatch] = useReducer(HockeyReducer, initialState);

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

  // set the date for display
  const setDisplayDate = (date) => {
    setLoading();
    dispatch({ type: SET_DISPLAY_DATE, payload: setNewDate(date) });
  };

  //set the date for schedule url
  const setSchedDate = (date) => {
    setLoading();
    dispatch({ type: SET_SCHEDULE_DATE, payload: formatDate(setNewDate(date)) });
  };

  // set loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <HockeyContext.Provider
      value={{
        loading: state.loading,
        teams: state.teams,
        schedule: state.schedule,
        schedDate: state.schedDate,
        displayDate: state.displayDate,
        setTeams,
        setSchedule,
        setDisplayDate,
        setSchedDate,
        setLoading,
      }}>
      {props.children}
    </HockeyContext.Provider>
  );
};

export default HockeyState;

function setNewDate(date) {
  const tzOffset = new Date().getTimezoneOffset() * 60000;

  return new Date(date - tzOffset).toISOString().slice(0, 10);
}

function formatDate(date) {
  return date.replace(/-/g, "");
}
