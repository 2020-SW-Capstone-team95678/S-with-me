export const SET_LAST_MY_PROBLEM_PAGE = 'myBook/SET_LAST_MY_PROBLEM_PAGE';

export const setLastMyProblemPage = (id, lastPageNumber) => ({
  type: SET_LAST_MY_PROBLEM_PAGE,
  payload: { id, lastPageNumber },
});
