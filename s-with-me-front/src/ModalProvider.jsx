import createProvider from './common-ui/Modal/create';

import {
  P_PROFILE_EDIT_MODAL,
  S_PROFILE_EDIT_MODAL,
  DELETE_NOTE,
  CREATE_FOLDER,
  DELETE_FOLDER,
  UPDATE_FOLDER_NAME,
} from './constants/modals';
import ProfileEditPage from './components/publisher/profile/ProfileEditPage';
import ProfileEditPageStudent from './components/student/profile/ProfileEditPage';
import CreateFolderPageContainer from './containers/student/book/CreateFolderPageContainer';
import DeleteFolderPageContainer from './containers/student/book/DeleteFolderPageContainer';
import UpdateFolderNamePageContainer from './containers/student/book/UpdateFolderNamePageContainer';
import DeleteNote from './components/student/note/DeleteNote';

export default createProvider({
  [P_PROFILE_EDIT_MODAL]: ProfileEditPage,
  [S_PROFILE_EDIT_MODAL]: ProfileEditPageStudent,
  [DELETE_NOTE]: DeleteNote,
  [CREATE_FOLDER]: CreateFolderPageContainer,
  [DELETE_FOLDER]: DeleteFolderPageContainer,
  [UPDATE_FOLDER_NAME]: UpdateFolderNamePageContainer,
});
