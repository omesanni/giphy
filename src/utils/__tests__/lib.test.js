import React from 'react';
import * as lib from '../lib';

describe('lib', () => {
  describe('formatNumber()', () => {
    it('should use default format(0,0[.]00) when no format is passed', () => {
      expect(lib.formatNumber(2345678.3)).toEqual('2,345,678.30');
    });

    it('should format currency using specified format', () => {
      expect(lib.formatNumber(2000, '0,0')).toEqual('2,000');
    });

    it('should return 0', () => {
      expect(lib.formatNumber()).toEqual('0');
    });
  });

  describe('saveToLocalStorage()', () => {
    it('should store data to local storage', () => {
      const data = { name: 'ome' };

      lib.saveToLocalStorage('abc', data);

      expect(lib.fetchFromLocalStorage('abc')).toEqual(data);
    });
  });

  describe('fetchFromLocalStorage()', () => {
    it('should fetch data from local storage', () => {
      const data = { name: 'john' };

      lib.saveToLocalStorage('xbd', data);

      expect(lib.fetchFromLocalStorage('xbd')).toEqual(data);
    });
  });

  describe('stringifyQuery()', () => {
    it('should convert query object to string', () => {
      const query = { q: 'drake', limit: 25, offset: 0 };
      const output = 'q=drake&limit=25&offset=0';

      expect(lib.stringifyQuery(query)).toEqual(output);
    });

    it('should return empty string', () => {
      expect(lib.stringifyQuery()).toEqual('');
    });
  });

  describe('isWithinRange()', () => {
    it('should return true', () => {
      const range = { min: 5, max: 10 };

      expect(lib.isWithinRange(range, 6, 12)).toBe(true);
    });

    it('should return false', () => {
      const range = { min: 6, max: 9 };

      expect(lib.isWithinRange(range, 15, 12)).toBe(false);
    });
  });

  describe('setRange()', () => {
    it('returns minimum range as 1', () => {
      const range = lib.setRange(3, 2, 25);

      expect(range.min).toEqual(1);
    });

    it('returns maximum range that equals the page total', () => {
      const range = lib.setRange(23, 2, 25);

      expect(range.max).toEqual(25);
    });

    it('returns min range that is not 1 and max range that is not the page total', () => {
      const range = lib.setRange(15, 2, 25);

      expect(range.min).not.toEqual(1);
      expect(range.max).not.toEqual(25);
    });
  });

  describe('lazyLoadComponent()', () => {
    it('should return an aysnchronous component', () => {
      const component = lib.lazyLoadComponent(() => undefined);

      expect(React.isValidElement(component)).toBe(true);
    });
  });
});
