export const SET_LAST_MY_PROBLEM_ID = 'myBook/SET_LAST_MY_PROBLEM_ID';

export const setLastMyProblemId = (id, lastProblemId) => ({
  type: SET_LAST_MY_PROBLEM_ID,
  payload: { id, lastProblemId },
});
