import axios from 'axios';
import {
  stringifyQuery,
  fetchFromLocalStorage,
} from '../../utils/lib';
import {
  FETCH_GIPHIES_START,
  FETCH_GIPHIES_SUCCESS,
  FETCH_GIPHIES_ERROR,
  UPDATE_GIPHY,
  SORT_GIPHIES,
  GIPHY_IMAGE_LOADED,
  GIPHY_IMAGE_ERRORED,
} from './constants';

/**
 * Giphy image loaded successfully
 * @param  {String} id
 * @return {Object}
 */
export function giphyImageLoaded(id) {
  return {
    type: GIPHY_IMAGE_LOADED,
    data: { id },
  };
}

/**
 * Giphy image failed to load
 * @param  {String} id
 * @return {Object}
 */
export function giphyImageErrored(id) {
  return {
    type: GIPHY_IMAGE_ERRORED,
    data: { id },
  };
}

/**
 * Sort giphies array in ascending or descending order
 * @param  {String} dir Sort direction
 * @return {Object}
 */
export function sortGiphies(dir) {
  return {
    type: SORT_GIPHIES,
    data: { dir },
  };
}

/**
 * Update giphy record
 * @param  {Object} giphy
 * @return {Object}
 */
export function updateGiphy(giphy) {
  return {
    type: UPDATE_GIPHY,
    data: { giphy },
  };
}

/**
 * Fetch giphies from giphy API
 * @param  {Object} query
 * @return {Promise}
 */
export function fetchGiphies(query) {
  return (dispatch) => {
    dispatch({
      type: FETCH_GIPHIES_START,
    });

    const endpoint = `${SEARCH_API}&${stringifyQuery(query)}`;

    return axios.get(endpoint)
      .then((res) => {
        const { data, pagination } = res.data;

        dispatch({
          type: FETCH_GIPHIES_SUCCESS,
          data: {
            records: data.map((record) => {
              const saved = fetchFromLocalStorage(record.id);

              return { ...(saved || record), loading: true };
            }),
            pagination: {
              ...pagination,
              pages: Math.ceil(pagination.total_count / query.limit),
              current: (query.offset / query.limit) + 1,
            },
          },
        });

        return res.data;
      }, (err) => {
        dispatch({
          type: FETCH_GIPHIES_ERROR,
        });

        return err;
      });
  };
}
