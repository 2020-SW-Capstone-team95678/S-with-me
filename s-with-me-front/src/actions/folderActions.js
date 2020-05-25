import Api from '../Api';

export const FETCH_MY_FOLDER_LIST = 'folder/FETCH_MY_FOLDER_LIST';

export function requestFolderList(params) {
  return {
    type: FETCH_MY_FOLDER_LIST,
    promise: Api.get('/student/library/folder/display', { params: params }),
    meta: {
      notification: {
        error: '폴더 목록을 불러오는 중에 문제가 발생했습니다.',
      },
    },
  };
}
