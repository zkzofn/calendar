import { combineReducers } from 'redux';
import DateReducer from './ReducerDate';
import ToggleReducer from './ReducerToggle';

const rootReducer = combineReducers({
  date: DateReducer,
  toggle: ToggleReducer,
});

export default rootReducer;