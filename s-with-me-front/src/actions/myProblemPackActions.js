import Api from '../Api';

export const FETCH_MY_PROBLEM_LIST = 'myProblem/FETCH_MY_PROBLEM_LIST';
export const UPDATE_MY_PROBLEM = 'myProblem/UPDATE_MY_PROBLEM';

export function requestMyProblemList(id, params, pageNumber = 1) {
  const subChapterId = params.subChapterId;
  return {
    type: FETCH_MY_PROBLEM_LIST,
    promise: Api.get(`/student/library/my-book/${id}/main-chapter/sub-chapter/${subChapterId}`, {
      params: { page: pageNumber },
    }),
    meta: {
      pageNumber: pageNumber,
      notification: {
        error: '문제 목록을 가져오는 중에 문제가 발생했습니다.',
      },
    },
  };
}

export function updateMyProblem(myProblemId, data, onComplete) {
  return {
    type: UPDATE_MY_PROBLEM,
    promise: Api.put(`/student/library/my-book/my-problems/${myProblemId}`, data),
    meta: {
      onSuccess: onComplete,
      notification: {
        sucess: '채점되었습니다',
      },
    },
  };
}
