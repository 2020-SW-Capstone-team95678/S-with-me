export const SET_LAST_MY_PROBLEM = 'myBook/SET_LAST_MY_PROBLEM';

export const setLastMyProblem = (id, lastMyProblemId) => ({
  type: SET_LAST_MY_PROBLEM,
  payload: { id, lastMyProblemId },
});
