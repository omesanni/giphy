import React from 'react';
import numeral from 'numeral';
import AsyncComponent from '../components/AsyncComponent';

/**
 * Check if a number is within range for pagination, etc.
 * @param {Object} range
 * @param {Number} i
 * @param {Number} total
 */
export function isWithinRange(range, i, total) {
  return (
    i <= range.max &&
    i >= range.min &&
    i <= total &&
    i > 0
  );
}

/**
 * Set a range for pagination, etc.
 * @param {Number} current
 * @param {Number} spread
 * @param {Number} total
 */
export function setRange(current, spread, total) {
  if (current <= (1 + spread)) {
    return {
      min: 1,
      max: Math.min(1 + (spread * 2), total),
    };
  } else if (current >= (total - spread)) {
    return {
      min: Math.max(total - (spread * 2), 1),
      max: total,
    };
  }

  return {
    min: current - spread,
    max: Math.min(current + spread, total),
  };
}

/**
 * Formats numbers
 * @param {Number} number
 * @param {String} format
 * @return {String}
 */
export function formatNumber(number = 0, format = '0,0[.]00') {
  return numeral(number).format(format);
}

/**
 * Store data in local storage
 * @param  {String} key
 * @param  {Object} data
 * @return {String}
 */
export function saveToLocalStorage(key, data) {
  return localStorage.setItem(key, JSON.stringify(data));
}

/**
 * Fetch data from local storage
 * @param  {String} key
 * @return {Object}
 */
export function fetchFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

/**
 * Converts object to query string
 * @param  {Object} query Query object
 * @return {String} queryStr Query string
 */
export function stringifyQuery(query = {}) {
  let queryStr = '';

  const keys = Object.keys(query);
  const lastIndex = keys.length - 1;

  keys.forEach((key, i) => {
    queryStr += `${key}=${query[key]}${(lastIndex !== i) ? '&' : ''}`;
  });

  return queryStr;
}

/**
 * Lazy loads a component
 * @param  {Function} getComponent Returns a dynamic import of the component
 * @param  {Object}   props
 * @return {ReactElement}
 */
export function lazyLoadComponent(getComponent, props = {}) {
  return React.createElement(AsyncComponent, { ...props, render: getComponent });
}
