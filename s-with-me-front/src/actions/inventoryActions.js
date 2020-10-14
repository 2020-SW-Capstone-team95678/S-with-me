import Api from '../Api';

export const FETCH_PUBLISHER_INVENTORY = 'publisher/FETCH_PUBLISHER_INVENTORY';

export const requestBookList = params => {
  return {
    type: FETCH_PUBLISHER_INVENTORY,
    promise: Api.get('/publisher/library/book', { params: params }),
    meta: {
      notification: {
        error: '문제집을 불러오는 중에 문제가 발생했습니다.',
      },
    },
  };
};
