/**
 * @overview Giphies reducer.
 */
import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';
import shuffle from 'lodash/shuffle';

const initialState = fromJS({
  records: [],
  fetching: false,
  error: false,
  pagination: {},
});

/**
 * Updates the image loading status of a particular giphy
 * in the giphies array
 * @param  {Object} state
 * @param  {Object} action
 * @param  {Object} status Contains new loading status of giphy
 * @return {Object}
 */
function updateGiphyLoadingStatus(state, action, status) {
  const newRecords = state.get('records').toJS().map((record) => {
    if (record.id === action.data.id) {
      return { ...record, ...status };
    }

    return record;
  });

  return state.set('records', fromJS(newRecords));
}

export default handleActions({
  FETCH_GIPHIES_START: state =>
    state.withMutations((s) => {
      s.set('fetching', true)
        .set('error', false);
    }),
  FETCH_GIPHIES_SUCCESS: (state, action) =>
    state.withMutations((s) => {
      s.set('records', fromJS(action.data.records))
        .set('pagination', action.data.pagination)
        .set('fetching', false)
        .set('error', false);
    }),
  FETCH_GIPHIES_ERROR: state =>
    state.withMutations((s) => {
      s.set('records', fromJS([]))
        .set('fetching', false)
        .set('error', true);
    }),
  GIPHY_IMAGE_LOADED: (state, action) =>
    updateGiphyLoadingStatus(state, action, { loading: false, loadFailed: false }),
  GIPHY_IMAGE_ERRORED: (state, action) =>
    updateGiphyLoadingStatus(state, action, { loading: false, loadFailed: true }),
  UPDATE_GIPHY: (state, action) => {
    const newRecords = state.get('records').toJS().map((record) => {
      const { giphy } = action.data;

      return (record.id === giphy.id) ? giphy : record;
    });

    return state.set('records', fromJS(newRecords));
  },
  SORT_GIPHIES: (state, action) => {
    const { dir } = action.data;
    const records = state.get('records').toJS();

    if (dir === 'random') {
      return state.set('records', fromJS(shuffle(records)));
    }

    const newRecords = records.sort((a, b) => (
      dir === 'desc' ? (b._score - a._score) : (a._score - b._score)
    ));

    return state.set('records', fromJS(newRecords));
  },
}, initialState);
