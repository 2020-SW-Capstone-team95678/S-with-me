import createProvider from './common-ui/Modal/create';
import { P_PROFILE_EDIT_MODAL, S_PROFILE_EDIT_MODAL, CREATE_FOLDER } from './constants/modals';
import ProfileEditPage from './components/publisher/profile/ProfileEditPage';
import ProfileEditPageStudent from './components/student/profile/ProfileEditPage';
import CreateFolderPageContainer from './containers/student/book/CreateFolderPageContainer';

export default createProvider({
  [P_PROFILE_EDIT_MODAL]: ProfileEditPage,
  [S_PROFILE_EDIT_MODAL]: ProfileEditPageStudent,
  [CREATE_FOLDER]: CreateFolderPageContainer,
});
