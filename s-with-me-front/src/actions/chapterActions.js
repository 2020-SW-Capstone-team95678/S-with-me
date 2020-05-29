import Api from '../Api';

export const FETCH_CHAPTER_LIST = 'chapter/FETCH_CHAPTER_LIST';

export function requestChapterList(params) {
  const bookId = params.bookId;
  return {
    type: FETCH_CHAPTER_LIST,
    promise: Api.get(`/library/book/${bookId}/chapters`),
    meta: {
      notification: {
        error: '목차를 불러오는 중에 문제가 발생했습니다.',
      },
    },
  };
}
