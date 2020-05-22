import Api from '../Api';

export const SET_USER = 'user/SET_USER';
export const CREATE_USER = 'user/CREATE_USER';

export function setUser(data, onComplete) {
  return {
    type: SET_USER,
    promise: Api.post('/login/student', data),
    meta: {
      onSuccess: onComplete,
      notification: {
        success: '로그인이 완료되었습니다.',
      },
    },
  };
}

export function createUser(data, onComplete) {
  return {
    type: CREATE_USER,
    promise: Api.post('/signup/student', data),
    meta: {
      onSuccess: onComplete,
      notification: {
        success: '회원가입이 완료되었습니다.',
      },
    },
  };
}
