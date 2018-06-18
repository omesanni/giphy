import React from 'react';
import { expectToMatchSnapshot } from '../../utils/tests';
import Loader from '../Loader';

it('renders', () => {
  expectToMatchSnapshot(<Loader />);
});
