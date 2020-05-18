import { SET_ERROR } from '../actions/myProblemActions';
import { showMessage, SHOW_NOTIFICATION, hideMessage } from '../actions/notificationActions';
import { debounce } from '../debounce';

const debounceRunner = debounce(action => action(), 4000);

export default store => nextRunner => action => {
  const { type, payload } = action;
  if (type === SET_ERROR) {
    const { errorMessage } = payload;
    store.dispatch(showMessage(errorMessage, true));
  } else if (type === SHOW_NOTIFICATION) {
    const hide = () => store.dispatch(hideMessage());
    setTimeout(4000);
    debounceRunner(hide);
  }
  return nextRunner(action);
};
