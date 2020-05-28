import Api from '../Api';

export const FETCH_NOTE_LIST = 'note/FETCH_NOTE_LIST';

export function requestNoteList(params) {
  return {
    type: FETCH_NOTE_LIST,
    promise: Api.get('student/note', { params }),
    meta: {
      notification: {
        error: '오답노트 목록을 가져오는 중에 문제가 발생했습니다.',
      },
    },
  };
}
