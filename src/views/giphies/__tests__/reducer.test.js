import { fromJS, Map } from 'immutable';
import isEmpty from 'lodash/isEmpty';
import reducer from '../reducer';

const initialState = {
  records: [],
  fetching: false,
  error: false,
  pagination: {},
};

it('should set fetching to true', () => {
  const action = { type: 'FETCH_GIPHIES_START' };
  const newState = reducer(fromJS(initialState), action);

  expect(newState.get('fetching')).toBe(true);
});

it('should store giphies in store when returned from API', () => {
  const action = {
    type: 'FETCH_GIPHIES_SUCCESS',
    data: {
      pagination: { current: 1, pages: 25 },
      records: [{ id: 'ccc' }],
    },
  };

  const newState = reducer(fromJS(initialState), action);

  expect(newState.get('records').toJS().length).toBeTruthy();
  expect(isEmpty(newState.get('pagination'))).toBe(false);
});

it('should set error to true', () => {
  const action = {
    type: 'FETCH_GIPHIES_ERROR',
  };

  const newState = reducer(fromJS({ ...initialState, records: [1] }), action);

  expect(newState.get('records').toJS().length).toBeFalsy();
  expect(newState.get('error')).toBe(true);
});

it('should update a particular giphy in records array', () => {
  const action = {
    type: 'UPDATE_GIPHY',
    data: {
      giphy: { id: 'ccc', _score: 6 },
    },
  };

  const baseState = { ...initialState, records: [{ id: 'ccc', _score: 5 }] };
  const newState = reducer(fromJS(baseState), action);

  expect(newState.get('records').toJS()[0]).toEqual(action.data.giphy);
});

describe('SORT_GIPHIES', () => {
  it('should sort giphies array in ascending order', () => {
    const action = {
      type: 'SORT_GIPHIES',
      data: { dir: 'asc' },
    };

    const baseState = {
      records: [
        { id: 'ccc', _score: 5 },
        { id: 'ddd', _score: 2 },
        { id: 'vvv', _score: 10 },
      ],
    };

    const newState = reducer(fromJS(baseState), action);
    const result = [
      { id: 'ddd', _score: 2 },
      { id: 'ccc', _score: 5 },
      { id: 'vvv', _score: 10 },
    ];

    expect(newState.get('records').toJS()).toEqual(result);
  });

  it('should sort giphies array in descending order', () => {
    const action = {
      type: 'SORT_GIPHIES',
      data: { dir: 'desc' },
    };

    const baseState = {
      records: [
        { id: 'ccc', _score: 5 },
        { id: 'ddd', _score: 2 },
        { id: 'vvv', _score: 10 },
      ],
    };

    const newState = reducer(fromJS(baseState), action);
    const result = [
      { id: 'vvv', _score: 10 },
      { id: 'ccc', _score: 5 },
      { id: 'ddd', _score: 2 },
    ];

    expect(newState.get('records').toJS()).toEqual(result);
  });

  it('should sort giphies array in descending order', () => {
    const action = {
      type: 'SORT_GIPHIES',
      data: { dir: 'desc' },
    };

    const baseState = {
      records: [
        { id: 'ccc', _score: 5 },
        { id: 'ddd', _score: 2 },
        { id: 'vvv', _score: 10 },
      ],
    };

    const newState = reducer(fromJS(baseState), action);
    const result = [
      { id: 'vvv', _score: 10 },
      { id: 'ccc', _score: 5 },
      { id: 'ddd', _score: 2 },
    ];

    expect(newState.get('records').toJS()).toEqual(result);
  });
});
