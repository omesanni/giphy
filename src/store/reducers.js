/**
 * @overview Combine all reducers in this file and export the combined reducers.
 */
import { combineReducers } from 'redux-immutable';
import giphiesReducer from '../views/giphies/reducer';
import modalsReducer from '../shared/modals/reducer';

const rootReducer = combineReducers({
  modals: modalsReducer,
  giphies: giphiesReducer,
});

export default rootReducer;
