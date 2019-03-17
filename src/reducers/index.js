import { combineReducers } from 'redux';
import DateReducer from './ReducerDate';
import ToggleReducer from './ReducerToggle';
import ScheduleReducer from './ReducerSchedule';
import DialogReducer from './ReducerDialog';

const rootReducer = combineReducers({
  date: DateReducer,
  toggle: ToggleReducer,
  schedule: ScheduleReducer,
  dialog: DialogReducer,
});

export default rootReducer;