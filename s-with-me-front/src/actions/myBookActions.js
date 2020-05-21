import Api from '../Api';

export const LOADING_MY_BOOK_LIST = 'myBook/LOADING_MY_BOOK_LIST';
export const SET_MY_BOOK_LIST = 'myBook/SET_MY_BOOK_LIST';
export const SET_LAST_MY_PROBLEM = 'myBook/SET_LAST_MY_PROBLEM';
export const SET_ERROR = 'myBook/SET_ERROR';
export const SOLVE_COMPLETE = 'myBook/SOLVE_COMPLETE';

export function loading() {
  return {
    type: LOADING_MY_BOOK_LIST,
  };
}

export function setError(errorMessage) {
  return {
    type: SET_ERROR,
    payload: { errorMessage },
  };
}
export const setmyBookList = (myBookList) => ({
  type: SET_MY_BOOK_LIST,
  payload: myBookList,
});

export function requestMyBookList(params) {
  console.log('...');
  return (dispatch) => {
    dispatch(loading());
    Api.get('/student/library', { params: params }).then(
      ({ data }) => dispatch(setmyBookList(data)),
      (error) => {
        dispatch(setError(error.response.data.errorMessage));
      },
    );
  };
}

export const setLastMyProblem = (id, lastMyProblemId) => ({
  type: SET_LAST_MY_PROBLEM,
  payload: { id, lastMyProblemId },
});

export function solveComplete() {
  return { type: SOLVE_COMPLETE };
}

// export function createMyBookData(myBookId, data, onComplete) {
//   return (dispatch) =>
//     Api.put(`/student/library/my-book/my-problems/${myBookId}`, data).then(
//       ({ data }) => {
//         dispatch(solveComplete());
//         onComplete();
//       },
//       (error) => dispatch(setError(error.response.data.message)),
//     );
// }
