/**
 * @overview Modals reducer.
 */
import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';

export default handleActions({
  CREATE_MODAL_STORE: (state, action) =>
    state.set(action.data.id, fromJS({})),
  DELETE_MODAL_STORE: (state, action) =>
    state.delete(action.data.id),
  OPEN_MODAL: (state, action) =>
    state.set(action.data.id, fromJS({ isOpen: true })),
  CLOSE_MODAL: (state, action) =>
    state.set(action.data.id, fromJS({ isOpen: false })),
}, fromJS({}));
