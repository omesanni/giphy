/**
 * @overview Giphies reducer.
 */
import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';

const initialState = fromJS({
  records: [],
  fetching: false,
  error: false,
  pagination: {},
});

export default handleActions({
  FETCH_GIPHIES_START: (state, action) =>
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
  FETCH_GIPHIES_ERROR: (state, action) =>
    state.withMutations((s) => {
      s.set('records', fromJS([]))
        .set('fetching', false)
        .set('error', true);
    }),
  UPDATE_GIPHY: (state, action) => {
    const newRecords = state.get('records').toJS().map((record) => {
      const { giphy } = action.data;

      return (record.id === giphy.id) ? giphy : record;
    });

    return state.set('records', fromJS(newRecords));
  },
  SORT_GIPHIES: (state, action) => {
    const descending = action.data.dir === 'desc';
    const records = state.get('records').toJS();

    const newRecords = records.sort((a, b) => {
      return descending ? (b._score - a._score) : (a._score - b._score);
    });

    return state.set('records', fromJS(newRecords));
  },
}, initialState);
