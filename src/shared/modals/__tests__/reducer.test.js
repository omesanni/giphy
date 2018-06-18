import { fromJS } from 'immutable';
import reducer from '../reducer';

const data = { id: 'modal' };

it('should create a new modal in redux store', () => {
  const action = { data, type: 'CREATE_MODAL_STORE' };
  const initialState = fromJS({});

  const newState = reducer(initialState, action);

  expect(newState.get(data.id)).toBeTruthy();
});

it('should delete modal from redux store', () => {
  const action = { data, type: 'DELETE_MODAL_STORE' };
  const initialState = fromJS({ modal: {} });

  const newState = reducer(initialState, action);

  expect(newState.get(data.id)).toBeFalsy();
});

it('should open modal', () => {
  const action = { data, type: 'OPEN_MODAL' };
  const initialState = fromJS({ modal: { isOpen: false } });

  const newState = reducer(initialState, action);

  expect(newState.getIn([data.id, 'isOpen'])).toBe(true);
});

it('should close modal', () => {
  const action = { data, type: 'CLOSE_MODAL' };
  const initialState = fromJS({ modal: { isOpen: true } });

  const newState = reducer(initialState, action);

  expect(newState.getIn([data.id, 'isOpen'])).toBe(false);
});
