import Api from '../Api';

export const FETCH_MY_CURRICULUM_LIST = 'curriculum/FETCH_MY_CURRICULUM_LIST';

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
