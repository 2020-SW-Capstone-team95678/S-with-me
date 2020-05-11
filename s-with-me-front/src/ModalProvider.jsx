import createProvider from './common-ui/Modal/create';
import { PROFILE_EDIT_MODAL } from './constants/modals';
import ProfileEditPage from './components/publisher/profile/ProfileEditPage';
import ProfileEditPageStudent from './components/student/profile/ProfileEditPage';

export default createProvider({
    [PROFILE_EDIT_MODAL] : ProfileEditPage,
    [PROFILE_EDIT_MODAL] : ProfileEditPageStudent,
});