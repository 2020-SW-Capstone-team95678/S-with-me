import { SOLVE_COMPLETE } from '../actions/myProblemActions';
import { showMessage } from '../actions/notificationActions';

export default (store) => (nextRunner) => (action) => {
  const { type } = action;
  const result = nextRunner(action);
  if (type === SOLVE_COMPLETE) {
    const message = '채점 되었습니다. 채점 결과는 오답노트에 반영됩니다.';
    store.dispatch(showMessage(message));
  }
  return result;
};
