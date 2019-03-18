import {
  GET_NOW,
  SET_PREV_CONTROL_MONTH,
  SET_NEXT_CONTROL_MONTH,
  SET_PREV_CONTROL_WEEK,
  SET_NEXT_CONTROL_WEE,
} from '../actions/RequestManager';

const now = new Date();
const INITIAL_STATE = {
  today: now,
  now: now,
  controlYear: now.getFullYear(),
  controlMonth: now.getMonth() + 1,
  controlDate: now.getDate(),
  diffMonth: now.getMonth(),
  diffWeek: 0,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_NOW:
      return { ...state, now: action.payload };

    case SET_PREV_CONTROL_MONTH:
      return {
        ...state,
        diffMonth: state.diffMonth - 1,
        controlYear: new Date((new Date()).setMonth(state.diffMonth - 1)).getFullYear(),
        controlMonth: new Date((new Date()).setMonth(state.diffMonth - 1)).getMonth() + 1,
      };

    case SET_NEXT_CONTROL_MONTH:
      return {
        ...state,
        diffMonth: state.diffMonth + 1,
        controlYear: new Date((new Date()).setMonth(state.diffMonth + 1)).getFullYear(),
        controlMonth: new Date((new Date()).setMonth(state.diffMonth + 1)).getMonth() + 1,
      };

    default:
      return state;
  }
}