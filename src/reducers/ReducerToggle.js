import { SELECT_MONTH_WEEK } from '../actions/RequestManager';

const INITIAL_STATE = {
  monthWeek: true
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SELECT_MONTH_WEEK:
      return { ...state, monthWeek: action.payload };

    default:
      return state;
  }
}