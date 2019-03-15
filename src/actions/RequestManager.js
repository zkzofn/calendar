export const GET_NOW = 'GET_NOW';
export const SET_PREV_CONTROL_MONTH = 'SET_PREV_CONTROL_MONTH';
export const SET_NEXT_CONTROL_MONTH = 'SET_NEXT_CONTROL_MONTH';

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