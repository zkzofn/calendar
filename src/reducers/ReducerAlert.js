import {
  OPEN_ALERT,
  CLOSE_ALERT,
  SET_ALERT_ERROR_MESSAGE,
} from '../actions/RequestManager';

const INITIAL_STATE = {
  open: false,
  errorMessage: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case OPEN_ALERT:
      return {
        ...state,
        open: true,
      };

    case CLOSE_ALERT:
      return { ...state, open: false, errorMessage: null };

    case SET_ALERT_ERROR_MESSAGE:
      return { ...state, errorMessage: action.payload }

    default:
      return state;
  }
}