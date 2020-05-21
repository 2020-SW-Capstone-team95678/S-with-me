import { showMessage, SHOW_NOTIFICATION, hideMessage } from '../actions/notificationActions';
import { debounce } from '../debounce';
import { KEY, LIFECYCLE } from 'redux-pack';

const debounceRunner = debounce(action => action(), 4000);

export default store => nextRunner => action => {
  const { type, meta } = action;
  if (type === SHOW_NOTIFICATION) {
    const hide = () => store.dispatch(hideMessage());
    setTimeout(4000);
    debounceRunner(hide);
  }
  if (meta && meta.notification) {
    const { success, error } = meta.notification;
    if (success && meta[KEY.LIFECYCLE] === LIFECYCLE.SUCCESS) {
      store.dispatch(showMessage(success));
    } else if (error && meta[KEY.LIFECYCLE] === LIFECYCLE.FAILURE) {
      store.dispatch(showMessage(error, true));
    }
  }
  return nextRunner(action);
};
