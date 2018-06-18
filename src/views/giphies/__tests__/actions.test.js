import thunk from 'redux-thunk';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import {
  sortGiphies,
  updateGiphy,
  fetchGiphies,
} from '../actions';
import {
  FETCH_GIPHIES_START,
  FETCH_GIPHIES_SUCCESS,
  FETCH_GIPHIES_ERROR,
  UPDATE_GIPHY,
  SORT_GIPHIES,
} from '../constants';

const state = {
  giphies: [],
  modals: {},
};

const mockStore = configureMockStore([thunk]);
const store = mockStore(state);

describe('Giphies actions', () => {
  beforeEach(() => {
    store.clearActions();
    jest.clearAllMocks();
  });

  it('should dispatch SORT_GIPHIES action', () => {
    store.dispatch(sortGiphies('asc'));
    const actions = store.getActions();

    expect(actions[0].type).toEqual(SORT_GIPHIES);
  });

  it('should dispatch UPDATE_GIPHY action', () => {
    store.dispatch(updateGiphy({}));
    const actions = store.getActions();

    expect(actions[0].type).toEqual(UPDATE_GIPHY);
  });

  describe('fetchGiphies()', () => {
    it('should fetch giphies successfully', () => {
      const response = {
        data: { data: [], pagination: {} },
      };

      jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(response));

      store.dispatch(fetchGiphies({})).then(() => {
        const actions = store.getActions();

        expect(actions[0].type).toEqual(FETCH_GIPHIES_START);
        expect(actions[1].type).toEqual(FETCH_GIPHIES_SUCCESS);
      });
    });

    it('should fail in fetching giphies', () => {
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject());

      store.dispatch(fetchGiphies({})).then(() => {
        const actions = store.getActions();

        expect(actions[0].type).toEqual(FETCH_GIPHIES_START);
        expect(actions[1].type).toEqual(FETCH_GIPHIES_ERROR);
      });
    });
  });
});
