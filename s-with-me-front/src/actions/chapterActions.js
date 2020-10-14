import Api from '../Api';

export const FETCH_CHAPTER_LIST = 'chapter/FETCH_CHAPTER_LIST';
export const CREATE_MAIN_CHAPTER = 'chapter/CREATE_MAIN_CHAPTER';
export const UPDATE_MAIN_CHAPTER = 'chapter/UPDATE_MAIN_CHAPTER';
export const DELETE_MAIN_CHAPTER = 'chapter/DELETE_MAIN_CHAPTER';

export function requestChapterList(params, isPublisher) {
  return {
    type: FETCH_CHAPTER_LIST,
    promise: isPublisher
      ? Api.get(`/library/book/${params.bookId}/chapters`)
      : Api.get('/student/library/my-book/chapters', { params: params }),
    meta: {
      notification: {
        error: '목차를 불러오는 중에 문제가 발생했습니다.',
      },
    },
  };
}

export function createMainChapter(data, onComplete) {
  return {
    type: CREATE_MAIN_CHAPTER,
    promise: Api.post('/publisher/library/book/main-chapter', data),
    meta: {
      onSuccess: onComplete,
      notification: {
        success: '대단원 등록이 성공적으로 완료되었습니다.',
      },
    },
  };
}

export function updateMainChapter(id, data, onComplete) {
  return {
    type: UPDATE_MAIN_CHAPTER,
    promise: Api.put(`/publisher/library/book/main-chapter/${id}`, data),
    meta: {
      onSuccess: onComplete,
      notification: {
        success: '대단원 수정에 성공했습니다.',
      },
    },
  };
}

export function deleteMainChapter(id, onComplete) {
  return {
    type: DELETE_MAIN_CHAPTER,
    promise: Api.delete(`/publisher/library/book/main-chapter/${id}`),
    meta: {
      onSuccess: onComplete,
      notification: {
        success: '대단원 삭제 성공',
      },
    },
  };
}
