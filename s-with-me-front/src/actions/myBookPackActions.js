import Api from '../Api';

export const FETCH_MY_BOOK_LIST = 'myBook/FETCH_MY_BOOK_LIST';
export const UPDATE_LAST_PROBLEM_ID = 'myBook/UPDATE_LAST_PROBLEM_ID';

export function requestMyBookList(params) {
  return {
    type: FETCH_MY_BOOK_LIST,
    promise: Api.get('/student/library', { params: params }),
    meta: {
      notification: {
        error: '문제집을 불러오는 중에 문제가 발생했습니다.',
      },
    },
  };
}

export function updateLastProblemId(id, data, onComplete) {
  return {
    type: UPDATE_LAST_PROBLEM_ID,
    promise: Api.put(`/student/library/my-book/${id}`, data),
    meta: {
      onSuccess: onComplete,
      notification: {
        success: '마지막으로 푼 문제가 성공적으로 저장되었습니다.',
      },
    },
  };
}
