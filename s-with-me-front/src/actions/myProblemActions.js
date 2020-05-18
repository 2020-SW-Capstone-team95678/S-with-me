import Api from '../Api';
import { showMessage } from './notificationActions';

export const LOADING_MY_PROBLEM_LIST = 'myProblem/LOADING_MY_PROBLEM_LIST';
export const SET_MY_PROBLEM_LIST = 'myProblem/SET_MY_PROBLEM_LIST';
export const SET_MY_ANSWER = 'myProblem/SET_MY_ANSWER';
export const SET_IS_CONFUSED = 'myProblem/SET_IS_CONFUSED';
export const SET_MY_SOLUTION = 'myProblem/SET_MY_SOLUTION';
export const SET_SOLVED_DATETIME = 'myProblem/SET_SOLVED_DATETIME';
export const SET_IS_RIGHT = 'myProblem/SET_IS_RIGHT';
export const SET_ERROR = 'myProblem/SET_ERROR';

export function loading() {
  return {
    type: LOADING_MY_PROBLEM_LIST,
  };
}

export function setError(errorMessage) {
  return {
    type: SET_ERROR,
    payload: { errorMessage },
  };
}
export const setMyProblemList = myProblemList => ({
  type: SET_MY_PROBLEM_LIST,
  payload: myProblemList,
});

export function requestMyProblemList(id, params) {
  return dispatch => {
    dispatch(loading());
    // Api.get(`/student/library/my-book/${id}/my-problems`, { params }).then(({ data }) =>
    //   dispatch(setMyProblemList(data)),
    // );
    Api.get('/myProblemList').then(
      ({ data }) => dispatch(setMyProblemList(data)),
      error => {
        dispatch(setError(error.response.data.errorMessage));
        dispatch(showMessage(error.response.data.errorMessage, true));
      },
    );
  };
}

export const setMyAnswer = (id, myAnswer) => ({
  type: SET_MY_ANSWER,
  payload: { id, myAnswer },
});

export const setIsConfused = (id, isConfused) => ({
  type: SET_IS_CONFUSED,
  payload: { id, isConfused },
});

export const setMySolution = (id, mySolution) => ({
  type: SET_MY_SOLUTION,
  payload: { id, mySolution },
});

export const setSolvedDateTime = (id, solvedDateTime) => ({
  type: SET_SOLVED_DATETIME,
  payload: { id, solvedDateTime },
});

export const setIsRight = (id, isRight) => ({
  type: SET_IS_RIGHT,
  payload: { id, isRight },
});
