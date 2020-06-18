import Api from '../Api';

export const FETCH_MY_BOOK_LIST = 'myBook/FETCH_MY_BOOK_LIST';
export const FETCH_FILTERED_MY_BOOK_LIST = 'myBook/FETCH_FILTERED_MY_BOOK_LIST';
export const UPDATE_MY_BOOK = 'myBook/UPDATE_MY_BOOK';
export const MOVE_MY_BOOK = 'myBook/MOVE_MY_BOOK';
export const DELETE_MY_BOOK = 'myBook/DELETE_MY_BOOK';
export const CREATE_MY_BOOK = 'myBook/CREATE_MY_BOOK';

export function requestMyBookList(params, filterType = null) {
  return {
    type: FETCH_MY_BOOK_LIST,
    promise:
      filterType === 'ALPHABET'
        ? Api.get(`/student/${params.studentId}/library/my-book/alphabet-filter`)
        : Api.get('/student/library', { params: params }),
    meta: {
      notification: {
        error: '문제집을 불러오는 중에 문제가 발생했습니다.',
      },
    },
  };
}

export function requestFilteredMyBookList(filterType, params, id = null) {
  return {
    type: FETCH_FILTERED_MY_BOOK_LIST,
    promise:
      filterType === 'FOLDER'
        ? Api.get('/student/library/my-book/folder-filter', { params })
        : Api.get(`/student/${id}/library/my-book/subject-filter`, { params }),
    meta: {
      notification: {
        error:
          filterType === 'FOLDER'
            ? '폴더별 문제집을 불러오는 중에 문제가 발생했습니다.'
            : '과목별 문제집을 불러오는 중에 문제가 발생했습니다.',
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

export function buyMyBook(data, onComplete) {
  return {
    type: CREATE_MY_BOOK,
    promise: Api.post('/student/library/my-book', data),
    meta: {
      onSuccess: onComplete,
      notification: {
        success: '책 구입이 성공적으로 완료되었습니다',
        error: '책 구매에 실패하였습니다.',
      },
    },
  };
}

export function deleteMyBook(id, onComplete) {
  return {
    type: DELETE_MY_BOOK,
    promise: Api.delete(`/student/library/my-book/${id}`),
    meta: {
      onSuccess: onComplete,
      notification: {
        success: '나의 책이 삭제되었습니다.',
        error: '나의 책 삭제에 실패하였습니다.',
      },
    },
  };
}
