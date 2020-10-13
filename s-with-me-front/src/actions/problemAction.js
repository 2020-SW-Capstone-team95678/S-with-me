import Api from '../Api';

export const FETCH_PROBLEM_LIST = 'publisher/FETCH_PROBLEM_LIST';
export const CREATE_PROBLEM = 'publisher/CREATE_PROBLEM';
export const UPDATE_PROBLEM = 'publisher/UPDATE_PROBLEM';
export const DELETE_PROBLEM = 'publisher/DELETE_PROBLEM';

export const requestProblemList = params => {
  return {
    type: FETCH_PROBLEM_LIST,
    promise: Api.get('/publisher/library/book/main-chapter', { params: params }),
    meta: {
      notification: {
        error: '문제 목록을 불러오는 중에 문제가 발생했습니다.',
      },
    },
  };
};

export function createProblem(data, onComplete) {
  return {
    type: CREATE_PROBLEM,
    promise: Api.post('/publisher/library/book/main-chapter/sub-chapter/problem', data),
    meta: {
      onSuccess: onComplete,
      notification: {
        success: '문제 등록이 성공적으로 완료되었습니다.',
      },
    },
  };
}

export function updateProblem(id, data, onComplete) {
  return {
    type: UPDATE_PROBLEM,
    promise: Api.put(`/publisher/library/book/main-chapter/sub-chapter/problem/${id}`, data),
    meta: {
      onSuccess: onComplete,
      notification: {
        success: '문제 수정이 성공적으로 완료되었습니다.',
      },
    },
  };
}

export function deleteProblem(id, onComplete) {
  return {
    type: DELETE_PROBLEM,
    promise: Api.delete(`/publisher/library/book/main-chapter/sub-chapter/problem/${id}`),
    meta: {
      onSuccess: onComplete,
      notification: {
        success: '문제가 삭제되었습니다.',
        error: '문제 삭제에 실패하였습니다.',
      },
    },
  };
}
