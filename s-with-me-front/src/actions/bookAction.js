import Api from '../Api';

export const FETCH_BOOK_LIST = 'bookstore/REQUEST_BOOK_LIST';
export const FETCH_AD_BOOK_LIST = 'bookstore/FETCH_AD_BOOK_LIST';
export const CREATE_BOOK = 'book/CREATE_BOOK';

export function requestBookList(grade, subject) {
  return {
    type: FETCH_BOOK_LIST,
    promise: Api.get(`/student/bookstore/${grade}`, { params: { subject: subject } }),
    meta: {
      notification: {
        error: '일반 서적 목록을 불러오는 중에 문제가 발생했습니다.',
      },
    },
  };
}

export function requestAdBookList(grade, subject) {
  return {
    type: FETCH_AD_BOOK_LIST,
    promise: Api.get(`/student/bookstore/s-with-me-pick/${grade}`, {
      params: { subject: subject },
    }),
    meta: {
      notification: {
        error: '광고 서적 목록을 불러오는 중에 문제가 발생했습니다.',
      },
    },
  };
}

export function createBook(data, onComplete) {
  const formValue = {
    grade: data.bookGrade,
    name: data.bookName,
    price: data.bookPrice,
    publisherId: 1,
    subject: data.bookSubgect,
  };
  return {
    type: CREATE_BOOK,
    promise: Api.post('/publisher/library/book', formValue),
    meta: {
      onSuccess: onComplete,
      notification: {
        success: '등록이 완료되었습니다.',
        error: '등록에 실패하였습니다.',
      },
    },
  };
}
