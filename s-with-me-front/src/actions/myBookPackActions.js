import Api from '../Api';

export const FETCH_MY_BOOK_LIST = 'myBook/FETCH_MY_BOOK_LIST';
export const FETCH_FILTERED_MY_BOOK_LIST = 'myBook/FETCH_FILTERED_MY_BOOK_LIST';
export const UPDATE_MY_BOOK = 'myBook/UPDATE_MY_BOOK';
export const MOVE_MY_BOOK = 'myBook/MOVE_MY_BOOK';
export const CREATE_CURRICULLUM = 'myBook/CREATE_CURRICULLUM';

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

export function requestFilteredMyBookList(params) {
  return {
    type: FETCH_FILTERED_MY_BOOK_LIST,
    promise: Api.get('/student/library/my-book/folderFilter', { params }),
    meta: {
      notification: {
        error: '폴더별 문제집을 불러오는 중에 문제가 발생했습니다.',
      },
    },
  };
}

export function updateMyBook(id, data, onComplete) {
  return {
    type: UPDATE_MY_BOOK,
    promise: Api.put(`/student/library/my-book/${id}`, data),
    meta: {
      onSuccess: onComplete,
      notification: {
        success: '마지막으로 푼 문제가 성공적으로 저장되었습니다.',
      },
    },
  };
}

export function moveMyBook(id, data, onComplete) {
  return {
    type: MOVE_MY_BOOK,
    promise: Api.put(`/student/library/my-book/${id}/folder`, data),
    meta: {
      onSuccess: onComplete,
      notification: {
        success: '폴더 이동이 성공적으로 완료되었습니다.',
      },
    },
  };
}

export function createCurriculum(data, onComplete) {
  return {
    type: CREATE_CURRICULLUM,
    promise: Api.post('/student/library/curriculum', data),
    meta: {
      onSuccess: onComplete,
      notification: {
        success: '커리큘럼 설정이 성공적으로 완료되었습니다.',
      },
    },
  };
}
