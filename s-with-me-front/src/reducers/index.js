import myProblemList from './myProblemReducers';
import user from './userReducer';
import notification from './notificationReducer';
import myBookList from './myBookReducer';
import book from './bookReducer';
import mainChapter from './createMainChapterReducer';
import folderList from './folderReducer';
import chapter from './chapterReducer';
import note from './noteReducer';
import publisherBook from './publisher/bookReducer';

export default {
  publisherBook,
  myProblemList,
  user,
  notification,
  myBookList,
  book,
  mainChapter,
  folderList,
  chapter,
  note,
};
