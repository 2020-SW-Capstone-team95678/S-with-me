export function validate(values, isCheck, isOnlyId) {
  const { name, userId, password, grade, birthday, phoneNumber } = values;
  let errors = {};
  if (!name) errors['name'] = '이름을 입력해 주세요';
  if (!userId) errors['userId'] = '아이디를 입력해 주세요';
  if (userId && !isCheck) errors['userId'] = '중복 확인 검사를 해주세요';
  if (userId && isCheck && !isOnlyId) errors['userId'] = '다른 아이디를 입력하세요';
  if (!password) errors['password'] = '비밀 번호를 입력해 주세요';
  if (!grade) errors['grade'] = '학년을 입력해 주세요';
  if (grade && (grade >= 4 || grade < 1)) errors['grade'] = '학년의 범위는 1~3 입니다';
  if (!birthday) errors['birthday'] = '생일을 입력해주세요';
  if (birthday && birthday.length !== 6)
    errors['birthday'] = '6자리로 입력해주세요 ex)001205';
  if (!phoneNumber) errors['phoneNumber'] = '번호를 입력해주세요';
  if (phoneNumber && phoneNumber.length !== 11)
    errors['phoneNumber'] = '숫자만 입력해주세요 ex)01012341234';

  return errors;
}
