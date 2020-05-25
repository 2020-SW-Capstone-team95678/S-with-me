import Api from '../Api';

export const FETCH_MY_FOLDER_LIST = 'folder/FETCH_MY_FOLDER_LIST';
export const CREATE_FOLDER = 'folder/CREATE_FOLDER';
export const DELETE_FOLDER = 'folder/DELETE_FOLDER';

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

export function createFolder(data, onComplete) {
  const params = new URLSearchParams();
  params.append('folderName', data.folderName);
  params.append('studentId', data.studentId);
  return {
    type: CREATE_FOLDER,
    promise: Api.post('/student/library/folder', params),
    meta: {
      onSuccess: onComplete,
    },
  };
}

export function deleteFolder(folderId, onComplete) {
  return {
    type: DELETE_FOLDER,
    promise: Api.delete('/student/library/folder/delete', { params: { folderId: folderId } }),
    meta: {
      onSuccess: onComplete,
    },
  };
}
