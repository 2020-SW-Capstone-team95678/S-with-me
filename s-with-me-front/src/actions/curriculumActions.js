import Api from '../Api';

export const FETCH_MY_CURRICULUM_LIST = 'curriculum/FETCH_MY_CURRICULUM_LIST';
export const CREATE_CURRICULLUM = 'curriculum/CREATE_CURRICULLUM';
export const UPDATE_CURRICULUM = 'curriculum/UPDATE_CURRICULUM';
export const DELETE_CURRICULUM = 'curriculum/DELETE_CURRICULUM';

export function requestCurriculumList(params) {
  return {
    type: FETCH_MY_CURRICULUM_LIST,
    promise: Api.get('/student/library/curriculum/list', { params: params }),
    meta: {
      notification: {
        error: '문제집을 불러오는 중에 문제가 발생했습니다.',
      },
    },
  };
}

export function createCurriculum(data, onComplete) {
  return {
    type: CREATE_CURRICULLUM,
    promise: Api.post('/student/library/curriculum', data),
    meta: {
      onSuccess: onComplete,
      notification: {
        success: '커리큘럼 설정이 성공적으로 완료되었습니다.',
      },
    },
  };
}
export function updateCurriculum(id, data, onComplete) {
  return {
    type: UPDATE_CURRICULUM,
    promise: Api.put(`/student/library/curriculum?curriculumId=${id}`, data),
    meta: {
      onSuccess: onComplete,
      notification: {
        success: '커리큘럼 수정이 성공적으로 완료되었습니다.',
      },
    },
  };
}

export function deleteCurriculum(id, onComplete) {
  return {
    type: DELETE_CURRICULUM,
    promise: Api.delete(`/student/library/curriculum/delete?curriculumId=${id}`),
    meta: {
      onSuccess: onComplete,
      notification: {
        success: '커리큘럼이 삭제되었습니다.',
        error: '커리큘럼 삭제에 실패하였습니다.',
      },
    },
  };
}
