import Api from '../Api';

export const FETCH_NOTE_LIST = 'note/FETCH_NOTE_LIST';
export const FETCH_FILTERED_NOTE_LIST = 'note/FETCH_FILTERED_NOTE_LIST';
export const UPDATE_NOTE = 'note/UPDATE_NOTE';
export const DELETE_NOTE = 'note/DELETE_NOTE';
export const SET_RESOLVE = 'note/SET_RESOLVE';
export const SET_MY_NEW_ANSWER = 'note/SET_MY_NEW_ANSWER';
export const SET_MY_NEW_TEXT_SOLUTION = 'note/SET_MY_NEW_TEXT_SOLUTION';
export const SET_MY_NEW_IMAGE_SOLUTION = 'note/SET_MY_NEW_IMAGE_SOLUTION';
export const SET_MY_NEW_LINK_SOLUTION = 'note/SET_MY_NEW_LINK_SOLUTION';
export const SET_MY_NEW_HAND_SOLUTION = 'note/SET_MY_NEW_HAND_SOLUTION';
export const SET_NEW_IS_RIGHT = 'note/SET_NEW_IS_RIGHT';
export const SET_NEW_SOLVED_DATE_TIME = 'note/SET_NEW_SOLVED_DATE_TIME';
export const SET_TEMP_SOLUTION_TYPE = 'note/SET_TEMP_SOLUTION_TYPE';
export const SET_TEMP_IS_MATH = 'note/SET_TEMP_IS_MATH';
export const SET_NOTE_FILTER = 'note/SET_NOTE_FILTER';

const PAGE_SIZE = 8;
export function requestNoteList(params, pageNumber = 1) {
  const studentId = params.studentId;
  return {
    type: FETCH_NOTE_LIST,
    promise: Api.get(`student/${studentId}/note`, { params: { page: pageNumber } }),
    meta: {
      pageNumber: pageNumber,
      pageSize: PAGE_SIZE,
      notification: {
        error: '오답노트 목록을 가져오는 중에 문제가 발생했습니다.',
      },
    },
  };
}

export function requestFilteredNoteList(id, filterType, params, pageNumber = 1) {
  return {
    type: FETCH_FILTERED_NOTE_LIST,
    promise:
      filterType === 'FOLDER'
        ? Api.get(`/student/${id}/note/folder-filter`, {
            params: { folderId: params.folderId, page: pageNumber },
          })
        : Api.get(`/student/${id}/note/subject-filter`, {
            params: { subject: params.subject, page: pageNumber },
          }),
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
        success: '나의 풀이가 업데이트 되었습니다!',
        error: '오답노트 업데이트에 실패했습니다',
      },
    },
  };
}

export const setResolve = (id, resolve = 'INIT') => ({
  type: SET_RESOLVE,
  payload: { id, resolve },
});

export const setMyNewAnswer = (id, myAnswer) => ({
  type: SET_MY_NEW_ANSWER,
  payload: { id, myAnswer },
});

export const setMyNewTextSolution = (id, myNewTextSolution) => ({
  type: SET_MY_NEW_TEXT_SOLUTION,
  payload: { id, myNewTextSolution },
});

export const setMyNewImageSolution = (id, myNewImageSolution) => ({
  type: SET_MY_NEW_IMAGE_SOLUTION,
  payload: { id, myNewImageSolution },
});

export const setMyNewHandSolution = (id, myNewHandSolution) => ({
  type: SET_MY_NEW_HAND_SOLUTION,
  payload: { id, myNewHandSolution },
});

export const setMyNewLinkSolution = (id, myNewLinkSolution) => ({
  type: SET_MY_NEW_LINK_SOLUTION,
  payload: { id, myNewLinkSolution },
});

export const setNewIsRight = (id, isRight) => ({
  type: SET_NEW_IS_RIGHT,
  payload: { id, isRight },
});

export const setNewSolvedDateTime = (id, solvedDateTime) => ({
  type: SET_NEW_SOLVED_DATE_TIME,
  payload: { id, solvedDateTime },
});

export const setTempSolutionType = (id, tempSolutionType) => ({
  type: SET_TEMP_SOLUTION_TYPE,
  payload: { id, tempSolutionType },
});

export const setTempIsMath = (id, tempIsMath) => ({
  type: SET_TEMP_IS_MATH,
  payload: { id, tempIsMath },
});

export const setNoteFilter = (filterType, filterValue) => ({
  type: SET_NOTE_FILTER,
  payload: { filterType, filterValue },
});
