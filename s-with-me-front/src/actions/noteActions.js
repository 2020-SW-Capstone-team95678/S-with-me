import Api from '../Api';

export const FETCH_NOTE_LIST = 'note/FETCH_NOTE_LIST';
export const DELETE_NOTE = 'note/DELETE_NOTE';

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

export function deleteNote(params, onComplete) {
  return {
    type: DELETE_NOTE,
    promise: Api.delete('/student/note', { params }),
    meta: {
      onSuccess: onComplete,
      notification: {
        error: '오답노트 삭제에 실패했습니다',
      },
    },
  };
}
