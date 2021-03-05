import {
  SET_LOADING,
  SET_TEAMS,
  SET_SCHEDULE,
  SET_PLAYERS,
  SET_CURRENT_INJURY,
  CLEAR_CURRENT_INJURY,
  SORT_PLAYERS,
  SET_STANDINGS,
  SET_CURRENT_PLAYER,
  CLEAR_CURRENT_PLAYER,
} from "../types";

const HockeyReducer = (state, action) => {
  switch (action.type) {
    case SET_TEAMS:
      return {
        ...state,
        teams: action.payload,
        loading: false,
      };
    case SET_SCHEDULE:
      return {
        ...state,
        schedule: action.payload,
        loading: false,
      };
    case SET_PLAYERS:
      return {
        ...state,
        players: action.payload,
      };
    case SET_STANDINGS:
      return {
        ...state,
        nhlStandings: action.payload[0],
        divisionalStandings: action.payload[1],
        loading: false,
      };
    case SORT_PLAYERS:
      return {
        ...state,
        players: action.payload,
      };
    case SET_CURRENT_PLAYER:
      return {
        ...state,
        currentPlayer: action.payload,
        loading: false,
      };
    case CLEAR_CURRENT_PLAYER:
      return {
        ...state,
        currentPlayer: null,
      };
    case SET_CURRENT_INJURY:
      return {
        ...state,
        currentInjury: action.payload,
      };
    case CLEAR_CURRENT_INJURY:
      return {
        ...state,
        currentInjury: null,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default HockeyReducer;
