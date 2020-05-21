import Api from '../Api';

export const LOADING_MY_PROBLEM_LIST = 'myProblem/LOADING_MY_PROBLEM_LIST';
export const SET_MY_PROBLEM_LIST = 'myProblem/SET_MY_PROBLEM_LIST';
export const SET_MY_ANSWER = 'myProblem/SET_MY_ANSWER';
export const SET_IS_CONFUSED = 'myProblem/SET_IS_CONFUSED';
export const SET_MY_SOLUTION = 'myProblem/SET_MY_SOLUTION';
export const SET_SOLVED_DATETIME = 'myProblem/SET_SOLVED_DATETIME';
export const SET_IS_RIGHT = 'myProblem/SET_IS_RIGHT';
export const SET_ERROR = 'myProblem/SET_ERROR';
export const SOLVE_COMPLETE = 'myProblem/SOLVE_COMPLETE';

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
export const setMyProblemList = (myProblemList) => ({
  type: SET_MY_PROBLEM_LIST,
  payload: myProblemList,
});

export function requestMyProblemList(id, params) {
  return (dispatch) => {
    dispatch(loading());
    Api.get(`/student/library/my-book/${id}/my-problems`, { params }).then(
      ({ data }) => dispatch(setMyProblemList(data)),
      (error) => {
        dispatch(setError(error.response.data.errorMessage));
      },
    );
  };
}

export const setMyAnswer = (id, myAnswer) => ({
  type: SET_MY_ANSWER,
  payload: { id, myAnswer },
});

export const setIsConfused = (id, confused) => ({
  type: SET_IS_CONFUSED,
  payload: { id, confused },
});

export const setMySolution = (id, mySolution) => ({
  type: SET_MY_SOLUTION,
  payload: { id, mySolution },
});

export const setSolvedDateTime = (id, solvedDateTime) => ({
  type: SET_SOLVED_DATETIME,
  payload: { id, solvedDateTime },
});

export const setIsRight = (id, right) => ({
  type: SET_IS_RIGHT,
  payload: { id, right },
});

export function solveComplete() {
  return { type: SOLVE_COMPLETE };
}

export function createSolvedData(myProblemId, data, onComplete) {
  return (dispatch) =>
    Api.put(`/student/library/my-book/my-problems/${myProblemId}`, data).then(
      ({ data }) => {
        dispatch(solveComplete());
        onComplete();
      },
      (error) => dispatch(setError(error.response.data.message)),
    );
}
