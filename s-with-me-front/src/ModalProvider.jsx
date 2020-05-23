import createProvider from './common-ui/Modal/create';
import {
  P_PROFILE_EDIT_MODAL,
  S_PROFILE_EDIT_MODAL,
  CHECK_ID_DUPLICATION,
} from './constants/modals';
import ProfileEditPage from './components/publisher/profile/ProfileEditPage';
import ProfileEditPageStudent from './components/student/profile/ProfileEditPage';
import CheckIdDuplication from './components/signUp/CheckIdDuplication';

export default createProvider({
  [P_PROFILE_EDIT_MODAL]: ProfileEditPage,
  [S_PROFILE_EDIT_MODAL]: ProfileEditPageStudent,
  [CHECK_ID_DUPLICATION]: CheckIdDuplication,
});
