export const SET_MY_PROBLEM_LIST = 'myProblem/SET_MY_PROBLEM_LIST';
export const SET_MY_SOLUTION = 'myProblem/SET_MY_SOLUTION';
export const SET_IS_CONFUSED = 'myProblem/SET_IS_CONFUSED';
export const SET_IS_RIGHT = 'myProblem/SET_IS_RIGHT';
export const SET_SOLVED_DATE = 'myProblem/SET_SOLVED_DATE';

export const setMyProblemList = myProblemList => ({
  type: SET_MY_PROBLEM_LIST,
  payload: myProblemList,
});
