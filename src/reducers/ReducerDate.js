import {
  GET_NOW,
  SET_PREV_CONTROL_MONTH,
  SET_NEXT_CONTROL_MONTH,
} from '../actions/RequestManager';

const now = new Date();
const INITIAL_STATE = {
  today: now,
  now: now,
  controlYear: now.getFullYear(),
  controlMonth: now.getMonth() + 1,
  monthChangeValue: now.getMonth(),
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_NOW:
      return { ...state, now: action.payload };

    case SET_PREV_CONTROL_MONTH:
      return {
        ...state,
        monthChangeValue: state.monthChangeValue - 1,
        controlYear: new Date((new Date()).setMonth(state.monthChangeValue - 1)).getFullYear(),
        controlMonth: new Date((new Date()).setMonth(state.monthChangeValue - 1)).getMonth() + 1,
      };

    case SET_NEXT_CONTROL_MONTH:
      return {
        ...state,
        monthChangeValue: state.monthChangeValue + 1,
        controlYear: new Date((new Date()).setMonth(state.monthChangeValue + 1)).getFullYear(),
        controlMonth: new Date((new Date()).setMonth(state.monthChangeValue + 1)).getMonth() + 1,
      };

    default:
      return state;
  }
}