import Api from '../Api';

export const FETCH_NOTE_LIST = 'note/FETCH_NOTE_LIST';
export const UPDATE_NOTE = 'note/UPDATE_NOTE';
export const DELETE_NOTE = 'note/DELETE_NOTE';
export const SET_RESOLVE = 'note/SET_RESOLVE';
export const SET_MY_NEW_ANSWER = 'note/SET_MY_NEW_ANSWER';
export const SET_MY_NEW_SOLUTION = 'note/SET_MY_NEW_SOLUTION';
export const SET_NEW_IS_RIGHT = 'note/SET_NEW_IS_RIGHT';
export const SET_NEW_SOLVED_DATE_TIME = 'note/SET_NEW_SOLVED_DATE_TIME';

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

export function updateNote(id, data, onComplete) {
  return {
    type: UPDATE_NOTE,
    promise: Api.put(`/student/note/${id}`, data),
    meta: {
      onSuccess: onComplete,
      notification: {
        error: '오답노트 업데이트에 실패했습니다',
      },
    },
  };
}

export const setResolve = (id, resolve) => ({
  type: SET_RESOLVE,
  payload: { id, resolve },
});

export const setMyNewAnswer = (id, myAnswer) => ({
  type: SET_MY_NEW_ANSWER,
  payload: { id, myAnswer },
});

export const setMyNewSolution = (id, myNewSolution) => ({
  type: SET_MY_NEW_SOLUTION,
  payload: { id, myNewSolution },
});

export const setNewIsRight = (id, isRight) => ({
  type: SET_NEW_IS_RIGHT,
  payload: { id, isRight },
});

export const setNewSolvedDateTime = (id, solvedDateTime) => ({
  type: SET_NEW_SOLVED_DATE_TIME,
  payload: { id, solvedDateTime },
});
