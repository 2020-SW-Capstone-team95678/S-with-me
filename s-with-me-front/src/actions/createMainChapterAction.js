import Api from '../Api';

export const CREATE_MAIN_CHAPTER = 'book/CREATE_MAIN_CHAPTER';



export function createMainChapter(data, onComplete) {

    const formValue = {
        bookId:1, //현재 있는 책 아이디 임시 설정
        mainChapterName: data.mainChapterName,
    }
    return {
      type: CREATE_MAIN_CHAPTER,
      promise: Api.post('/publisher/library/book/mainChapter', formValue),
      meta: {
        onSuccess: onComplete,
        notification: {
          success: '등록이 완료되었습니다.',
          error: '등록에 실패하였습니다.',
        },
      },
    };
  }
  