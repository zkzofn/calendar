import { DATATYPE } from './constants';

export const GET_NOW = 'GET_NOW';
export const SET_NOW = 'SET_NOW';
export const SET_PREV_CONTROL_MONTH = 'SET_PREV_CONTROL_MONTH';
export const SET_NEXT_CONTROL_MONTH = 'SET_NEXT_CONTROL_MONTH';
export const SET_PREV_CONTROL_WEEK = 'SET_PREV_CONTROL_WEEK';
export const SET_NEXT_CONTROL_WEEK = 'SET_NEXT_CONTROL_WEEK';
export const SELECT_MONTH_WEEK = 'TOGGLE_MONTH_WEEK';
export const SAVE_SCHEDULE = 'SAVE_SCHEDULE';
export const CHECK_SCHEDULE = 'CHECK_SCHEDULE';
export const OPEN_DIALOG = 'OPEN_DIALOG';
export const CLOSE_DIALOG = 'CLOSE_DIALOG';
export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
export const SET_DIALOG_START_TIME = 'SET_DIALOG_START_TIME';
export const SET_DIALOG_END_TIME = 'SET_DIALOG_END_TIME';
export const SET_TITLE = 'SET_TITLE';
export const DELETE_SCHEDULE = 'DELETE_SCHEDULE';
export const OPEN_ALERT = 'OPEN_ALERT';
export const CLOSE_ALERT = 'CLOSE_ALERT';
export const SET_ALERT_ERROR_MESSAGE = 'SET_ALERT_ERROR_MESSAGE';

export function getNow() {
  return {
    type: GET_NOW,
    payload: new Date(),
  };
}

export function setNow() {
  return {
    type: SET_NOW,
  }
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

export function setPrevControlWeek() {
  return {
    type: SET_PREV_CONTROL_WEEK,
  }
}

export function setNextControlWeek() {
  return {
    type: SET_NEXT_CONTROL_WEEK,
  }
}

export function selectMonthWeek(monthBool) {
  return {
    type: SELECT_MONTH_WEEK,
    payload: monthBool
  }
}

export function openDialog(startTime, endTime, title) {
  return {
    type: OPEN_DIALOG,
    payload: { startTime, endTime, title },
  }
}

export function closeDialog() {
  return {
    type: CLOSE_DIALOG,
  }
}

export function setTitle(value) {
  return {
    type: SET_TITLE,
    payload: value,
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

/**
 * originSchedule: 수정인지 신규 등록인지 구분에 쓰임
 */
export function checkSchedule(startTime, endTime, originSchedule) {
  let data = JSON.parse(localStorage.getItem(DATATYPE.SCHEDULE));


  if (data === null) {
    return true;
  } else {
    if (originSchedule.title !== null) {
      data = data.filter(schedule => {
        return !(schedule.title === originSchedule.title && new Date(schedule.startTime).getTime() === new Date(originSchedule.startTime).getTime() && new Date(schedule.endTime).getTime() === new Date(originSchedule.endTime).getTime());
      })
    }

    return data.filter(schedule => {
      return (new Date(schedule.startTime) <= startTime && startTime < new Date(schedule.endTime)) || (new Date(schedule.startTime) < endTime && endTime <= new Date(schedule.endTime))
    }).length === 0;
  }
}

export function deleteSchedule(originSchedule) {
  let data = JSON.parse(localStorage.getItem(DATATYPE.SCHEDULE));


  data = data.filter(schedule => {
    return !(schedule.title === originSchedule.title && new Date(schedule.startTime).getTime() === new Date(originSchedule.startTime).getTime() && new Date(schedule.endTime).getTime() === new Date(originSchedule.endTime).getTime());
  });
  localStorage.setItem(DATATYPE.SCHEDULE, JSON.stringify(data));

  return {
    type: DELETE_SCHEDULE,
    payload: data
  }

}

export function convertTime(index) {
  const divider = index / 12 >= 1 ? "오후" : "오전";
  const time = index % 12 === 0 ? 12 : index % 12;

  return `${divider} ${time}시`;
}


export function openAlert() {
  return {
    type: OPEN_ALERT
  }
}

export function closeAlert() {
  return {
    type: CLOSE_ALERT
  }
}

export function setALertErrorMessage(errorMessage) {
  return {
    type: SET_ALERT_ERROR_MESSAGE,
    payload: errorMessage
  }
}
