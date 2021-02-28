import {
  SET_LOADING,
  SET_TEAMS,
  SET_SCHEDULE,
  SET_PLAYERS,
  SET_CURRENT_INJURY,
  CLEAR_CURRENT_INJURY,
  SORT_PLAYERS,
} from "../types";

export default (state, action) => {
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
    case SORT_PLAYERS:
      return {
        ...state,
        players: action.payload,
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
