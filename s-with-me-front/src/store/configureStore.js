import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import reducers from '../reducers';
import notificationEffects from '../middlewares/notificationEffects';
import myProblemEffects from '../middlewares/myProblemEffects';

export default (initStates) =>
  createStore(
    combineReducers(reducers),
    initStates,
    composeWithDevTools(applyMiddleware(thunk, notificationEffects, myProblemEffects)),
  );
