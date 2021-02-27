import {
  SET_LOADING,
  SET_TEAMS,
  SET_SCHEDULE,
  SET_SCHEDULE_DATE,
  SET_DISPLAY_DATE,
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
    case SET_SCHEDULE_DATE:
      return {
        ...state,
        schedDate: action.payload,
        loading: false,
      };
    case SET_DISPLAY_DATE:
      return {
        ...state,
        displayDate: action.payload,
        loading: false,
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
