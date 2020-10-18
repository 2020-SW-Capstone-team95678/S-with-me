import Api from '../Api';

export const FETCH_PUBLISHER_INVENTORY = 'publisher/FETCH_PUBLISHER_INVENTORY';
export const CREATE_PUBLISHER_BOOK = 'publisher/CREATE_PUBLISHER_BOOK';
export const UPDATE_PUBLISHER_BOOK = 'publisher/UPDATE_PUBLISHER_BOOK';
export const DELETE_PUBLISHER_BOOK = 'publisher/DELETE_PUBLISHER_BOOK';

export const requestBookList = params => {
  return {
    type: FETCH_PUBLISHER_INVENTORY,
    promise: Api.get('/publisher/library/book', { params: params }),
    meta: {
      notification: {
        error: '문제집 목록을 불러오는 중에 문제가 발생했습니다.',
      },
    },
  };
};

export function createBook(data, onComplete) {
  return {
    type: CREATE_PUBLISHER_BOOK,
    promise: Api.post('/publisher/library/book', data),
    meta: {
      onSuccess: onComplete,
      notification: {
        success: '문제집 등록이 성공적으로 완료되었습니다.',
        error: '문제집 등록에 실패했습니다.',
      },
    },
  };
}

export function updateBook(id, data, onComplete) {
  return {
    type: UPDATE_PUBLISHER_BOOK,
    promise: Api.put(`/publisher/library/book/${id}`, data),
    meta: {
      onSuccess: onComplete,
      notification: {
        success: '책 정보 수정에 성공했습니다.',
      },
    },
  };
}

export function deleteBook(id, onComplete) {
  return {
    type: DELETE_PUBLISHER_BOOK,
    promise: Api.delete('/publisher/library/book', { params: { bookId: id } }),
    meta: {
      onSuccess: onComplete,
      notification: {
        success: '문제집 삭제 성공',
      },
    },
  };
}
