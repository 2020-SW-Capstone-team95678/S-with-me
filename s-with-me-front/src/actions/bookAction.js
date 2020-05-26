import Api from '../Api';

//export const SET_BOOK = 'user/SET_BOOK';
export const CREATE_BOOK = 'book/CREATE_BOOK';
export const CREATE_MAIN_CHAPTER = 'book/CREATE_MAIN_CHAPTER';



export function createBook(data, onComplete) {

  const formValue = {
      grade: data.bookGrade,
      name: data.bookName,
      price: data.bookPrice,
      publisherId:1,
      subject: data.bookSubgect,
  }
  return {
    type: CREATE_BOOK,
    promise: Api.post('/publisher/library/book', formValue),
    meta: {
      onSuccess: onComplete,
      notification: {
        success: '등록이 완료되었습니다.',
        error: '등록에 실패하였습니다.',
      },
    },
  };
}

export function createMainChapter(data, onComplete) {

  const formValue = {
      mainChapterName: data,
  }
  console.log("Here!!!!!");
  return {
    type: CREATE_MAIN_CHAPTER,
    promise: Api.post('/publisher/library/book', formValue),
    meta: {
      onSuccess: onComplete,
      notification: {
        success: '등록이 완료되었습니다.',
        error: '등록에 실패하였습니다.',
      },
    },
  };
}
