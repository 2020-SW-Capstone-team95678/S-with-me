import createProvider from './common-ui/Modal/create';
import { P_PROFILE_EDIT_MODAL } from './constants/modals';
import { S_PROFILE_EDIT_MODAL } from './constants/modals';
import ProfileEditPage from './components/publisher/profile/ProfileEditPage';
import ProfileEditPageStudent from './components/student/profile/ProfileEditPage';

export default createProvider({
    [P_PROFILE_EDIT_MODAL] : ProfileEditPage,
    [S_PROFILE_EDIT_MODAL] : ProfileEditPageStudent,
});