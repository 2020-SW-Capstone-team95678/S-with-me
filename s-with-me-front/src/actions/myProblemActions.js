export const SET_MY_PROBLEM_LIST = 'myProblem/SET_MY_PROBLEM_LIST';
export const SET_MY_ANSWER = 'myProblem/SET_MY_ANSWER';

export const setMyProblemList = myProblemList => ({
  type: SET_MY_PROBLEM_LIST,
  payload: myProblemList,
});

export const setMyAnswer = (id, myAnswer) => ({
  type: SET_MY_ANSWER,
  payload: { id, myAnswer },
});
