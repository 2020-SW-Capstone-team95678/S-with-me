import Api from '../Api';

export const SET_USER = 'user/SET_USER';
export const CREATE_USER = 'user/CREATE_USER';
export const CHECK_ID_DUPLICATION = 'user/CHECK_ID_DUPLICATION';

export function setUser(data, onComplete) {
  const params = new URLSearchParams();
  params.append('id', data.id);
  params.append('password', data.password);
  return {
    type: SET_USER,
    promise: Api.post('/login/student', params),
    meta: {
      onSuccess: onComplete,
      notification: {
        success: '로그인이 완료되었습니다.',
      },
    },
  };
}

export function createUser(isStudnet, data, onComplete) {
  const params = new URLSearchParams();
  if (isStudnet) {
    params.append('birthday', data.birthday);
    params.append('grade', data.grade);
    params.append('name', data.name);
    params.append('password', data.password);
    params.append('phoneNumber', data.phoneNumber);
    params.append('userId', data.userId);
  } else {
    params.append('code', data.code);
    params.append('name', data.name);
    params.append('password', data.password);
    params.append('userId', data.userId);
  }
  return {
    type: CREATE_USER,
    promise: isStudnet
      ? Api.post('/signup/student', params)
      : Api.post('/signup/publisher', params),
    meta: {
      onSuccess: onComplete,
      notification: {
        success: '회원가입이 완료되었습니다.',
        error: '회원가입에 실패하였습니다.',
      },
    },
  };
}

export function checkIdDuplication(isStudent, data, onComplete) {
  const params = new URLSearchParams();
  if (isStudent) params.append('userId', data.userId);
  else params.append('publisherId', data.userId);
  return {
    type: CHECK_ID_DUPLICATION,
    promise: isStudent
      ? Api.post('/signup/student/dupcheck', params)
      : Api.post('/signup/publisher/dupcheck', params),
    meta: {
      onSuccess: onComplete,
    },
  };
}
