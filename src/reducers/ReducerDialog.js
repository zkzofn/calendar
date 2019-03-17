import {
  OPEN_DIALOG,
  CLOSE_DIALOG,
  SET_DIALOG_START_TIME,
  SET_DIALOG_END_TIME,
  SET_ERROR_MESSAGE,
} from '../actions/RequestManager';

const INITIAL_STATE = {
  open: false,
  startTime: new Date(),
  endTime: new Date(),
  errorMessage: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case OPEN_DIALOG:
      return {
        ...state,
        open: true,
        startTime: action.payload.startTime,
        endTime: action.payload.endTime,
        errorMessage: null,
      };

    case CLOSE_DIALOG:
      return { ...state, open: false };

    case SET_ERROR_MESSAGE:
      return { ...state, errorMessage: action.payload }

    case SET_DIALOG_START_TIME:
      return { ...state, startTime: action.payload };

    case SET_DIALOG_END_TIME:
      return { ...state, endTime: action.payload};

    default:
      return state;
  }
}