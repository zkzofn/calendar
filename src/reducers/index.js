import { combineReducers } from 'redux';
import DateReducer from './ReducerDate';

const rootReducer = combineReducers({
  date: DateReducer,
});

export default rootReducer;