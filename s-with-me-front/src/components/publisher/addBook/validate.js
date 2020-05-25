export function validate(values, isCheck, isOnlyId) {
  const { bookName, bookInfo, bookPrice, bookGrade, bookSubject } = values;
  let errors = {};
  if (!bookName) errors['bookName'] = '책이름을 입력해 주세요';
  if (!bookInfo) errors['bookInfo'] = '소개를 입력해 주세요';
  if (!bookGrade) errors['bookGrade'] = '학년을 입력해 주세요';
  if (bookGrade && (bookGrade >= 4 || bookGrade < 1)) errors['bookGrade'] = '학년의 범위는 1~3 입니다';
  // if (!birthday) errors['birthday'] = '생일을 입력해주세요';
  
  if (!bookPrice) errors['bookPrice'] = '가격을 입력해주세요';
  if (!bookPrice) errors['bookSubject'] = '과목을 입력해주세요';
  return errors;
}
