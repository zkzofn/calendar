import { MENU_SQL } from '../actions/RequestManager';

const INITIAL_STATE = { selectedMenu: MENU_SQL };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case MENU_SQL:
      return { ...state, selectedMenu: action.payload };

    default:
      return state;
  }
}