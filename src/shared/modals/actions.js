import {
  CREATE_MODAL_STORE,
  DELETE_MODAL_STORE,
  OPEN_MODAL,
  CLOSE_MODAL,
} from './constants';

/**
 * Create a store location for a modal instance.
 * @param {String} storeId
 * @return {Object}
 */
export function createModalStore(storeId) {
  return {
    type: CREATE_MODAL_STORE,
    data: {
      id: storeId,
    },
  };
}

/**
 * Delete the store for a modal instance.
 * @param {String} storeId
 * @return {Object}
 */
export function deleteModalStore(storeId) {
  return {
    type: DELETE_MODAL_STORE,
    data: {
      id: storeId,
    },
  };
}

/**
 * Open a modal.
 * @param {String} storeId
 * @return {Object}
 */
export function openModal(storeId) {
  return {
    type: OPEN_MODAL,
    data: {
      id: storeId,
    },
  };
}

/**
 * Close a modal.
 * @param {String} storeId
 * @return {Object}
 */
export function closeModal(storeId) {
  return {
    type: CLOSE_MODAL,
    data: {
      id: storeId,
    },
  };
}
