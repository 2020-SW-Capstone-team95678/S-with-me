import createProvider from './common-ui/Modal/create';

import {
  P_PROFILE_EDIT_MODAL,
  S_PROFILE_EDIT_MODAL,
  DELETE_NOTE,
  CREATE_FOLDER,
  DELETE_FOLDER,
  UPDATE_FOLDER_NAME,
  CREATE_CURRICULUM,
  PREVIEW_PROBLEM,
  CREATE_BOOK,
  CREATE_MAIN_CHAPTER,
  CREATE_SUB_CHAPTER,
  CREATE_PROBLEM,
  UPDATE_MAIN_CHAPTER,
  UPDATE_SUB_CHAPTER,
  UPDATE_PROBLEM,
} from './constants/modals';
import ProfileEditPage from './components/publisher/profile/ProfileEditPage';
import ProfileEditPageStudent from './components/student/profile/ProfileEditPage';
import CreateFolderPageContainer from './containers/student/book/CreateFolderPageContainer';
import DeleteFolderPageContainer from './containers/student/book/DeleteFolderPageContainer';
import UpdateFolderNamePageContainer from './containers/student/book/UpdateFolderNamePageContainer';
import DeleteNoteContainer from './containers/student/note/DeleteNoteContainer';
import CreateCurriculumPageContainer from './containers/student/book/CreateCurriculumPageContainer';
import ProblemPreviewPage from './components/student/problem/ProblemPreviewPage';
import CreateBookPage from './components/publisher/createBook/CreateBookPage';
import CreateMainChapterPage from './components/publisher/createBook/CreateMainChapterPage';
import RenameMainChapter from './components/publisher/createBook/RenameMainChapter';
import CreateSubChapterPage from './components/publisher/createBook/CreateSubChapterPage';
import RenameSubChapter from './components/publisher/createBook/RenameSubChapter';
import CreateProblemPage from './components/publisher/createBook/RegisterProblem';
import ModifyProblem from './components/publisher/createBook/ModifyProblem';

export default createProvider({
  [P_PROFILE_EDIT_MODAL]: ProfileEditPage,
  [S_PROFILE_EDIT_MODAL]: ProfileEditPageStudent,
  [DELETE_NOTE]: DeleteNoteContainer,
  [CREATE_FOLDER]: CreateFolderPageContainer,
  [DELETE_FOLDER]: DeleteFolderPageContainer,
  [UPDATE_FOLDER_NAME]: UpdateFolderNamePageContainer,
  [CREATE_CURRICULUM]: CreateCurriculumPageContainer,
  [PREVIEW_PROBLEM]: ProblemPreviewPage,
  [CREATE_BOOK]: CreateBookPage,
  [CREATE_MAIN_CHAPTER]: CreateMainChapterPage,
  [UPDATE_MAIN_CHAPTER]: RenameMainChapter,
  [CREATE_SUB_CHAPTER]: CreateSubChapterPage,
  [UPDATE_SUB_CHAPTER]: RenameSubChapter,
  [CREATE_PROBLEM]: CreateProblemPage,
  [UPDATE_PROBLEM]: ModifyProblem,
});
