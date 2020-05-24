import createProvider from './common-ui/Modal/create';
import { P_PROFILE_EDIT_MODAL, S_PROFILE_EDIT_MODAL, DELETE_NOTE } from './constants/modals';
import ProfileEditPage from './components/publisher/profile/ProfileEditPage';
import ProfileEditPageStudent from './components/student/profile/ProfileEditPage';
import DeleteNote from './components/student/note/DeleteNote';

export default createProvider({
  [P_PROFILE_EDIT_MODAL]: ProfileEditPage,
  [S_PROFILE_EDIT_MODAL]: ProfileEditPageStudent,
  [DELETE_NOTE]: DeleteNote,
});
