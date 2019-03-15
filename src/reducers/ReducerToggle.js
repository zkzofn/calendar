import { TOGGLE_MONTH_WEEK } from '../actions/RequestManager';

const INITIAL_STATE = {
  monthWeek: true
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case TOGGLE_MONTH_WEEK:
      return { ...state, monthWeek: !state.monthWeek };

    default:
      return state;
  }
}