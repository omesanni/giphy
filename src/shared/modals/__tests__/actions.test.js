import configureMockStore from 'redux-mock-store';
import {
  createModalStore,
  deleteModalStore,
  openModal,
  closeModal,
} from '../actions';
import {
  CREATE_MODAL_STORE,
  DELETE_MODAL_STORE,
  OPEN_MODAL,
  CLOSE_MODAL,
} from '../constants';

const state = {
  giphies: [],
  modals: {},
};

const store = configureMockStore([])(state);

describe('Modal actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('should dispatch CREATE_MODAL_STORE action', () => {
    store.dispatch(createModalStore('cod'));
    const actions = store.getActions();

    expect(actions[0].type).toEqual(CREATE_MODAL_STORE);
  });

  it('should dispatch DELETE_MODAL_STORE action', () => {
    store.dispatch(deleteModalStore('bob'));
    const actions = store.getActions();

    expect(actions[0].type).toEqual(DELETE_MODAL_STORE);
  });

  it('should dispatch OPEN_MODAL action', () => {
    store.dispatch(openModal('boc'));
    const actions = store.getActions();

    expect(actions[0].type).toEqual(OPEN_MODAL);
  });

  it('should dispatch CLOSE_MODAL action', () => {
    store.dispatch(closeModal('ddd'));
    const actions = store.getActions();

    expect(actions[0].type).toEqual(CLOSE_MODAL);
  });
});
