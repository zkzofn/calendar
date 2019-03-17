import {
  SAVE_SCHEDULE,
} from '../actions/RequestManager';

import { DATATYPE } from '../actions/constants'

const schedules = JSON.parse(localStorage.getItem(DATATYPE.SCHEDULE));
const INITIAL_STATE = {
  data: schedules ? schedules : []
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SAVE_SCHEDULE:
      return { ...state, data: action.payload };

    default:
      return state;
  }
}