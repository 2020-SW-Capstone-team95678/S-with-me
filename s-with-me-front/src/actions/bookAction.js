import Api from '../Api';

export const FETCH_BOOK_LIST = 'bookstore/REQUEST_BOOK_LIST';
export const FETCH_AD_BOOK_LIST = 'bookstore/FETCH_AD_BOOK_LIST';
export const FETCH_SEARCH_RESULT_LIST = 'bookstore/FETCH_SEARCH_RESULT_LIST';
export const SET_BOOKSTORE_FILTER = 'bookstre/SET_BOOKSTORE_FILTER';

const PAGE_SIZE = 8;
export function requestBookList(grade, subject, pageNumber = 1) {
  return {
    type: FETCH_BOOK_LIST,
    promise: Api.get(`/student/bookstore/${grade}`, {
      params: { subject: subject, pageNumber: pageNumber },
    }),
    meta: {
      pageNumber: pageNumber,
      pageSize: PAGE_SIZE,
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

export function requestSearchResultList(bookName, pageNumber = 1) {
  return {
    type: FETCH_SEARCH_RESULT_LIST,
    promise: Api.get('/student/bookstore/search', {
      params: { bookName: bookName, pageNumber: pageNumber },
    }),
    meta: {
      pageNumber: pageNumber,
      pageSize: PAGE_SIZE,
      notification: {
        error: '검색 목록을 불러오는 중에 문제가 발생했습니다.',
      },
    },
  };
}

export const setBookstoreFilter = (filterType, filterValue) => ({
  type: SET_BOOKSTORE_FILTER,
  payload: { filterType, filterValue },
});
