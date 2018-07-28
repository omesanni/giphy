import thunk from 'redux-thunk';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import {
  sortGiphies,
  updateGiphy,
  fetchGiphies,
  giphyImageLoaded,
  giphyImageErrored,
} from '../actions';
import {
  FETCH_GIPHIES_START,
  FETCH_GIPHIES_SUCCESS,
  FETCH_GIPHIES_ERROR,
  UPDATE_GIPHY,
  SORT_GIPHIES,
  GIPHY_IMAGE_LOADED,
  GIPHY_IMAGE_ERRORED,
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

  it('should dispatch GIPHY_IMAGE_LOADED action', () => {
    store.dispatch(giphyImageLoaded(1));
    const actions = store.getActions();

    expect(actions[0].type).toEqual(GIPHY_IMAGE_LOADED);
  });

  it('should dispatch GIPHY_IMAGE_ERRORED action', () => {
    store.dispatch(giphyImageErrored(1));
    const actions = store.getActions();

    expect(actions[0].type).toEqual(GIPHY_IMAGE_ERRORED);
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
        data: {
          data: [{
            id: 'aaa',
            _score: 20,
            title: 'cash me outside how bout dah',
            username: 'dirtydozen',
            rating: 'G',
            source: 'http://youtube',
            embed_url: 'http://embed',
            images: {
              downsized_medium: { url: 'http//www' },
              fixed_height_downsampled: { url: 'http//www' },
            },
          }],
          pagination: {},
        },
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
