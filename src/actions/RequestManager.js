import { DATATYPE } from './constants';

export const GET_NOW = 'GET_NOW';
export const SET_PREV_CONTROL_MONTH = 'SET_PREV_CONTROL_MONTH';
export const SET_NEXT_CONTROL_MONTH = 'SET_NEXT_CONTROL_MONTH';
export const TOGGLE_MONTH_WEEK = 'TOGGLE_MONTH_WEEK';
export const SAVE_SCHEDULE = 'SAVE_SCHEDULE';
export const CHECK_SCHEDULE = 'CHECK_SCHEDULE';
export const OPEN_DIALOG = 'OPEN_DIALOG';
export const CLOSE_DIALOG = 'CLOSE_DIALOG';
export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
export const SET_DIALOG_START_TIME = 'SET_DIALOG_START_TIME';
export const SET_DIALOG_END_TIME = 'SET_DIALOG_END_TIME';

export function getNow() {
  return {
    type: GET_NOW,
    payload: new Date(),
  };
}

export function setPrevControlMonth() {
  return {
    type: SET_PREV_CONTROL_MONTH,
  }
}

export function setNextControlMonth() {
  return {
    type: SET_NEXT_CONTROL_MONTH,
  }
}

export function toggleMonthWeek() {
  return {
    type: TOGGLE_MONTH_WEEK,
  }
}

export function openDialog(startTime, endTime) {
  return {
    type: OPEN_DIALOG,
    payload: { startTime, endTime},
  }
}

export function closeDialog() {
  return {
    type: CLOSE_DIALOG,
  }
}

export function setErrorMessage(errorMessage) {
  return {
    type: SET_ERROR_MESSAGE,
    payload: errorMessage,
  }
}

export function setDialogStartTime(startTime) {
  return {
    type: SET_DIALOG_START_TIME,
    payload: startTime,
  }
}


export function setDialogEndTime(endTime) {
  return {
    type: SET_DIALOG_END_TIME,
    payload: endTime,
  }
}

export function saveSchedule(title, startTime, endTime) {
  let data = JSON.parse(localStorage.getItem(DATATYPE.SCHEDULE));

  if (data === null) {
    data = [];
  }
  data.push({title, startTime, endTime});
  localStorage.setItem(DATATYPE.SCHEDULE, JSON.stringify(data));

  return {
    type: SAVE_SCHEDULE,
    payload: data,
  }
}

export function checkSchedule(startTime, endTime) {
  console.log(startTime, endTime);
  let data = JSON.parse(localStorage.getItem(DATATYPE.SCHEDULE));

  if (data === null) {
    return true;
  } else {
    return data.filter(schedule => !(new Date(schedule.startTime) >= endTime || new Date(schedule.endTime) <= startTime)).length === 0;
  }
}

export function convertTime(index) {
  const divider = index / 12 >= 1 ? "오후" : "오전";
  const time = index % 12 === 0 ? 12 : index % 12;

  return `${divider} ${time}시`;
}

